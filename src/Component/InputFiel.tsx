import React, { useRef } from 'react';
import './style.css';
import { Tooltip } from '@mui/material';

interface props{
    todo:string;
    setTodo:React.Dispatch<React.SetStateAction<string>>;
    handleAdd:(e:React.FormEvent)=>void;
  }
  
//   const InputFiel = ({todo,setTodo}: props) => {  this line can also be declared as shown bellow
const InputFiel:React.FC<props> = ({todo,setTodo,handleAdd}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        
            <form action="" className="input" 
            onSubmit={(e) => {
                handleAdd(e); inputRef.current?.blur();
                // inputRef.current?.focus()
            }}>
                <input type="text" name="" id="" className='input_box' 
                placeholder='enter a task' value={todo} 
                onChange={(e)=>setTodo(e.target.value)}
                ref={inputRef}  />
            <Tooltip title="Add task">
                <button className="input_submit" type='submit' >+</button>
             </Tooltip>
            </form>
       
    );
};

export default InputFiel;