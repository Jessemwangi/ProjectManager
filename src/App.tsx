import React, { useEffect, useState } from 'react';
import './App.css';
import InputFiel from './Component/InputFiel';
import { Progress, Todo } from './Component/model';
import TodoList from './Component/TodoList';
// import Calculator from './Component/Calculator';
import {DragDropContext, DropResult } from 'react-beautiful-dnd'


const App:React.FC = ()=> {
const  [todo,setTodo] = useState<string>("");
 const [todos, setTodos] = useState<Todo[]>([])
  const [complitedTodos, setComplitedTodos] = useState<Todo[]>([])
  const [onGoingTodos, setOnGoingTodos] = useState<Todo[]>([])
  const[backLog,setBacklog] = useState<Todo[]>([])


const handleAdd = (e:React.FormEvent) =>{
  e.preventDefault();
  
  console.log(todo)
if (todo){
  setTodos(
    [...todos, {
      progress: Progress.BACKLOG,
      id: Date.now(), todo: todo,
      isDone: false, isStarted: false, createdAt: `${new Date().toLocaleDateString()}`, deleted: false
    }])
  setTodo("");
}
}

useEffect(() => {
  setComplitedTodos(complitedTodos)
  setOnGoingTodos(onGoingTodos)
  setBacklog(backLog)
}, [backLog, complitedTodos, onGoingTodos, setBacklog, setComplitedTodos, setOnGoingTodos])



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
        case "todosComplete" :
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
    if (destination.droppableId === "todosComplete") {
     
      complete.splice(destination.index, 0,{...add,isDone:true, isStarted:false})
      
    }
    
 console.log(add)

    setBacklog(backLog);
    setOnGoingTodos(ongoing)
    setComplitedTodos(complete)
    console.log(result )
  }
// console.log(todos);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
      <span className='heading'>Task Manager</span>
        <InputFiel todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        
        <TodoList 
          todos={todos}
        />
      
    </div>
    </DragDropContext>
  );
}

export default App;
