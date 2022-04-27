import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Actividad from './actividades/Actividad';
import Comunidad from './comunidad/publicacion';
import Apoyo from './apoyo/Apoyo';
import Menu from './navegacion/MenuUser';

function Header() {
    return (

        <div >
            <Menu />
            <Router>
                <div>
                    <Routes>
                        <Route exact path="/" element={<Menu />} />
                        <Route exact path="/Comunidad" element={<Comunidad />} />
                        <Route exact path="/Actividades" element={<Actividad />} />
                        <Route exact path="/Voluntarios" element={<Apoyo />} />
                    </Routes>

                </div>
            </Router>

        </div>


    );
}

export default Header;
