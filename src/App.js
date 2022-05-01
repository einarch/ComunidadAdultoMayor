
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
<<<<<<< HEAD
import P404 from './Pagina404/P404';

=======
import Header from './Header';
>>>>>>> 2c123c61216a9785acdb11a31c633b4e4f69b5a9

function App() {

  const {user} = useContext(UserContext); 
  const [conectado, setConectado]= useState(true);

  return (
    <Router>
      <div className="App">
        <Routes>
<<<<<<< HEAD
          {user && <Route exact path="/" element={<PaginaInicio />} />}
=======
          


        {user && <Route exact path="/" element={<PaginaInicio />} />}
>>>>>>> 2c123c61216a9785acdb11a31c633b4e4f69b5a9
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
            </>
          )}

          <Route path="/P404" element={<Navigate to={user ? '/' : '/Login'} />} />

<<<<<<< HEAD
          <Route exact path="/" element={<PaginaInicio />} />
          <Route exact path="/Comunidad" element={<Comunidad />} />
          <Route exact path="/Actividades" element={<Actividad />} />
          <Route exact path="/Voluntarios" element={<Apoyo />} />
          <Route  path="*" element={<P404/>}/>

=======
          <Route path="/" element={<PaginaInicio />} />
          <Route path="Home/*" element={<Header />} >
            <Route index element={<Comunidad />} />
            <Route path='comunidad' element={<Comunidad />} />
            <Route path='actividades' element={<Actividad />} />
            <Route path='voluntarios' element={<Apoyo />} />
          </Route>
>>>>>>> 2c123c61216a9785acdb11a31c633b4e4f69b5a9
        </Routes>

      </div>
    </Router>
   
  );
}

export default App;
