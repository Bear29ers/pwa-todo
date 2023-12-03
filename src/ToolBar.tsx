import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const ToolBar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton aria-label="menu-button" size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
          <Icon>menu</Icon>
        </IconButton>
        <Typography>TODO</Typography>
      </Toolbar>
    </AppBar>
  </Box>
);
