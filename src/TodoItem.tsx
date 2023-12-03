type Props = {
  todos: Todo[];
  filter: Filter;
  onTodo: <K extends keyof Todo, V extends Todo[K]>(id: number, key: K, value: V) => void;
};

export const TodoItem = ({ todos, filter, onTodo }: Props) => {
  const filteredTodos = todos.filter((todo) => {
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

  return (
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
              onChange={() => onTodo(todo.id, 'checked', !todo.checked)}
            />
            <input
              type="text"
              disabled={todo.checked || todo.removed}
              value={todo.value}
              onChange={(e) => onTodo(todo.id, 'value', e.target.value)}
            />
            <button type="button" onClick={() => onTodo(todo.id, 'removed', !todo.removed)}>
              {todo.removed ? '復元' : '削除'}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
