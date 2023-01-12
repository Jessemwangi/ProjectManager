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
        <div className='todos'>
                 {todoList.map(todo_ =>
            <SingleTodo todo={todo_} 
            key={todo_.id} todos={todoList}
            setTodos={setTodos} />

      )}
        </div>
    );
};

export default TodoList;