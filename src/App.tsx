import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import "./styles.css";

function App() {
  interface Todo {
    id: string;
    Todo_Name: string;
    Is_Completed: boolean;
  }
  const [message, setMessage] = useState("");
  const [inputText, setInputText] = useState("");
  const [TodoData, setTodoData] = useState<Todo[]>(() => {
    const saveData = localStorage.getItem("TodoData");
    return saveData ? JSON.parse(saveData) : [];
  });

  const toggleCompletion = (indexA: number) => {
    const updatedTodos = TodoData.map((Data, indexB) =>
      indexA === indexB ? { ...Data, Is_Completed: !Data.Is_Completed } : Data
    );
    setTodoData(updatedTodos);
  };
  const renderTodoName = (todos: Todo) => {
    return todos.Is_Completed ? <s>{todos.Todo_Name}</s> : todos.Todo_Name;
  };
  useEffect(() => {
    localStorage.setItem("TodoData", JSON.stringify(TodoData));
    if (TodoData.every((todo) => todo.Is_Completed === true)) {
      alert("All todos are Completed");
    } else if (message) {
      const msgTimer = setTimeout(() => {
        setMessage("");
      }, 2000);
      return () => clearTimeout(msgTimer);
    }
  }, [TodoData, message]);

  return (
    <div>
      <h1>To-Do App</h1>
      <div>
        <input
          maxLength={50}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
          placeholder="Enter Todo here."
        />
        <button
          className="button"
          onClick={() => {
            if (inputText.trim() === "") {
              // console.log("cvccxc");
              setMessage("Task Name can not be empty.");
              return;
            } else if (inputText.trim().length > 50) {
              setMessage("Task Name length not be more than 50 words");
              return;
            }
            setTodoData((previousArray) => [
              ...previousArray,
              {
                id: uuidv4(),
                Todo_Name: inputText,
                Is_Completed: false,
              },
            ]);
            setMessage("Task added successfully!");
            setInputText("");
            return;
          }}
        >
          Add
        </button>
        <div>{message && <p>{message}</p>}</div>
        <div>
          <p>
            Remaining tasks {""}
            <b>
              {
                TodoData.filter((todos) => {
                  return todos.Is_Completed === false;
                }).length
              }
            </b>
          </p>
        </div>
        <div>
          {TodoData.length > 0 &&
          TodoData.every((todos) => todos.Is_Completed) ? (
            <button
              className="button"
              onClick={() => {
                setTodoData(TodoData.filter((todos) => !todos.Is_Completed));
              }}
            >
              Remove all completed tasks.
            </button>
          ) : null}
        </div>
      </div>
      <div>
        <table>
          {TodoData.length > 0 ? (
            <thead>
              <tr>
                <th>S No.</th>
                <th>Todo Name</th>
                <th>Action</th>
              </tr>
            </thead>
          ) : (
            "No todo in the list."
          )}
          <tbody>
            {TodoData.map((todos, indexA) => {
              return (
                <tr key={todos.id}>
                  <td>{indexA + 1}</td>
                  <td>{renderTodoName(todos)}</td>
                  <td>
                    <button
                      className={`button ${
                        todos.Is_Completed === false
                          ? "button-Not-Complete"
                          : "Completed"
                      }`}
                      onClick={() => toggleCompletion(indexA)}
                    >
                      {todos.Is_Completed === false
                        ? "Not Complete"
                        : "Completed"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
