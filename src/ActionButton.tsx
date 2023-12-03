type Props = {
  todos: Todo[];
  onEmpty: () => void;
};

export const ActionButton = ({ todos, onEmpty }: Props) => (
  <button type="button" onClick={() => onEmpty()} disabled={todos.filter((todo) => todo.removed).length === 0}>
    ゴミ箱を空にする
  </button>
);
