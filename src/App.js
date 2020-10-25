import React from "react";
import "./App.css";
import Posts from './components/Posts';
import EditForm from './components/EditForm';
import NavBar from './components/NavBar';
import PostForm from './components/PostForm';
import Form from './components/PostForm';
import { Provider } from "react-redux";
import { store } from "./actions/store";
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
          <Route path="/post" component={PostForm} exact/>
          <Route path="/post/:id" component={EditForm} />

            {/* <Route component={Error}/> */}
        </Container>
    </Switch>
</Provider>
    

  )
}

export default App;
