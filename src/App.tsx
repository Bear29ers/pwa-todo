import { ThemeProvider, createTheme } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import { indigo, pink } from '@mui/material/colors';
import React, { useState } from 'react';

import { ActionButton } from './ActionButton';
import { FormDialog } from './FormDialog';
import { SideBar } from './SideBar';
import { TodoItem } from './TodoItem';
import { ToolBar } from './ToolBar';

// テーマを作成
const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: '#757de8',
      dark: '#002984',
    },
    secondary: {
      main: pink[500],
      light: '#ff6090',
      dark: '#b0003a',
    },
  },
});

const App = () => {
  /**
   * コンポーネントに状態を「記憶」させるためのuseState
   * 現在のstateとそれを更新するための関数を返す
   * @see https://ja.react.dev/reference/react/useState
   */
  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  /**
   * 入力フォームを更新する
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /**
     * setStateメソッドの実行はコンポーネントの再レンダリングをトリガーする
     * 原則としてsetStateメソッドを使ってstateの値を書き換える
     * （再レンダリングがトリガーされなかったり、immutabilityを保てなくなるため）
     * @see https://ja.react.dev/learn/tutorial-tic-tac-toe#why-immutability-is-important
     */
    setText(e.target.value);
  };

  /**
   * todoを追加する
   */
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
   * @param {number} id
   * @param {K} key
   * @param {V} value
   *
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

  /**
   * フィルターを変更する
   * @param {Filter} argFilter
   */
  const handleSort = (argFilter: Filter) => {
    setFilter(argFilter);
  };

  /**
   * ごみ箱を空にする
   */
  const handleEmpty = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.removed));
  };

  /**
   * ドロワーの状態を反転させる
   */
  const handleToggleDrawer = () => {
    setDrawerOpen((prevDrawerOpen) => !prevDrawerOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ToolBar filter={filter} />
      <SideBar drawerOpen={drawerOpen} onToggleDrawer={handleToggleDrawer} onSort={handleSort} />
      <FormDialog text={text} onChange={handleChange} onSubmit={handleSubmit} />
      <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />
      <ActionButton todos={todos} onEmpty={handleEmpty} />
    </ThemeProvider>
  );
};

export default App;
