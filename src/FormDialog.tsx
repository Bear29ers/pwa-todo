import type { ChangeEvent } from 'react';

type Props = {
  text: string;
  /**
   * Reactでは、イベントを処理する関数定義（イベントハンドラー）は`handle[Event]`、
   * 受け取るpropsには`on[Event]`という命名を使用するのが通例
   */
  onSubmit: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const FormDialog = ({ text, onChange, onSubmit }: Props) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}>
    <input type="text" value={text} onChange={(e) => onChange(e)} />
    <input type="submit" value="追加" onSubmit={onSubmit} />
  </form>
);
