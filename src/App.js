import React from 'react';
import {HashRouter, Route , Routes} from "react-router-dom";
import Analytical from './Components/Data/Analytical';
import "./App.css"
const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Analytical/>} />  
      </Routes>
    </HashRouter>
  );
}

export default App;