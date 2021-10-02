import { DropResult } from 'smooth-dnd';

export const applyDrag = (arr: any[], dropResult: DropResult) => {
  const { removedIndex, addedIndex, payload } = dropResult;
  if (removedIndex === null && addedIndex === null) return arr; // If not recieving or losing item,return current array
  const result = [...arr];
  let itemToAdd = payload;
  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]; //Remove item at removed index from result
  }
  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd); //Or add payload to result
  }
  return result;
};
