import React, { useState } from 'react';

type Todo = {
  value: string;
};

const App = () => {
  /**
   * コンポーネントに状態を「記憶」させるためのuseState
   * 現在のstateとそれを更新するための関数を返す
   * @see https://ja.react.dev/reference/react/useState
   */
  const [text, setText] = useState('');
  const [_, setTodos] = useState<Todo[]>([]);

  // todosを更新する
  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
    };

    // スプレッド構文で元のtodos配列のすべての要素を列挙する
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    setText('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /**
     * setStateメソッドの実行はコンポーネントの再レンダリングをトリガーする
     * 原則としてsetStateメソッドを使ってstateの値を書き換える
     * （再レンダリングがトリガーされなかったり、immutabilityを保てなくなるため）
     * @see https://ja.react.dev/learn/tutorial-tic-tac-toe#why-immutability-is-important
     */
    setText(e.target.value);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <input type='text' value={text} onChange={(e) => handleChange(e)} />
        <input type='submit' value='追加' onSubmit={(e) => e.preventDefault()} />
      </form>

      {/* サンプル */}
      <p>{text}</p>
    </div>
  );
};

export default App;
