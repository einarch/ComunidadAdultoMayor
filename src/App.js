
import React, {useState} from 'react';
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
import P404 from './Pagina404/P404';


function App() {

  const {user} = useContext(UserContext); 
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
          <Route exact path="/Comunidad" element={<Comunidad />} />
          <Route exact path="/Actividades" element={<Actividad />} />
          <Route exact path="/Voluntarios" element={<Apoyo />} />
          <Route  path="*" element={<P404/>}/>

        </Routes>

      </div>
    </Router>
   
  );
}

export default App;
