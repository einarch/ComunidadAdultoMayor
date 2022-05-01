import React from 'react';
import {useContext} from 'react';
import {UserContext} from './login/context/UserContext';
import Login from './login/Login';
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import PaginaInicio from './components/PaginaInicio';
import Actividad from './actividades/Actividad';
import Comunidad from './comunidad/publicacion';
import Apoyo from './apoyo/Apoyo';
import Header from './Header';

function App() {

  const {user} = useContext(UserContext); 

  return (
    <Router>
      <div className="App">
        <Routes>
          


        {user && <Route exact path="/" element={<PaginaInicio />} />}
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
            </>
          )}
          <Route path="*" element={<Navigate to={user ? '/' : '/login'} />} />

          <Route path="/" element={<PaginaInicio />} />
          <Route path="Home/*" element={<Header />} >
            <Route index element={<Comunidad />} />
            <Route path='Comunidad' element={<Comunidad />} />
            <Route path='Actividades' element={<Actividad />} />
            <Route path='Voluntarios' element={<Apoyo />} />
          </Route>
        </Routes>

      </div>
    </Router>
  );
}

export default App;
