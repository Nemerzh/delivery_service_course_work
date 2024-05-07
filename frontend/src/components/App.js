import React, { Component } from "react";
import { render } from "react-dom";
import { DataProvider } from '../context/DataContext';
import MyComponent from './MyComponent';
import { createRoot } from 'react-dom/client';


const App = () => {
  return (
    <MyComponent />
  );
};

export default App;


const appDiv = document.getElementById("app");

const root = createRoot(appDiv); // createRoot(container!) if you use TypeScript
root.render(<App/>);