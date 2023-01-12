import React from 'react';
import './style.css';
import { Todo } from './model';
import SingleTodo from './SingleTodo';

interface props{
    todoList:Todo[],
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>,
}
const TodoList:React.FC<props> = ({todoList,setTodos}) => {
    console.log(todoList)
    return (
        <div className="container">
            <div className="todos_active todos_block">
                <span className="todos_headings">
                    Todo Backlog
                </span>
                             {todoList.map(todo_ =>
            <SingleTodo todo={todo_} 
            key={todo_.id} todos={todoList}
            setTodos={setTodos} />

      )}
            </div>

            <div className="todos_ongoing todos_block">
            <span className="todos_headings">
                    Active Task
                </span>
                             {todoList.map(todo_ =>
            <SingleTodo todo={todo_} 
            key={todo_.id} todos={todoList}
            setTodos={setTodos} />

      )}
            </div>

            <div className="todos_complete todos_block">
            <span className="todos_headings">
                    Completed Task
                </span>
                             {todoList.map(todo_ =>
            <SingleTodo todo={todo_} 
            key={todo_.id} todos={todoList}
            setTodos={setTodos} />

      )}
            </div>
        </div>
    //     <div className='todos'>

            
    //              {todoList.map(todo_ =>
    //         <SingleTodo todo={todo_} 
    //         key={todo_.id} todos={todoList}
    //         setTodos={setTodos} />

    //   )}
    //     </div>
    );
};

export default TodoList;