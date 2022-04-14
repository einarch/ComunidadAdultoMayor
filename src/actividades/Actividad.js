import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import dateFormat, { masks } from "dateformat";
import './../actividades/Actividad.css';
import avatar from './../imagenes/avatar.jpg'
import Navegacion from '../components/NavegacionA';
import configData from "../config/config.json";

const Actividad = ({ children }) => {
    const naveg = <Navegacion />;

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
            {naveg}
        </div><>
                <br />
                <br />
                <br />
                <br />
                <h1 className="header">Actividades y Eventos</h1 >
                <br />
                <br />
                <Container id="containerSection" className="p-4 mb-4">
                    {data.map(actividad => {
                        return (
                            <div id="itemSectionCard" class="card shadow-0 border rounded-3 p-3 mb-2">
                                <div class="card-body">
                                    <div class="media d-flex">
                                        <img src={avatar} alt="" class="rounded-circle" height="80" width="80"></img>
                                        <div class="media-body flex-grow-1 ms-3">
                                            <h5 class="mt-0 mb-1" className='activityUserName'><b>{actividad.nombreusuario}</b></h5>
                                            <h6 class="media-heading"><b>Actividad:</b> <span className='activityTitle'>{actividad.actividad}</span></h6>
                                            <h6 class="media-heading"><b>Fecha y hora:</b> {dateFormat(actividad.fechahora, "dd/mm/yyyy h:MM TT")}</h6>
                                            <h6 class="media-heading"><b>Ubicación:</b> {actividad.ubicacion}</h6>
                                            <h6 class="media-heading">{actividad.descripcion}</h6>
                                            <h6 class="media-heading"><b>{actividad.numusuarios}</b> personas asistirán a la actividad.</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    }
                    )}
                </Container>
            </></>
    );
}

export default Actividad;
