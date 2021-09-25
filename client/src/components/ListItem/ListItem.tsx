import { useState, useEffect } from 'react';
import * as S from './ListItem.styles';
import { Task, Column } from '../../state';
import { EditInput } from '..';
import { Modal } from '..';
import { useAppSelector, useActions } from '../../hooks';
export const ListItem = ({
  task,
  index,
  list,
}: {
  task: Task;
  index: number;
  list: Column;
}) => {
  const [modal, setModal] = useState(false);
  const [content, setContent] = useState(task.content);
  const [editDesc, setEditDesc] = useState(false);
  const { token } = useAppSelector(state => state.user);
  const { updateListItem, deleteListItem } = useActions();
  const handleContent = () => {
    if (!token) return;
    const updateTask = { ...task, content: content };
    updateListItem(updateTask, token);
    setEditDesc(false);
  };
  const handleDelete = () => {
    if (!token) return;
    setModal(false);
    deleteListItem(task.id, list.id, token);
  };
  useEffect(() => {
    setEditDesc(false);
  }, [modal]);
  return (
    <>
      <S.ModalBg $active={modal} />
      <S.Container>
        <S.Title status={task.status}>{task.title}</S.Title>
        <S.IconWrapper>
          {task.status ? (
            <S.Complete
              fontSize='small'
              onClick={() => {
                if (!token) return;
                updateListItem({ ...task, status: false }, token);
              }}
            />
          ) : (
            <S.Incomplete
              fontSize='small'
              onClick={() => {
                if (!token) return;
                updateListItem({ ...task, status: true }, token);
              }}
            />
          )}
          <S.Edit
            fontSize='small'
            style={{ marginLeft: 5 }}
            onClick={() => setModal(!modal)}
          />
        </S.IconWrapper>

        <Modal
          handler={setModal}
          active={modal}
          styles={{
            corners: 'rounded',
            position: 'fixed',
            positionTop: 6,
            height: 60,
            color: 'grey',
            width: 40,
          }}
        >
          <S.Wrap>
            <S.Row>
              <S.ModalTitle style={{ cursor: 'pointer' }}>
                {task.title}
              </S.ModalTitle>
            </S.Row>
            <S.SmallText>Item in {list.title}</S.SmallText>
          </S.Wrap>
          <S.Wrap key={`${task.id}-inputs`}>
            <S.Row>
              <S.ModalTitle>Description</S.ModalTitle>
              {!editDesc && (
                <S.Edit
                  onClick={() => setEditDesc(!editDesc)}
                  fontSize='small'
                  style={{ marginLeft: 15, cursor: 'pointer' }}
                />
              )}
            </S.Row>
            {editDesc ? (
              <EditInput
                input={content}
                inputHandler={setContent}
                buttonText='Save'
                buttonHandler={handleContent}
                activeHandler={setEditDesc}
                initial={task.content}
              />
            ) : (
              <S.Text
                $content={task.content}
                onClick={() => {
                  setEditDesc(true);
                }}
              >
                {task.content
                  ? task.content
                  : 'Add a more detailed description...'}
              </S.Text>
            )}

            <button onClick={handleDelete}>delete me</button>
          </S.Wrap>
        </Modal>
      </S.Container>
    </>
  );
};
