import { useState, useRef } from 'react';
import * as S from './ListItem.styles';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../../state';
import { EditInput } from '..';
import { Modal } from '..';
import { useAppSelector, useActions } from '../../hooks';
export const ListItem = ({
  task,
  index,
  parentTitle,
}: {
  task: Task;
  index: number;
  parentTitle: string;
}) => {
  const [modal, setModal] = useState(false);
  const [content, setContent] = useState(task.content);
  const [editDesc, setEditDesc] = useState(false);
  const { token } = useAppSelector(state => state.user);
  const { updateListItem } = useActions();
  const handleContent = () => {
    console.log(content);
    if (!token || !content) return;
    const updateTask = { ...task, content: content };
    updateListItem(updateTask, token);
    setEditDesc(false);
  };
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <>
          <S.ModalBg $active={modal} />
          <S.Container
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <S.Title {...provided.dragHandleProps}>{task.title}</S.Title>
            <S.Wrapper>
              <S.Edit fontSize='small' onClick={() => setModal(!modal)} />
            </S.Wrapper>
            <Modal
              handler={setModal}
              active={modal}
              styles={{
                corners: 'rounded',
                position: 'fixed',
                positionTop: 6,
                width: 40,
              }}
            >
              <S.Wrap>
                <S.ModalTitle>{task.title}</S.ModalTitle>
                <S.SmallText>Item in {parentTitle}</S.SmallText>
              </S.Wrap>
              <S.Wrap key={`${task.id}-inputs`}>
                <S.Row>
                  <S.ModalTitle>Description</S.ModalTitle>
                  <S.Edit
                    onClick={() => setEditDesc(!editDesc)}
                    fontSize='small'
                    style={{ marginLeft: 15, cursor: 'pointer' }}
                  />
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
                  <S.Text>{task.content}</S.Text>
                )}
              </S.Wrap>
            </Modal>
          </S.Container>
        </>
      )}
    </Draggable>
  );
};
