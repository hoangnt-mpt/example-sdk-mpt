<template>
  <div class="app">
    <header class="app-header">
      <h1>Vue 2 Call Manager</h1>
      <p>Built with Vue 2 + TypeScript + Call Controls</p>
    </header>

    <!-- Call Controls Section -->
    <CallControls />

    <div class="todo-container">
      <h2 class="mb-4">📋 Todo Manager</h2>
      <div class="input-section">
        <input
          v-model="inputValue"
          type="text"
          placeholder="Add a new todo..."
          @keyup.enter="addTodo()"
          class="form-control"
        />
        <button @click="addTodo()" class="btn btn-primary">Add Todo</button>
      </div>

      <div class="todo-list">
        <div
          v-for="todo in todos"
          :key="todo.id"
          :class="['todo-item', { completed: todo.completed }]"
        >
          <span @click="toggleTodo(todo.id)">{{ todo.text }}</span>
          <button
            @click="deleteTodo(todo.id)"
            class="btn btn-sm btn-outline-danger"
          >
            Delete
          </button>
        </div>
      </div>

      <p v-if="todos.length === 0" class="empty-state">
        No todos yet. Add one above!
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CallControls from "./components/CallControls.vue";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  components: {
    CallControls,
  },
})
export default class App extends Vue {
  todos: TodoItem[] = [];
  inputValue: string = "";

  addTodo(): void {
    if (this.inputValue.trim() !== "") {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: this.inputValue,
        completed: false,
      };
      this.todos.push(newTodo);
      this.inputValue = "";
    }
  }

  toggleTodo(id: number): void {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
</script>

<style scoped>
.app {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
}

.app-header {
  text-align: center;
  margin-bottom: 40px;
}

.app-header h1 {
  color: #282c34;
  margin-bottom: 10px;
  background: linear-gradient(45deg, #ff9800, #e91e63);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2.5rem;
  font-weight: 700;
}

.app-header p {
  color: #666;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.todo-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  border: 1px solid #e1e5e9;
}

.todo-container h2 {
  color: #282c34;
  text-align: center;
  font-weight: 600;
}

.input-section {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
}

.input-section .form-control {
  flex: 1;
  padding: 14px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: all 0.2s;
}

.input-section .form-control:focus {
  border-color: #ff9800;
  box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.1);
}

.input-section .btn {
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #ff9800;
  transition: all 0.2s;
}

.todo-item:hover {
  background: #e9ecef;
  transform: translateX(4px);
}

.todo-item.completed {
  opacity: 0.6;
  border-left-color: #28a745;
}

.todo-item.completed span {
  text-decoration: line-through;
  color: #6c757d;
}

.todo-item span {
  flex: 1;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.2s;
}

.empty-state {
  text-align: center;
  color: #6c757d;
  font-style: italic;
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #dee2e6;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .app {
    padding: 15px;
  }

  .app-header h1 {
    font-size: 2rem;
  }

  .input-section {
    flex-direction: column;
  }

  .todo-item {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .todo-item span {
    margin-bottom: 10px;
  }
}
</style>
