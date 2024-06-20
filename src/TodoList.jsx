import React from 'react';
import TodoList from './TodoList';

function App({ initialTodos = [] }) {
  console.log('Initial todos:', initialTodos); 
  return (
    <div>
      <h1>Liste de taches</h1>
      <TodoList todos={initialTodos} />
    </div>
  );
}

export default App;
