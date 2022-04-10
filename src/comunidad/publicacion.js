import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';

import './../comunidad/Publicacion.css';
import ListaPublicaciones from './ListaPublicaciones';
import Navegacion from '../components/Navegacion';

const Publicacion = ({ children }) => {
    const naveg = <Navegacion />;

    return (
        <><div className='container' class="bg-ligth" >
            <br />
            {naveg}
        </div><>
                <br />
                <br />
                <br />
                <br />
                <br />
                <h1 className="header">Publicaciones y Noticias</h1>
                <Container className="p-5 mb-4 bg-light rounded-3" className="div2" >
                    <div class="row justify-content-center" className="div1">
                        <table class="table table-bordered" border="0">
                            <ListaPublicaciones>
                            </ListaPublicaciones>
                        </table>
                    </div>
                </Container>
            </></>
    );
}

export default Publicacion;
