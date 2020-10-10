import React from "react";
import "./App.css";
import { store } from "./actions/store";
import { Provider } from "react-redux";
import Posts from './components/Posts';
import {  Container  } from "@material-ui/core";

function App() {
  return <Provider store={store}>
    <Container maxWidth="md">
    <Posts/>
    </Container>
    
  </Provider>;
}

export default App;
