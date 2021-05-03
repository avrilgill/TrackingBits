import React, { useState,useContext } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import UserContext from "../../provider/authprovider";
import Button from "@material-ui/core/Button";
export const Join = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const history = useHistory();
    const { user } = useContext(UserContext);
    const [email, setEmail] = useState(jwt_decode(user)["email"]);
    function joinAChatRoom(){
        history.push("/insidechat")
    }
    function processInfo(e){
        e.preventDefault();
        alert("Please Enter Name and select a chatroom as well");
    }
    return (
        <div style={{
            margin: "auto",
            width: "60%",
            border: "5px solid #cc99ff",
            padding: "10px"
        }}>
            <div>
                <h1>Welcome to Join Chat</h1>
                <div>
                    <input
                        style={{
                            margin: "auto",
                            width: "60%",
                            border: "5px solid #cc99ff",
                            padding: "10px"
                        }}
                        placeholder={"Please enter your name here!"} type="text" onChange={(event) => setName(event.target.value.trim().toLowerCase())} />
                </div>
                <div>
                    <h2>Select a Chatroom Please</h2>
                    <select size="4" onChange={(event) => setRoom(event.target.value)}>
                        <option value="Project Bits">Project Bits</option>
                        <option value="Team at Work">Team at Work</option>
                        <option value="Task Force">Task Force</option>
                        <option value="The Anonymous">The Anonymous</option>
                    </select>
                </div>
                <Link onClick={e => (!name || !room) ? processInfo(e) : null} to={`/insidechat?name=${name}&room=${room}`}>
                    <Button variant="contained" color="primary" type="submit">JOIN</Button>
                </Link>
                <a href="/" ><Button variant="contained" color="secondary">BACK TO HOMEPAGE</Button></a>
            </div>
        </div>
    );
}

export default Join;