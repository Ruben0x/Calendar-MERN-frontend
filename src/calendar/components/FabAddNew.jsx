import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const handleClickNew = () => {
    openDateModal();
  };

  return (
    <button className='btn btn-primary fab' onClick={handleClickNew}>
      <i className='fas fa-plus '></i>
    </button>
  );
};
