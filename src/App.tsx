import React, { useState } from 'react';

// "Todo"型の定義
type Todo = {
  value: string;
};

const App = () => {
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
