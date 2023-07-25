import { useState } from 'react';
import './App.css';

function App() {
 const [list, setList] = useState([]);
 const [undid, setUndid] = useState([]);

  const handleClick = (event)=> {
    const newCircle = {
      clientX: event.clientX,
      clientY: event.clientY,
    };

  console.log(newCircle);
  setList((prev) => [...prev, newCircle]);
};

const handleUndo = (event) => {
  event.stopPropagation();
  console.log('undo');

  if (list.length === 0){
    return;
  }


  const lastItem = [list];
  setUndid((prev) =>[...prev, lastItem]);

  setList((prev) => {
    const newArr = [...prev].slice(0, -1);
    return newArr
  });
};

const handleRedo = (event) =>{
  event.stopPropagation();
  console.log('redo');

    if (list.length === 0){
      return;
    }


  const lastItem = undid[undid.length -1];
  setUndid((prev) => {
    const newArr = [...prev].slice(0, -1);
    return newArr
  });
  setList((prev)=> [...prev, lastItem]);


}
  return (
    <div className="App" onClick={handleClick}>
      {list.map((item) => ( 
      <span className="circle"
       style={{left:item.clientX, top:item.clientY}}/>
      ))}
     <button onClick={handleUndo}><b>Desfazer</b></button>
     <button onClick={handleRedo}><b>Refazer</b></button>
    </div>
  );
  
}

export default App;
