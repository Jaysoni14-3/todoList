import { useEffect, useReducer, useState } from "react";
import "./app.css";
import { INITIAL_STATE, todoReducer, ACTION_TYPES } from "./todoReducer";

import { FaEdit, FaRegTrashAlt, FaPlus } from "react-icons/fa";

function App() {
  const [state, dispatch] = useReducer(todoReducer, INITIAL_STATE);
  const [text, setText] = useState("");

  var userNameValue;

  const [time, setTime] = useState({
    minutes: new Date().getMinutes(),
    hours: new Date().getHours(),
    seconds: new Date().getSeconds(),
  });

  // Convert 24hrs to 12hrs format
  var formattedHours = time.hours % 12 || 12;
  var amOrPm = formattedHours >= 12 ? "am" : "pm";

  // If Local storage has username value then get the value and show the name
  const nameInLs = JSON.parse(localStorage.getItem("userName"));
  if (nameInLs !== null && userNameValue !== "") {
    userNameValue = nameInLs;
  } else if (nameInLs == null) {
    userNameValue = "";
    userNameValue = prompt("Welcome, How do you want me to call you?");
    localStorage.setItem("userName", JSON.stringify(userNameValue));
  } else {
    userNameValue = prompt("Welcome, How do you want me to call you?");
    localStorage.setItem("userName", JSON.stringify(userNameValue));
  }

  const changeUserName = () => {
    userNameValue = "";
    userNameValue = prompt("Change your name to?");
    localStorage.setItem("userName", JSON.stringify(userNameValue));
  };

  // Initial load use Effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setTime({
        minutes: date.getMinutes(),
        hours: date.getHours(),
        seconds: date.getSeconds(),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Set todo item to local storage
  useEffect(() => {
    localStorage.setItem("TODO_LIST", JSON.stringify(state));
  }, [state]);

  // add 0 before hours, minutes, seconds if the time is between 1-9
  const convertToTwoDigit = (number) => {
    return number.toLocaleString("en-us", {
      minimumIntegerDigits: 2,
    });
  };

  // Greetings based on time
  let greetings;
  (function () {
    const currentHour = time.hours;
    if (currentHour >= 5 && currentHour < 12) {
      greetings = "Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      greetings = "Afternoon";
    } else if (currentHour >= 17 && currentHour < 20) {
      greetings = "Evening";
    } else {
      greetings = "Night";
    }
  })();

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
    // console.log(state.todos);
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <header className="bg-sky-300 text-neutral-950 w-100 py-8 header">
        <div className="user-details flex justify-center items-center ">
          <p className="me-2 text-xl text-center">
            Good {greetings}, {userNameValue}
          </p>
          <div
            onClick={changeUserName}
            className="edit-btn hover:bg-orange-300 transition-all ease-out p-2 rounded-full"
          >
            <FaEdit className="cursor-pointer" />
          </div>
        </div>

        <div className="time-container flex justify-center items-center mt-4">
          <p className="text-xl text-center w-12">
            {convertToTwoDigit(formattedHours)}
          </p>
          <span>:</span>
          <p className="text-xl text-center w-12">
            {convertToTwoDigit(time.minutes)}
          </p>
          <span>:</span>
          <p className="text-xl text-center w-12">
            {convertToTwoDigit(time.seconds)}
          </p>
          <p className="text-xl text-center">{amOrPm}</p>
        </div>
      </header>
      <div className="todo-app-container mt-8 ">
        <h1 className="text-5xl uppercase text-neutral-950 text-center mb-6">
          Todo
        </h1>
        <div className="todo-form">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-start input-field mx-4 sm:w-[380px] sm:mx-auto">
              <input
                className="w-full bg-white rounded-lg rounded-e-none p-2"
                type="text"
                // value={inputValue}
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
                  className="todoItem relative group/todo-container flex justify-start align-baseline rounded-lg bg-white my-2 p-4 text-base transition-all duration-[250ms] ease-out"
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
                  <button
                    onClick={() =>
                      dispatch({
                        type: ACTION_TYPES.DELETE_TODO,
                        id: todo.id,
                      })
                    }
                    className="invisible group-hover/todo-container:visible absolute right-2 top-2 bg-red-500 rounded-md p-2 font-thin text-white ms-auto"
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
