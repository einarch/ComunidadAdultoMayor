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

        <>
            <Menu />
            <div>
                <Routes>
                    <Route exact path="/Header/Comunidad" element={<Comunidad />} />
                    <Route exact path="/Header/Actividades" element={<Actividad />} />
                    <Route exact path="/Header/Voluntarios" element={<Apoyo />} />
                </Routes>

            </div>
        </>


    );
}

export default Header;
