import { ThemeProvider, createTheme } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import { indigo, pink } from '@mui/material/colors';
import localforage from 'localforage';
import React, { useState, useEffect } from 'react';

import { ActionButton } from './ActionButton';
import { AlertDialog } from './AlertDialog';
import { FormDialog } from './FormDialog';
import { QR } from './QR';
import { SideBar } from './SideBar';
import { TodoItem } from './TodoItem';
import { ToolBar } from './ToolBar';
import { isTodos } from './lib/isTodo';

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
  const [qrOpen, setQrOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  /**
   * 入力フォームを更新する
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    if (!text) {
      setDialogOpen((prevDialogOpen) => !prevDialogOpen);
      return;
    }

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false, // 初期値はfalse
      removed: false,
    };

    // スプレッド構文で元のtodos配列のすべての要素を列挙する
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    setText('');
    setDialogOpen((prevDialogOpen) => !prevDialogOpen);
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
   * ドロワーの表示状態を反転させる
   */
  const handleToggleDrawer = () => {
    setDrawerOpen((prevDrawerOpen) => !prevDrawerOpen);
  };

  /**
   * QRコードの表示状態を反転させる
   */
  const handleToggleQR = () => {
    setQrOpen((prevQrOpen) => !prevQrOpen);
  };

  /**
   * ダイアログの表示状態を反転させる
   */
  const handleToggleDialog = () => {
    setDialogOpen((prevDialogOpen) => !prevDialogOpen);
    // フォームへの入力をクリア
    setText('');
  };

  /**
   *
   */
  const handleToggleAlert = () => {
    setAlertOpen((prevAlertOpen) => !prevAlertOpen);
  };

  /**
   * useEffectは関数コンポーネント内で副作用（サイドエフェクト）を実行するためのフック
   * 副作用とは、関数コンポーネントの出力（=レンダリング）に関係のない処理で、useEffectでレンダリングと副作用と切り離すことができる
   * 第一引数のコールバックにはコンポーネントがマウントまたはアップデートされたあとに実行した処理を指定する
   * 第二引数の配列には、useEffect内で参照している外部の変数や関数を列挙し、この依存配列内のいずれかの要素が作成・更新された時に第一引数の処理を実行する
   * 空の配列を指定すると、マウントされたときのみに第一引数の処理を実行する。配列そのものを省略すると常に副作用が実行される。
   * @see https://ja.react.dev/reference/react/useEffect
   */
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    localforage.getItem('todo-20200101').then((values) => isTodos(values) && setTodos(values));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    localforage.setItem('todo-20200101', todos);
  }, [todos]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ToolBar filter={filter} onToggleDrawer={handleToggleDrawer} />
      <SideBar
        drawerOpen={drawerOpen}
        onToggleQR={handleToggleQR}
        onToggleDrawer={handleToggleDrawer}
        onSort={handleSort}
      />
      <QR open={qrOpen} onClose={handleToggleQR} />
      <FormDialog
        text={text}
        dialogOpen={dialogOpen}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onToggleDialog={handleToggleDialog}
      />
      <AlertDialog alertOpen={alertOpen} onEmpty={handleEmpty} onToggleAlert={handleToggleAlert} />
      <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />
      <ActionButton
        todos={todos}
        filter={filter}
        alertOpen={alertOpen}
        dialogOpen={dialogOpen}
        onToggleAlert={handleToggleAlert}
        onToggleDialog={handleToggleDialog}
      />
    </ThemeProvider>
  );
};

export default App;
