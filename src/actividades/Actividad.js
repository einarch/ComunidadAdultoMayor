import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import axios from 'axios';
import { Form } from 'react-bootstrap';
import dateFormat, { masks } from "dateformat";
import './../actividades/Actividad.css';
import avatar from './../imagenes/avatar.jpg'
import configData from "../config/config.json";

const Actividad = ({ children }) => {

    const baseUrl = configData.ACTIVITIES_API_URL;
    const [data, setData] = useState([]);

    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        peticionGet();
    }, [])

    return (
        <><div>
            <br />
            <br />
            <br />
        </div><>
                <br />
                <br />
                <h2 className="title">Actividades y Eventos</h2>
                <br />
                <Container className="d-flex flex-row justify-content-end">
                    <button type="button" className="btn m-2 btn-primary" data-bs-toggle="modal" data-bs-target="#createActivity">Crear</button>
                </Container>
                <div align="center">
                    <div className="modal fade" id="createActivity" tabindex="-1" aria-hidden="true" aria-labelledby="modalTitle" data-bs-backdrop="static">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modalColor d-flex flex-row justify-content-center">
                                    <h2 className="modal-title textLabelColor"><b>ACTIVIDAD</b></h2>
                                </div>
                                <div className="modal-body tam p-3 modalColor ">
                                    <form className="row g-3">
                                        <div className="col-md-12">
                                            <Form.Label for="validationServer01" className="form-label textLabelColor d-flex flex-row align-items-left">Nombre</Form.Label>
                                            <Form.Control type="text" class="form-control" id="validationServer01" required />
                                        </div>
                                        <div className="col-md-12">
                                            <Form.Label for="validationServer02" className="form-label textLabelColor d-flex flex-row align-items-left">Fecha y Hora</Form.Label>
                                            <Form.Control
                                                type="datetime-local"
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <Form.Label for="validationServer02" className="form-label textLabelColor d-flex flex-row align-items-left">Ubicación</Form.Label>
                                            <Form.Control type="text" class="form-control" id="validationServer02" required />
                                        </div>
                                        <div className="col-md-12">
                                            <Form.Label for="validationServer02" className="form-label textLabelColor d-flex flex-row align-items-left">Descripción</Form.Label>
                                            <textarea className="form-control" id="desc" rows="4" cols="35" required></textarea>
                                        </div>
                                    </form>
                                </div>
                                <div className="model-footer col-12 modalColor" align="center">
                                    <button type="button" class="btn btn-secondary col-3 m-2 " data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" class="btn btn-success col-3 m-2 " data-bs-dismiss="modal">Crear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Container className="p-4 mb-4">
                    {data.map(actividad => {
                        return (
                            <Card id="cardItem" className="text-left">
                                <Card.Body>
                                    <Card.Text className='d-flex flex-row'>
                                        <div className='col-sm-2 d-flex flex-column align-items-center justify-content-center '>
                                            <img src={avatar} className="rounded-circle" height="120" width="120"></img>
                                        </div>
                                        <div className="col-sm-10 d-flex flex-column align-items-left justify-content-center ">
                                            <h3 className="cardItemUserName mt-0 mb-1"><b>{actividad.NOMBRE} {actividad.APELLIDO}</b></h3>
                                            <h4 className="cardItemTitle"><b>Actividad:</b> <span className='uppercaseText'>{actividad.ACTIVIDAD}</span></h4>
                                            <h4 className="cardItemTitle"><b>Fecha y hora:</b> {dateFormat(actividad.FECHAHORAA, "dd/mm/yyyy h:MM TT")}</h4>
                                            <h4 className="cardItemTitle"><b>Ubicación:</b> {actividad.UBICACIONA}</h4>
                                            <h4 className="cardItemTitle">{actividad.DESCRIPCIONA}</h4>
                                            <h4 className="cardItemTitle"><b>{actividad.numusuarios}</b> personas asistirán a la actividad.</h4>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    }
                    )}
                </Container>
            </></>
    );
}

export default Actividad;
