
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';

import './../actividades/Actividad.css';
import ActivityList from './ActivityList';
import Navegacion from '../components/NavegacionA';


const Actividad = ({ children }) => {
    const naveg = <Navegacion />;

    return (
        <><div className='container' class="bg-ligth ">
            <br />
            {naveg}
        </div><>
                <br />
                <br />
                <br />
                <br />
                <br />
                <h1 className="header">Actividades y Eventos</h1 >
                <Container className="p-5 mb-4 bg-light rounded-3" className='div2'>
                    <div class="row justify-content-center" className="div1">


                        <table class="table table">
                            <ActivityList>
                            </ActivityList>
                        </table>


                    </div>
                </Container>
            </></>
    );
}

export default Actividad;
