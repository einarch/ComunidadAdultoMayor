import React from 'react';
import {useState} from 'react';
import { useContext } from 'react';
import { UserContext } from './login/context/UserContext';
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
import P404 from './Pagina404/P404';

function App() {

  const { user } = useContext(UserContext);
  const [conectado, setConectado]= useState(true);

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
          <Route path="home/*" element={<Header />} >
            <Route index element={<Comunidad />} />
            <Route path='comunidad' element={<Comunidad />} />
            <Route path='actividades' element={<Actividad />} />
            <Route path='voluntarios' element={<Apoyo />} />
            <Route path="*" element={<P404 />} />
          </Route>
        </Routes>

      </div>
    </Router>
  );
}

export default App;
