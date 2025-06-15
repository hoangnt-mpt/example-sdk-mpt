import { useState } from "react";
import "./App.css";
import CallControls from "./CallControls";
import Login from "./components/Login";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

interface LoginData {
  tenantId: string;
  account: string;
  password: string;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<LoginData>({
    tenantId: "",
    account: "",
    password: "",
  });
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleLoginSuccess = (loginData: LoginData) => {
    setIsLoggedIn(true);
    setUserInfo(loginData);
    console.log("🎉 User logged in successfully - React Vite:", loginData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo({ tenantId: "", account: "", password: "" });
    setTodos([]); // Clear todos on logout
    setInputValue("");
    console.log("👋 User logged out - React Vite");
  };

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
    console.log("Đã nghe cuộc gọi - React Vite");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  };

  const handleReject = () => {
    console.log("Đã từ chối cuộc gọi - React Vite");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  };

  const handleEnd = () => {
    console.log("Đã kết thúc cuộc gọi - React Vite");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  };

  const handleHold = () => {
    console.log("Đã hold cuộc gọi - React Vite");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  };

  const handleUnHold = () => {
    console.log("Đã bỏ hold cuộc gọi - React Vite");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  };

  const handleMute = () => {
    console.log("Đã tắt mic - React Vite");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  };

  const handleUnMute = () => {
    console.log("Đã bật mic - React Vite");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  };

  const handleMakeCall = (phoneNumber: string) => {
    console.log("📱 Gọi đi tới số:", phoneNumber, "- React Vite");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  };

  // Render login screen if not logged in
  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Render main app if logged in
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="user-info">
            <h1>React Vite Call Manager</h1>
            <p>⚡ Powered by Vite + Call Controls</p>
            <span className="user-badge">
              👤 {userInfo.account} ({userInfo.tenantId})
            </span>
          </div>
          <button
            className="btn btn-outline-light btn-sm logout-btn"
            onClick={handleLogout}
          >
            🚪 Đăng xuất
          </button>
        </div>
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

      {/* Todo Section */}
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
}

export default App;
