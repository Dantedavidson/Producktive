import { DropResult } from 'smooth-dnd';
interface Props {
  arr: any[];
  dropResult: DropResult;
}
export const applyDrag = ({ arr, dropResult }: Props) => {
  const { removedIndex, addedIndex, payload } = dropResult;
  console.log(arr, removedIndex, addedIndex);
  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];
  let itemToAdd = payload;
  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }
  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }
  return result;
};
