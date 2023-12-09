import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';
import { styled } from '@mui/material/styles';

type Props = {
  todos: Todo[];
  filter: Filter;
  alertOpen: boolean;
  dialogOpen: boolean;
  onToggleAlert: () => void;
  onToggleDialog: () => void;
};

const FabButton = styled(Fab)({
  position: 'fixed',
  right: 15,
  bottom: 15,
});

export const ActionButton = ({ todos, filter, alertOpen, dialogOpen, onToggleAlert, onToggleDialog }: Props) => {
  const removed = todos.filter((todo) => todo.removed).length !== 0;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {filter === 'removed' ? (
        <FabButton
          aria-label="fab-delete-button"
          color="secondary"
          onClick={onToggleAlert}
          disabled={!removed || alertOpen}>
          <Icon>delete</Icon>
        </FabButton>
      ) : (
        <FabButton
          aria-label="fab-add-button"
          color="secondary"
          onClick={onToggleDialog}
          disabled={filter === 'checked' || dialogOpen}>
          <Icon>create</Icon>
        </FabButton>
      )}
    </>
  );
};
