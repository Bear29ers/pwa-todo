import React, { useState } from 'react';

type Todo = {
  value: string;
  readonly id: number; // 読み取り専用
  checked: boolean;
  removed: boolean;
};

const App = () => {
  /**
   * コンポーネントに状態を「記憶」させるためのuseState
   * 現在のstateとそれを更新するための関数を返す
   * @see https://ja.react.dev/reference/react/useState
   */
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /**
     * setStateメソッドの実行はコンポーネントの再レンダリングをトリガーする
     * 原則としてsetStateメソッドを使ってstateの値を書き換える
     * （再レンダリングがトリガーされなかったり、immutabilityを保てなくなるため）
     * @see https://ja.react.dev/learn/tutorial-tic-tac-toe#why-immutability-is-important
     */
    setText(e.target.value);
  };

  // todosを更新する
  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false, // 初期値はfalse
      removed: false,
    };

    // スプレッド構文で元のtodos配列のすべての要素を列挙する
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    setText('');
  };

  // todoを編集する
  const handleEdit = (id: number, value: string) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          // この階層でオブジェクトtodoをコピー・展開し、valueプロパティを上書きする
          return { ...todo, value };
        }
        return todo;
      });

      return newTodos;
    });
  };

  // チェックをつける
  const handleCheck = (id: number, checked: boolean) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked };
        }
        return todo;
      });

      return newTodos;
    });
  };

  // 削除する
  const handleRemove = (id: number, removed: boolean) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, removed };
        }
        return todo;
      });

      return newTodos;
    });
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
              <input
                type='checkbox'
                disabled={todo.removed}
                checked={todo.checked}
                onChange={() => handleCheck(todo.id, !todo.checked)}
              />
              <input
                type='text'
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              />
              <button type='button' onClick={() => handleRemove(todo.id, !todo.removed)}>
                {todo.removed ? '復元' : '削除'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
