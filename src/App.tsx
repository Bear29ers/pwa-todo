import React, { useState } from 'react';

type Todo = {
  value: string;
  readonly id: number; // 読み取り専用
};

const App = () => {
  /**
   * コンポーネントに状態を「記憶」させるためのuseState
   * 現在のstateとそれを更新するための関数を返す
   * @see https://ja.react.dev/reference/react/useState
   */
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  // todosを更新する
  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
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
      <ul>
        {todos.map((todo) => {
          /**
           * Reactはリストをレンダーする際、どのアイテムに変更が加えられたかを特定する必要があるため、
           * 変更・追加・削除・並び替えを検知するためには、リストの各項目を特定する一意な識別子（key）が必要
           * 配列のindexを利用することは推奨されていない
           */
          return (
            <li key={todo.id}>
              <input type='text' value={todo.value} onChange={(e) => e.preventDefault()} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
