import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import PaginaInicio from './components/PaginaInicio';
import Actividad from './actividades/Actividad';
import Comunidad from './comunidad/publicacion';
import Apoyo from './apoyo/Apoyo';
import Menu from './navegacion/MenuUser';

function Header() {
    return (
        
            <div className="App">
                <Menu />
                

            </div>
       
    );
}

export default Header;
