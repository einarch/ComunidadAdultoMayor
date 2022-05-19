import React from 'react';
import {
    BrowserRouter as Router, Outlet
} from "react-router-dom";

import Menu from './navegacion/MenuUser';

function Header() {
    return (

        <>
            <Menu/>
            <br />
            <div>
               <Outlet/>
            </div>
        </>


    );
}

export default Header;
