import React, { useState } from "react";
import "./App.css";
import CallControls from "./CallControls";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Call control handlers
  const handleAnswer = () => {
    console.log("Đã nghe cuộc gọi - Webpack");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  };

  const handleReject = () => {
    console.log("Đã từ chối cuộc gọi - Webpack");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  };

  const handleEnd = () => {
    console.log("Đã kết thúc cuộc gọi - Webpack");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  };

  const handleHold = () => {
    console.log("Đã hold cuộc gọi - Webpack");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  };

  const handleUnHold = () => {
    console.log("Đã bỏ hold cuộc gọi - Webpack");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  };

  const handleMute = () => {
    console.log("Đã tắt mic - Webpack");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  };

  const handleUnMute = () => {
    console.log("Đã bật mic - Webpack");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  };

  const handleMakeCall = (phoneNumber: string) => {
    console.log("📱 Gọi đi tới số:", phoneNumber, "- React Webpack");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Webpack Call Manager</h1>
        <p>Built with Webpack 5 + Call Controls</p>
      </header>

      {/* Call Controls Section */}
      <CallControls
        onAnswer={handleAnswer}
        onReject={handleReject}
        onEnd={handleEnd}
        onHold={handleHold}
        onUnHold={handleUnHold}
        onMute={handleMute}
        onUnMute={handleUnMute}
        onMakeCall={handleMakeCall}
      />

      <div className="todo-container">
        <h2 className="mb-4">📋 Todo Manager</h2>
        <div className="input-section">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new todo..."
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            className="form-control"
          />
          <button onClick={addTodo} className="btn btn-primary">
            Add Todo
          </button>
        </div>

        <div className="todo-list">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn btn-sm btn-outline-danger"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {todos.length === 0 && (
          <p className="empty-state">No todos yet. Add one above!</p>
        )}
      </div>
    </div>
  );
};

export default App;
