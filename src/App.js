import React from "react";
import "./App.css";
import { store } from "./actions/store";
import { Provider } from "react-redux";
import Posts from './components/Posts';
import NavBar from './components/NavBar';
import PostForm from './components/PostForm';
// import Error from "./components/Error";
import {  Container  } from "@material-ui/core";
import { Switch, Route} from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <NavBar/>
    <Switch>
        <Container maxWidth="lg">
          <Route  path="/" component={Posts} exact/>
          <Route path="/post" component={PostForm}/>
            {/* <Route component={Error}/> */}
        </Container>
    </Switch>

    {/* 
        <Container maxWidth="lg">
          <Posts/>
        </Container>
    */}
    
  </Provider>
  )
}

export default App;
