import React from 'react';
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import PaginaInicio from './components/PaginaInicio';
import Actividad from './actividades/Actividad';
import Comunidad from './comunidad/publicacion';
import Apoyo from './apoyo/Apoyo';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<PaginaInicio />} />
          <Route exact path="/Comunidad" element={<Comunidad />} />
          <Route exact path="/Actividades" element={<Actividad />} />
          <Route exact path="/Voluntarios" element={<Apoyo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
