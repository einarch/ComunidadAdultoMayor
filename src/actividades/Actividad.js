import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import axios from 'axios';
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
