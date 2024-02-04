import { useEffect, useState} from "react";
import TodoItem from "./TodoItem.tsx";

const API_base = 'http://localhost:4001/todo';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");


  useEffect(() => {
    GetTodos();
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const GetTodos = () => {
    fetch(API_base).then(res => res.json()).then(data => setItems(data)).catch(err => console.log(err))
  }

  const addItem = async() => {
    const data = await fetch(API_base +"/new", {
      method: "POST",
      headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify({
      name:input,
    })
  }).then(res => res.json())
  console.log(data);
  await GetTodos()
  setInput('')
  }


  return (
    <div className="container"> 
      <div className="heading">
        <h1>To-do app</h1>
      </div>

      <div className="form">
        <input type='text' value={input} onChange={handleChange}></input>
        <button onClick={()=>addItem()}>
          <span>Add</span>
        </button>
      </div>
      <div className="todolist">
        {items.map((item)=> {
          const{_id,name}=item
          return <TodoItem name={name} id={_id} setItems={setItems}/>
        })}
      </div>
    </div>
  );
}

export default App;
