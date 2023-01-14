import React, { useEffect, useState } from 'react';
import './App.css';
import InputFiel from './Component/InputFiel';
import { Todo } from './Component/model';
import TodoList from './Component/TodoList';
// import Calculator from './Component/Calculator';
import {DragDropContext} from 'react-beautiful-dnd'


const App:React.FC = ()=> {
const  [todo,setTodo] = useState<string>("");
// const  [todo,setTodo] = useState<string | number>("");
  const [todos, setTodos] = useState<Todo[]>([])
  const [complitedTodos, setComplitedTodos] = useState<Todo[]>([])
  const [onGoingTodos,setOnGoingTodos] = useState<Todo[]>([])
console.log(todo);


const handleAdd = (e:React.FormEvent) =>{
e.preventDefault();
if (todo){
  setTodos([...todos,{id:Date.now(),todo:todo,isDone:false,isStarted:false}])
  setTodo('');
}
}
  
  useEffect(() => {
    setComplitedTodos(todos.filter(todo => todo.isDone === true && todo.isStarted === false))
    setOnGoingTodos(todos.filter(todo => todo.isStarted===true))
  },[todos])

console.log(todos);
  return (
    <DragDropContext onDragEnd={()=>{}}>

    <div className="App">
      <span className='heading'>Task Manager</span>
      <InputFiel todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList todoList={todos} setTodos={setTodos}
          complitedTodos={complitedTodos} setComplitedTodos={setComplitedTodos}
          onGoingTodos={onGoingTodos} setOnGoingTodos={setOnGoingTodos}/>
      {/* <Calculator/> */}
    </div>
    </DragDropContext>
  );
}

export default App;
