import React, {useState} from "react";

const API_BASE='http://localhost:4001/todo';

function TodoItem(props){
    const{name, id, setItems} = props;

    const deleteTodo = async(id) => {
        try{
            const response = await fetch(API_BASE + '/delete/' + id, {
                method: "DELETE",
                
            });
            if(!response.ok){
                throw new Error("Failed to delete")
            }
            const data = await response.json()
            setItems(items=> items.filter(item=> item._id !== data._id))
            }catch(error) {
            console.error("Error updating task ",error);
            }
        }
    
    const updateTodo = async(id, updatedTask) => {
        try{
            const response = await fetch(API_BASE + '/update/' + id, {
                method: "PUT",
                body: JSON.stringify(updatedTask),
            });
            if(!response.ok){
                throw new Error("Failed to update")
        }
        const data= await response.json()
        setItems((items) =>
        items.map((item) => (item._id === data._id ? data : item)))
        }catch(error) {
            console.error("Error updating task ", error);
        }
    }
    
    return(

        <div className="todo">
            <div className="text">{name}</div>
            <div className="update-todo" onClick={()=> updateTodo(id,"jeff")}><span>i</span></div>
            <div className="delete-todo" onClick={()=> deleteTodo(id)}><span>X</span></div>
        </div>
    )
}

export default TodoItem;