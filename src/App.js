import React from 'react';
import {useState} from 'react';
import { useContext } from 'react';
import { UserContext } from './login/context/UserContext';
import Login from './login/Login';
import Register from './registro/Register';
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
import { RequireAuth } from './login/RequireAuth'
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
          {!user && (
            <>
              <Route path="/registro" element={<Register/>} />
            </>
          )}

          <Route path="/P404" element={<Navigate to={user ? '/' : '/Login'} />} />

          <Route exact path="/" element={<PaginaInicio />} />
          
          <Route path="Home/*" 
            element={
              <RequireAuth>
                 <Header /></RequireAuth>} 
                 >
            <Route index element={<Comunidad />} />
            <Route path='comunidad' element={<RequireAuth><Comunidad /></RequireAuth>} />
            <Route path='actividades' element={<RequireAuth><Actividad /></RequireAuth>} />
            <Route path='voluntarios' element={<RequireAuth><Apoyo /></RequireAuth>} />
            <Route  path="*" element={<P404/>}/>
          </Route>
          <Route  path="*" element={<P404/>}/>

        </Routes>

      </div>
    </Router>
  );
}

export default App;