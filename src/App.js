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
import {AuthProvider} from './login/auth';
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

          <Route path="/P404" element={<Navigate to={user ? '/' : '/Login'} />} />

          <Route exact path="/" element={<PaginaInicio />} />
          
          <Route path="Home/*" 
            element={
              <RequireAuth>
                 <Header /></RequireAuth>} 
                 >
            <Route index element={<Comunidad />} />
            <Route path='comunidad/:id' element={<RequireAuth><Comunidad /></RequireAuth>} />
            <Route path='actividades/:id' element={<RequireAuth><Actividad /></RequireAuth>} />
            <Route path='voluntarios/:id' element={<RequireAuth><Apoyo /></RequireAuth>} />
          </Route>
          <Route  path="*" element={<P404/>}/>

        </Routes>

      </div>
    </Router>
  );
}

export default App;