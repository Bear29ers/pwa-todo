import Backdrop from '@mui/material/Backdrop';
import { styled } from '@mui/material/styles';
import { QRCode } from 'react-qrcode-logo';

type Props = {
  open: boolean;
  onClose: () => void;
};

const TodoBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
}));

export const QR = ({ open, onClose }: Props) => (
  <TodoBackdrop open={open} onClick={onClose}>
    <QRCode value="https://pwa-todo-ten.vercel.app/" />
  </TodoBackdrop>
);
