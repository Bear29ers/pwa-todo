import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

import type { ChangeEvent } from 'react';

type Props = {
  text: string;
  dialogOpen: boolean;
  /**
   * Reactでは、イベントを処理する関数定義（イベントハンドラー）は`handle[Event]`、
   * 受け取るpropsには`on[Event]`という命名を使用するのが通例
   */
  onSubmit: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onToggleDialog: () => void;
};

export const FormDialog = ({ text, dialogOpen, onChange, onSubmit, onToggleDialog }: Props) => (
  <Dialog fullWidth open={dialogOpen} onClose={onToggleDialog}>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}>
      <div style={{ margin: '1em' }}>
        <TextField
          aria-label="todo-input"
          variant="standard"
          style={{
            width: '100%',
            fontSize: '16px',
            fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
          }}
          label="タスクを入力..."
          onChange={(e) => onChange(e)}
          value={text}
          autoFocus
        />
        <DialogActions>
          <Button aria-label="form-add" color="secondary" onClick={onSubmit}>
            追加
          </Button>
        </DialogActions>
      </div>
    </form>
  </Dialog>
);
