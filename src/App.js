import { useState } from 'react';
import './App.css';

const todos = [
  {id: 0, title: 'listen to a lecture', completed: false},
  {id: 1, title: 'solve an algorithm', completed: false},
  {id: 2, title: 'apply for jobs', completed: false}
];

export function App() {
  const [todoList, setTodoList] = useState(todos);
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = (id) => {
    let updatedList = [...todoList];

    for (let i = 0; i < updatedList.length; i++) {
      if (updatedList[i].id === id) {
        updatedList[i].completed = true;
      }
    } 

    setTodoList(updatedList);
    setIsChecked(true);
  }

  return (
    <div className="App">
      <h1 className='title'>To Do List</h1>
      <section className="TodoList" >
        {todoList.map(todo => 
          <TodoInfo 
          todo={todo} 
          isChecked={isChecked}
          key={todo.id} 
          handleClick={handleClick}/>)}
      </section>
    </div>
  );
}

const TodoInfo = ({ todo, handleClick, isChecked }) => {
  const isCompleted = todo.completed === true ? 'TodoInfo--completed' : '';
return (
    <div className={`TodoInfo ${isCompleted}`} onClick={() => handleClick(todo.id)}>
      <p className='todoTitle'>{todo.title}</p>
    </div>
);
}

export default App;
