import React, { FormEvent, useState } from "react";

// interface props {
//     firstNo:number,
//     secNo:number,
//     result:number,
// }

const Calculator = () => {
  const [result, setResult] = useState<number>(0);
  const [firstNo, setFirstNo] = useState<number>(0);
  const [secNo, setSecNo] = useState<number>(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setResult(firstNo + secNo);
    console.log(result);
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <input
          type="number"
          placeholder="enter a number"
          className="calc_input"
          name="firstNo"
          onChange={(e) => {
            e.preventDefault();
            setFirstNo(parseInt(e.target.value));
          }}
        />
        <select name="" id="" onChange={()=>{
            
        }}>
            <option value="0">select Action</option>
            <option value="/">Divide</option>
            <option value="*">Multiply</option>
            <option value="+">Add</option>
            <option value="-">Substract</option>
        </select>
        <input
          type="number"
          placeholder="enter sec number"
          className="calc_input"
          name="secNo"
          onChange={(e) => {
            e.preventDefault();
            let secondNo = parseInt(e.target.value);
            setSecNo(secondNo);
          }}
        />

        <input type="submit" value="send data" />
        <p>the result is {result}</p>
      </div>
    </form>
  );
};

export default Calculator;
