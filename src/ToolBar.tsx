import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

type Props = {
  filter: Filter;
  onToggleDrawer: () => void;
};

/**
 * フィルターを書き換える
 * @param {Filter} arg
 * @return {string}
 */
const translator = (arg: Filter): string => {
  switch (arg) {
    case 'all':
      return 'すべてのタスク';
    case 'unchecked':
      return '現在のタスク';
    case 'checked':
      return '完了しタスク';
    case 'removed':
      return 'ごみ箱';
    default:
      return 'TODO';
  }
};

export const ToolBar = ({ filter, onToggleDrawer }: Props) => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          aria-label="menu-button"
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
          onClick={onToggleDrawer}>
          <Icon>menu</Icon>
        </IconButton>
        <Typography>{translator(filter)}</Typography>
      </Toolbar>
    </AppBar>
  </Box>
);
