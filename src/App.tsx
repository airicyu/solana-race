import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Web3ContextProvider } from "./context/Web3Context";
import { MainContainer } from "./components/MainContainer";

function App() {
  return (
    <div className="App">
      <Web3ContextProvider>
        <MainContainer></MainContainer>
      </Web3ContextProvider>
    </div>
  );
}

export default App;
