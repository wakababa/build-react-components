import React, { createElement, createRef,useState } from 'react';
import { text } from 'stream/consumers';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
const elementTypes ={
  h1:"h1",
  button:"button",
  div:"div"

}

function App() {


  const [selectedElement,setSelectedElement] = useState(undefined)
  const [targetElement,setTargetElement] = useState(undefined)

const divRef = createRef<HTMLDivElement>()
const textRef = createRef<HTMLHeadingElement>()


const handleCreateElement=(type:string)=>{
  let uuid = uuidv4()
  const element = document.createElement(type as keyof typeof elementTypes);
  element.id=uuid
  element.draggable=true
  let dragged:any = null;

  element.addEventListener("dragstart", (event) => {
    // store a ref. on the dragged elem
    dragged = event.target;
  });
  
  element.addEventListener("dragover", (event) => {
    // prevent default to allow drop
    event.preventDefault();
  });
  
  element.addEventListener("drop", (event) => {
     if(dragged){
        // move dragged element to the selected drop target
     const data = document.getElementById("waka")
     //   dragged.parentNode.removeChild(dragged);
     divRef.current?.append(dragged)
     }
  });
  
  element.innerText = type as keyof typeof elementTypes
  divRef.current?.append(element)

}
return (
    <div className="App">
      <div>
        <button onClick={()=>handleCreateElement("h1") }>Header</button>
        <button onClick={()=>handleCreateElement("button") }>Button</button>
        <button onClick={()=>handleCreateElement("div") }>Div</button>
      </div>
       <div id="waka" ref={divRef}>
       </div>
    </div>
  );
}

export default App;
