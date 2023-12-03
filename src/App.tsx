import React, { useState } from 'react';

import { FormDialog } from './FormDialog';

const App = () => {
  /**
   * コンポーネントに状態を「記憶」させるためのuseState
   * 現在のstateとそれを更新するための関数を返す
   * @see https://ja.react.dev/reference/react/useState
   */
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

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

  /**
   * ジェネリクスを使って更新メソッドをまとめる（編集、完了、削除）
   * ジェネリクスを使うことで、型も変数のように扱うことができるようになる
   * @see https://typescriptbook.jp/reference/generics
   *
   * extendsキーワードを使うことで型引数を特定の型に限定する（型引数の制約）
   * @see https://typescriptbook.jp/reference/generics/type-parameter-constraint
   *
   * オブジェクトのプロパティは、keyof演算子で取得する
   * @see https://typescriptbook.jp/reference/type-reuse/keyof-type-operator
   */
  const handleTodo = <K extends keyof Todo, V extends Todo[K]>(id: number, key: K, value: V) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, [key]: value };
        }
        return todo;
      });

      return newTodos;
    });
  };

  // フィルターを変更する
  const handleSort = (argFilter: Filter) => {
    setFilter(argFilter);
  };

  // todoをフィルターする
  const filteredTodos = todos.filter((todo) => {
    // filter stateの値に応じて異なる内容の配列を返す
    switch (filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
        return todo.checked && !todo.removed;
      case 'unchecked':
        return !todo.checked && !todo.removed;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  });

  const handleEmpty = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.removed));
  };

  return (
    <div>
      <select defaultValue="all" onChange={(e) => handleSort(e.target.value as Filter)}>
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
      </select>
      {/* フィルターが`removed`のときは「ゴミ箱を空にする」ボタンを表示 */}
      {filter === 'removed' ? (
        // eslint-disable-next-line no-console
        <button
          type="button"
          onClick={() => handleEmpty()}
          disabled={todos.filter((todo) => todo.removed).length === 0}>
          ゴミ箱を空にする
        </button>
      ) : (
        // フィルターが`checked`でなければTodo入力フォームを表示
        filter !== 'checked' && <FormDialog text={text} onChange={handleChange} onSubmit={handleSubmit} />
      )}
      <ul>
        {filteredTodos.map((todo) => {
          /**
           * Reactはリストをレンダーする際、どのアイテムに変更が加えられたかを特定する必要があるため、
           * 変更・追加・削除・並び替えを検知するためには、リストの各項目を特定する一意な識別子（key）が必要
           * 配列のindexを利用することは推奨されていない
           */
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                disabled={todo.removed}
                checked={todo.checked}
                onChange={() => handleTodo(todo.id, 'checked', !todo.checked)}
              />
              <input
                type="text"
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleTodo(todo.id, 'value', e.target.value)}
              />
              <button type="button" onClick={() => handleTodo(todo.id, 'removed', !todo.removed)}>
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
