import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,Link, Outlet,NavLink
} from "react-router-dom";

import Actividad from './actividades/Actividad';
import Comunidad from './comunidad/publicacion';
import Apoyo from './apoyo/Apoyo';
import Menu from './navegacion/MenuUser';

function Header() {
    return (

        <>
            <Menu/>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <Link to={"/Header/Voluntarios"}>Say comunidad</Link>
            <div>
            <ul>
                <li>
                    <NavLink to='/Header/Voluntarios' className={( data ) => console.log(data)} >Comunidad</NavLink>
                </li>
            </ul>
            </div>
            <div>
               <Outlet/>
            </div>
        </>


    );
}

export default Header;
