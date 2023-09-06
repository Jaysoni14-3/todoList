import { useEffect, useReducer, useState } from "react";
import "./app.css";
import { INITIAL_STATE, todoReducer, ACTION_TYPES } from "./todoReducer";

import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import Header from "./Header";

function App() {
  const [state, dispatch] = useReducer(todoReducer, INITIAL_STATE);
  const [text, setText] = useState("");

  // Set todo item to local storage
  useEffect(() => {
    localStorage.setItem("TODO_LIST", JSON.stringify(state));
  }, [state]);

  // Prevent page from reload on form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setText("");
  };

  // Add new todo
  const handleAddTodo = () => {
    if (text === "") {
      return;
    }
    dispatch({
      type: ACTION_TYPES.ADD_TODO,
      payload: { todoText: text },
    });
    setText("");
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <Header />
      <div className="todo-app-container mt-8 ">
        <h1 className="text-5xl uppercase text-neutral-950 text-center mb-6">
          Todo
        </h1>

        {/* Form to add todo */}
        <div className="todo-form">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-start input-field mx-4 sm:w-[380px] sm:mx-auto">
              <input
                className="w-full bg-white rounded-lg rounded-e-none p-2"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter Task"
              />
              <button
                className="rounded-lg flex items-center bg-orange-300 rounded-s-none p-2 hover:bg-orange-400 ease-in-out"
                onClick={handleAddTodo}
              >
                <FaPlus
                  className="me-1"
                  style={{ fontSize: "14px", fontWeight: "light" }}
                />
                Add
              </button>
            </div>
          </form>
        </div>

        <div className="todo-list py-4 mx-4 sm:w-[480px] sm:mx-auto">
          {state?.todos?.map(
            (todo) =>
              todo.text !== "" && (
                <div
                  key={todo.id}
                  id={todo.id}
                  className="todoItem relative flex justify-start align-baseline rounded-lg bg-white my-2 p-4 text-base transition-all duration-[250ms] ease-out"
                >
                  <input
                    type="checkbox"
                    className="me-2"
                    onChange={() =>
                      dispatch({
                        type: ACTION_TYPES.SET_COMPLETED,
                        id: todo?.id,
                      })
                    }
                  />
                  <p
                    style={{
                      textDecoration: todo?.completed ? "line-through" : "none",
                    }}
                    className="cursor-default w-11/12 break-words me-2"
                  >
                    {todo?.text}
                  </p>
                  {todo?.completed && (
                    <button
                      onClick={() =>
                        dispatch({
                          type: ACTION_TYPES.DELETE_TODO,
                          id: todo.id,
                        })
                      }
                      className="absolute right-2 top-2 bg-red-500 rounded-md p-2 font-thin text-white ms-auto"
                    >
                      <FaRegTrashAlt />
                    </button>
                  )}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
