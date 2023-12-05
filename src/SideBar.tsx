import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { indigo, pink } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import pjson from '../package.json';

import type { Theme } from '@mui/material/styles';

type Props = {
  drawerOpen: boolean;
  onToggleDrawer: () => void;
  onSort: (filter: Filter) => void;
};

// ドロワー内リストの幅をカスタマイズ
const DrawerList = styled('div')(() => ({
  width: 250,
}));

// ドロワーヘッダーのサイズ・色などをカスタマイズ
const DrawerHeader = styled('div')(() => ({
  height: 150,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1em',
  backgroundColor: indigo[500],
  color: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));

// ヘッダー内に表示するアバターのカスタマイズ
const DrawerAvatar = styled(Avatar)(({ theme }: { theme: Theme }) => ({
  backgroundColor: pink[500],
  width: theme.spacing(6),
  height: theme.spacing(6),
}));

export const SideBar = ({ drawerOpen, onToggleDrawer, onSort }: Props) => (
  <Drawer variant="temporary" open={drawerOpen} onClose={onToggleDrawer}>
    <DrawerList role="presentation" onClick={onToggleDrawer}>
      <DrawerHeader>
        <DrawerAvatar>
          <Icon>create</Icon>
        </DrawerAvatar>
        <p>TODO v{pjson.version}</p>
      </DrawerHeader>
      <List>
        <ListItem disablePadding>
          <ListItemButton aria-label="list-all" onClick={() => onSort('all')}>
            <ListItemIcon>
              <Icon>subject</Icon>
            </ListItemIcon>
            <ListItemText secondary="すべてのタスク" />
          </ListItemButton>
        </ListItem>
      </List>
    </DrawerList>
  </Drawer>
);
