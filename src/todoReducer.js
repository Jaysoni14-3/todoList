export const ACTION_TYPES = {
  SET_COMPLETED: "SET_COMPLETED",
  DELETE_TODO: "DELETE_TODO",
  ADD_TODO: "ADD_TODO",
};

const initialValue = {
  counter: 0,
  todos: [
    {
      id: 0,
      text: "",
      completed: false,
    },
  ],
};

export let INITIAL_STATE;

const localValue = JSON.parse(localStorage.getItem("TODO_LIST"));
// console.log(localValue);

if (localValue === null || localValue === undefined) {
  INITIAL_STATE = initialValue;
} else {
  INITIAL_STATE = localValue;
}

export const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TODO: {
      const newCounter = state.counter + 1;
      return {
        ...state,
        counter: newCounter,
        todos: [
          ...state.todos,
          { id: newCounter, text: action.payload.todoText, completed: false },
        ],
      };
    }
    case ACTION_TYPES.SET_COMPLETED:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case ACTION_TYPES.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    default:
      return {
        ...state,
      };
  }
};
