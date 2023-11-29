import { useState } from 'react';

const App = () => {
  // 初期値: 空文字 ''
  const [text, setText] = useState('');

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type='text'
          // textステートが持っている入力中のテキストの値をvalueとして表示
          value={text}
          // onChangeイベント（= 入力テキストの変化）をtextステートに反映する
          onChange={(e) => setText(e.target.value)}
        />
        <input type='submit' value='追加' onSubmit={(e) => e.preventDefault()} />
      </form>

      {/* サンプル */}
      <p>{text}</p>
    </div>
  );
};

export default App;
