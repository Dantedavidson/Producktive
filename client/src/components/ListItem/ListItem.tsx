import { useState } from 'react';
import * as S from './ListItem.styles';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../../state';

import { Modal } from '..';
export const ListItem = ({ task, index }: { task: Task; index: number }) => {
  const [modal, setModal] = useState(false);
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
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
            styles={{ corners: 'sharp', positionTop: 2.5, width: 17.8125 }}
          >
            <S.Text>Task Actions</S.Text>
            <S.Text>Edit</S.Text>
            <S.Text>Copy</S.Text>
            <S.Text>Delete</S.Text>
          </Modal>
        </S.Container>
      )}
    </Draggable>
  );
};
