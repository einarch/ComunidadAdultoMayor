
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';

import './../actividades/Actividad.css';
import ActivityList from './ActivityList';

const Actividad = ({ children }) => {

    return (
        <>
            <Container className="p-5 mb-4 bg-light rounded-3">
                <h1 className="header">Actividades y Eventos</h1>
                <br></br>
                <br></br>
                <div class="row justify-content-center">
                    <div class="col-md-8 col-sm-12">
                        <div class="comment-wrapper">
                            <table class="table table-bordered" border="2">
                                <ActivityList>
                                </ActivityList>
                            </table>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Actividad;
