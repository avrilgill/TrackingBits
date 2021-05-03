import React ,{useState}from "react";
import { TextField } from "@material-ui/core";
import UserContext from "./provider/authprovider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Chat from "./components/Chat/Chat";
import Join from "./components/Chat/Join";
import MakeProject from "./pages/MakeProject";
import Progress from "./components/Progress/Progress";
import Meetings from "./components/Meetings/Meetings";
function App() {
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  //For cross attack token, we will implement it later on
  //const [surf, setSurf] = useState();
  return (
    <>
      <UserContext.Provider
        value={{ user: user, setUser: setUser,setEmail:setEmail,email:email}}
      >
        <Router>
          <Switch>
            <Route exact path="/" component={AuthPage} />
            <Route path='/joinchat' exact component={Join} />
            <Route path='/insidechat' exact component={Chat} /> 
            <Route path='/makeproject' exact component={MakeProject} /> 
            <Route path='/progress' exact component={Progress} /> 
            <Route path='/meetings' exact component={Meetings} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
