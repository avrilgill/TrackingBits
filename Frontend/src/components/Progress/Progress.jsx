import React, {useState, useEffect}  from "react";
import AddIcon from '@material-ui/icons/Add';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router-dom';
import "./Progress.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

//Tutorial used: https://www.youtube.com/watch?v=pCA4qpQDZD8&t=937s&ab_channel=DevEd


function Todo ({text,todos,setTodos,todo}) {

    const deleteItem = () => {
        //todo filter goes through the array 
        //if id matches it will get rid of it
        setTodos(todos.filter(el => el.id !== todo.id));
    };
    const completedItem = () => {
        setTodos(todos.map(item => {
            if(item.id === todo.id){
                return{
                    ...item, completed: !item.completed
                }
            }
            return item;
        }))
    }

    return (
        <div className = "todo">
            <li className = {`todo-item ${todo.completed ? "completed" : ""}`}>{text}</li>
            <button onClick = {completedItem} className = "complete-btn"><DoneOutlineIcon/></button>
            <button onClick = {deleteItem} className = "trash-btn"><DeleteForeverIcon/></button>
        </div>
    );
}


function TodoList ({todos,setTodos,filteredTodos}) {
    return(
    <div class = "todo-container">
        <ul className = "todo-list">
          {filteredTodos.map((todo) => (
              <Todo key = {todo.id} text = {todo.text} todos = {todos} setTodos = {setTodos} todo = {todo}/>
          ))}
        </ul>
    </div>
 );
};




function Form ({setInputText, setTodos,todos,inputText,setStatus}) {

    const inputHandler = (i) => {
        setInputText(i.target.value)
    };

    const submitTodoHandler = (i) =>  {
        //To prevent refresh when pressing plus button
        i.preventDefault();
        //Making new object
        setTodos([
            ...todos,{text: inputText, completed: false, id: Math.random()*1000}
        ]);
        //reset the state
        setInputText("");
    };

    const statusHandler = (i) => {
        setStatus(i.target.value);
    };
    
    return (
        <form>
            <input value = {inputText} onChange = {inputHandler} type="text" className="todo-input" title = "input" />
            <button title = "submit" onClick = {submitTodoHandler} className="todo-button" type="submit">
                <AddIcon/>
            </button>
            <div className= "select">
                <select onChange = {statusHandler} name = "todos" className = "filter-todo">
                    <option value = "all"> All </option>
                    <option value = "to-do"> To-Do </option>
                    <option value = "completed"> Completed </option>
                </select>
            </div>
        </form>
    );
};


function Pbar({todos}) {
    let i = 0;
    let count = 0;
    for(i = 0; i<todos.length;i++){
        if(todos[i].completed == true){
            count++;
        }
    }
    return(
        <div className = "progress">
            <div className = "bar" style = {{width: Math.round((count/todos.length)*1000)}}>
                <center><h1 className = "percent">{Math.round((count/todos.length)*100)}%</h1></center>
            </div>
        </div>
    );
};



function Progress () {
    const [inputText,setInputText] = useState("")
    //need array to put the todos in
    const [todos,setTodos] = useState([]);
    const [status,setStatus] = useState("All");
    const [filteredTodos,setFilteredTodos] = useState([]);
    const history = useHistory();

    const filterHandler = () => {
        switch(status){
            case 'completed':
                setFilteredTodos(todos.filter(todo => todo.completed === true));
                break;
            case 'to-do':
                setFilteredTodos(todos.filter(todo => todo.completed === false));
                break;
            default:
                setFilteredTodos(todos);
                break;
        }
    };

    //empty array to make it run once
    useEffect(() => {
        getLocalTodos();
    },[])

    //every time todo state changes it will rerun the inner function
    useEffect (()=> {
        filterHandler();
        saveLocalTodos();
    }, [todos,status]);
    
    function goHome(){
        history.push("/")
      }


    const saveLocalTodos = () => { 
        localStorage.setItem("todos",JSON.stringify(todos));
    };

    const getLocalTodos = () => {
        if(localStorage.getItem("todos") === null){
            localStorage.setItem("todos", JSON.stringify([]));
        }else{
            let localTodo = JSON.parse(localStorage.getItem("todos"))
            setTodos(localTodo);
        }
    };

    return (
        <div className = "App">
            <header>
                <h1 title = "header" className = "title" style = {{fontFamily:"monospace"}}>Progress</h1>
            </header>
            <div classHame = "homeDiv">
            <center><h1><HomeIcon title = "homeIcon" className = "home" onClick = {goHome} style = {{fontSize: "50px"}}/></h1></center>
            </div>
            <Pbar todos = {todos} filteredTodos = {filteredTodos}/>
            <br></br>
            <center><Calendar/></center>
            <Form setInputText = {setInputText} inputText = {inputText} todos = {todos} setTodos = {setTodos} setStatus ={setStatus}/>
            <TodoList todos = {todos} setTodos = {setTodos} filteredTodos = {filteredTodos}/>
            <br></br>
        </div>
    );
};

export default Progress;