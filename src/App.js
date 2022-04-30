import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
} from "react-router-dom";

import PaginaInicio from './components/PaginaInicio';
import Actividad from './actividades/Actividad';
import Comunidad from './comunidad/publicacion';
import Apoyo from './apoyo/Apoyo';
import Header from './Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="Header/*" element={<Header />} >
            <Route path='Actividades' element={<Actividad />} />
            <Route path='Comunidad' element={<Comunidad/>} />
            <Route path='Voluntarios' element={<Apoyo />} />
          </Route>
        </Routes>


      </div>
    </Router>
  );
}

export default App;
