import React from "react";
import "./App.css";
import { store } from "./actions/store";
import { Provider } from "react-redux";
import Posts from './components/Posts';

function App() {
  return <Provider store={store}>
    <Posts/>
  </Provider>;
}

export default App;
