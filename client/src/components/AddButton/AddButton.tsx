import * as S from './AddButton.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface AddButtonProps {
  btnType: 'list' | 'item';
}

const AddButton = ({ btnType }: AddButtonProps) => {
  if (btnType === 'list')
    return (
      <S.ListButton>
        <FontAwesomeIcon icon={faPlus} /> New List
      </S.ListButton>
    );
  else
    return (
      <S.ItemButton>
        <FontAwesomeIcon icon={faPlus} /> New Item
      </S.ItemButton>
    );
};
export default AddButton;
