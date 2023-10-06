import { useState } from 'react';
import './App.css';

const todos = [
  {id: 0, title: 'listen to a lecture', completed: false},
  {id: 1, title: 'solve an algorithm', completed: false},
  {id: 2, title: 'apply for jobs', completed: false}
];

export function App() {
  const [todoList, setTodoList] = useState(todos);
  const currentDate = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDay = currentDate.toLocaleDateString(undefined, options);

  const addNewTodo = (todo) => {
    const maxId = Math.max(...todoList.map(todo => todo.id));

    const newTodo = {
      ...todo,
      id: maxId + 1,
    }

    setTodoList(prevList => [...prevList, newTodo]);
  };

  const handleChange = (id) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((todo) => (
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ))
    );
  };

  return (
    <div className="App">
      <h1 className='title'>To Do List</h1>
      <section className="TodoList">
        <CurrentDay date={formattedDay}/>
        {todoList.map(todo =>
          <TodoInfo
          todo={todo}
          key={todo.id}
          handleChange={handleChange}/>)}
          <Button />
          <TodoForm addNewTodo={addNewTodo}/>
      </section>
    </div>
  );
}

const TodoInfo = ({ todo, handleChange }) => {
  const isCompleted = todo.completed === true ? 'TodoInfo--completed' : '';
  return (
      <div className={`TodoInfo ${isCompleted}`}>
        <label>
        <span className='customBox'>
        <input
          className='checkbox'
          type='checkbox'
          id={todo.id}
          name={todo.title}
          onChange={() => handleChange(todo.id)}
          checked={todo.completed}
        />
        </span>
          {todo.title}
        </label>
      </div>
  );
}

const CurrentDay = ({ date }) => {
  const datePart = date.split(', ');
  const day = datePart[0];
  const currentDate = datePart[1];

  return (
    <div className="CurrentDay">
      <div className="day">{day}</div>
      <div className="month">{currentDate}</div>
    </div>
  )
}

const Button = () => {

}

const TodoForm = ({ addNewTodo }) => {
  const [title, setTitle] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const handleChange = event => {
    setTitle(event.target.value);
    setHasError(false);
  }

  const handleClickToShow = () => {
    !isShown ? setIsShown(true) : setIsShown(false);
  }

  const handlerSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setHasError(true);

      return;
    }

    addNewTodo({
      title,
      completed: false
    });

    reset();
  }

  const reset = () => {
    setTitle('');
    setHasError(false);
    setIsShown(false);
  }

  return (
    <div className='TodoForm'>

        <div
          className='plus_button'
          onClick={handleClickToShow}
        >
           {!isShown ? "+" : "-"}
        </div>


      {isShown &&(
        <form className='form' method="POST" onSubmit={handlerSubmit}>
          <label className='message'>
            <input
              className='field'
              type='text'
              value={title}
              id='0'
              onChange={handleChange}
            />
            <br />
            {!hasError ? 'Time for a new todo' : 'Don\'t forget to add todo'}
          </label>
        </form>
      )}
    </div>
  )
}

export default App;
