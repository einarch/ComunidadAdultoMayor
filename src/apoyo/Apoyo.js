
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';

import './../apoyo/Apoyo.css';
import ApoyoList from './ApoyoList';
import NavegacionAp from '../components/NavegacionVol';

const Apoyo = ({ children }) => {
    const naveg = <NavegacionAp />;

    return (
        <><div className='container' class="bg-ligth">
            <br />
            {naveg}
        </div><>
                <br />
                <br />
                <br />
                <br />
                <br />
                <h1 className="header"> Voluntarios de Apoyo</h1>
                <Container className="p-5 mb-4 bg-light rounded-3" className='div2'>
                    <div class="row justify-content-center" className="div1">
                        <table class="table table-bordered" border="3">
                            <ApoyoList>
                            </ApoyoList>
                        </table>
                    </div>
                </Container>
            </></>
    );
}

export default Apoyo;
