import React from 'react';
import TodoList from './TodoList';

function App({ initialTodos = [] }) {
  return (
    <div>
      <h1>Liste de taches</h1>
      <TodoList todos={initialTodos} />
    </div>
  );
}

export default App;
