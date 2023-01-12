import React, { useState } from 'react';
import './App.css';
import InputFiel from './Component/InputFiel';
import { Todo } from './Component/model';
import TodoList from './Component/TodoList';
import Calculator from './Component/Calculator';


const App:React.FC = ()=> {
const  [todo,setTodo] = useState<string>("");
// const  [todo,setTodo] = useState<string | number>("");
const [todos,setTodos]=useState<Todo[]>([])
console.log(todo);


const handleAdd = (e:React.FormEvent) =>{
e.preventDefault();
if (todo){
  setTodos([...todos,{id:Date.now(),todo:todo,isDone:false}])
  setTodo('');
}
}

console.log(todos);
  return (
    <div className="App">
      <span className='heading'>Task Manager</span>
      <InputFiel todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList todoList={todos} setTodos = {setTodos}/>
      {/* <Calculator/> */}
    </div>
  );
}

export default App;
