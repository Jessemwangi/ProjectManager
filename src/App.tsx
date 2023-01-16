import React, { useEffect, useState } from 'react';
import './App.css';
import InputFiel from './Component/InputFiel';
import { Todo } from './Component/model';
import TodoList from './Component/TodoList';
// import Calculator from './Component/Calculator';
import {DragDropContext, DropResult } from 'react-beautiful-dnd'


const App:React.FC = ()=> {
const  [todo,setTodo] = useState<string>("");
// const  [todo,setTodo] = useState<string | number>("");
  const [todos, setTodos] = useState<Todo[]>([])
  const [complitedTodos, setComplitedTodos] = useState<Todo[]>([])
  const [onGoingTodos, setOnGoingTodos] = useState<Todo[]>([])
  const[backLog,setBacklog] = useState<Todo[]>([])
console.log(todo);


const handleAdd = (e:React.FormEvent) =>{
e.preventDefault();
if (todo){
  setTodos([...todos, { id: Date.now(), todo: todo, isDone: false, isStarted: false, createdAt: `${new Date().toLocaleDateString()}` , deleted:false}])
  setTodo('');
}
}

  
  useEffect(() => {
    setComplitedTodos(todos.filter(todo => todo.isDone === true && todo.isStarted === false &&  todo.deleted===false))
    setOnGoingTodos(todos.filter(todo => todo.isStarted === true &&  todo.deleted===false))
    setBacklog(todos.filter(todos => todos.isDone === false && todos.isStarted === false &&  todos.deleted===false))
  },[todos])


  const onDragEnd = (result: DropResult) => {
    let add:any
    const { source, destination } = result;
    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    let  ongoing = onGoingTodos, complete = complitedTodos, backlog = backLog
    
    switch (source.droppableId) {
     
      case  "todosbacklog" :
        add = backlog[source.index]
        backlog.splice(source.index, 1)
        
        break;
        case "todosOngoing":
        add = backlog[source.index]
        ongoing.splice(source.index, 1)
        
        break;
        case "todosRemove" :
        add = complete[source.index]
        complete.splice(source.index, 1)
        break;
    }
    if (destination.droppableId === "todosbacklog") {
      backLog.splice(destination.index, 0,{...add,isDone:false, isStarted:false})
      
    }
    if (destination.droppableId === "todosOngoing") {
      ongoing.splice(destination.index, 0,{...add, isDone:false, isStarted:true})
      
    }
    if (destination.droppableId === "todosRemove") {
     
      complete.splice(destination.index, 0,{...add,isDone:true, isStarted:false})
      
    }
    
 console.log(add)

    setBacklog(backLog);
    setOnGoingTodos(ongoing)
    setComplitedTodos(complete)
    console.log(result )
  }
console.log(todos);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
      <span className='heading'>Task Manager</span>
      <InputFiel todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        <TodoList todoList={todos}
          setTodos={setTodos}
          complitedTodos={complitedTodos} setComplitedTodos={setComplitedTodos}
          onGoingTodos={onGoingTodos} setOnGoingTodos={setOnGoingTodos}
          backLog={backLog}
          setBacklog={setBacklog}/>
      {/* <Calculator/> */}
    </div>
    </DragDropContext>
  );
}

export default App;
