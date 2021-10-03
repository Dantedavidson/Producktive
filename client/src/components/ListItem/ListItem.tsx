import { useState, useEffect, useRef } from 'react';
import * as S from './ListItem.styles';
import { Task, Column, Board } from '../../state';
import { EditInput, Modal, Input } from '..';
import { Draggable } from 'react-smooth-dnd';
import { useAppSelector, useActions, useOutsideClick } from '../../hooks';
export const ListItem = ({
  task,
  list,
}: {
  task: Task;
  index: number;
  list: Column;
}) => {
  const [modal, setModal] = useState(false);
  const [content, setContent] = useState(task.content);
  const [editDesc, setEditDesc] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [editTitle, setEditTitle] = useState(false);
  const { board: boardState, user: userState } = useAppSelector(state => state);
  const { updateListItem, deleteListItem } = useActions();
  const titleRef = useRef(null);
  const handleContent = () => {
    const updateTask = { ...task, content: content };
    updateListItem(boardState.board as Board, updateTask, userState);
    setEditDesc(false);
  };
  const handleDelete = () => {
    setModal(false);
    deleteListItem(boardState.board as Board, task.id, list.id, userState);
  };

  useOutsideClick(titleRef, setEditTitle);

  useEffect(() => {
    if (!userState.token || title === task.title || !title) return;
    updateListItem(boardState.board as Board, { ...task, title }, userState);
  }, [editTitle]);

  useEffect(() => {
    setEditDesc(false);
    setEditTitle(false);
  }, [modal]);
  return (
    <>
      <Draggable>
        <S.ItemWrapper>
          <S.ModalBg $active={modal} />

          <S.Container>
            <S.Title className='drag-handle' status={task.status}>
              {task.title}
            </S.Title>
            <S.IconWrapper>
              {task.status ? (
                <S.Complete
                  fontSize='small'
                  onClick={() => {
                    updateListItem(
                      boardState.board as Board,
                      { ...task, status: false },
                      userState
                    );
                  }}
                />
              ) : (
                <S.Incomplete
                  fontSize='small'
                  onClick={() => {
                    updateListItem(
                      boardState.board as Board,
                      { ...task, status: true },
                      userState
                    );
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
                {/* Modal Header */}
                <S.Row>
                  {editTitle ? (
                    <Input
                      ref={titleRef}
                      label='Edit Task Title'
                      value={title}
                      setValue={setTitle}
                      handleEnter={() => setEditTitle(false)}
                    />
                  ) : (
                    <S.ModalTitle
                      className='allow-text-select'
                      onClick={() => setEditTitle(true)}
                      style={{ cursor: 'pointer' }}
                    >
                      {task.title}
                    </S.ModalTitle>
                  )}
                </S.Row>
                <S.SmallText>
                  Task in <S.Highlight>{list.title}</S.Highlight>
                </S.SmallText>

                {/* Modal Item Description */}
                <S.Grid>
                  <S.Column>
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
                        label='Edit Task Description'
                        inputHandler={setContent}
                        buttonText='Save'
                        buttonHandler={handleContent}
                        activeHandler={setEditDesc}
                        initial={task.content}
                        enterHandler={handleContent}
                      />
                    ) : (
                      <S.Text
                        className='allow-text-select'
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
                  </S.Column>
                  <S.Column>
                    <S.Row>
                      <S.ModalTitle>Task Actions</S.ModalTitle>
                    </S.Row>
                    <S.Button
                      onClick={handleDelete}
                      variant='contained'
                      size='small'
                    >
                      Delete Task
                    </S.Button>
                  </S.Column>
                </S.Grid>
              </S.Wrap>
            </Modal>
          </S.Container>
        </S.ItemWrapper>
      </Draggable>
    </>
  );
};
