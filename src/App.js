import React from 'react';
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import PaginaInicio from './components/PaginaInicio';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
      <Route exact path="/" element={<PaginaInicio/>}/>
      </Routes>
      </div>
    </Router>
  );
}


export default App;
