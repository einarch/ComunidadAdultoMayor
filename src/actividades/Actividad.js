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
        <><div id="div1">
            <br />
            {naveg}
        </div><>
                <br />
                <br />
                <br />
                <h1 className="header">Actividades y Eventos</h1 >
                <br />
                <br />
                <Container id="containerSection" className="p-4 mb-4">
                    {data.map(actividad => {
                        return (
                            <div id="itemSectionCard" className="card shadow-0 border rounded-3 p-3 mb-2">
                                <div className="card-body">
                                    <div className="media d-flex">
                                        <img src={avatar} alt="" className="rounded-circle" height="80" width="80"></img>
                                        <div className="media-body flex-grow-1 ms-3">
                                            <h5 className='activityUserName mt-0 mb-1'><b>{actividad.nombreusuario}</b></h5>
                                            <h6 className="media-heading"><b>Actividad:</b> <span className='activityTitle'>{actividad.actividad}</span></h6>
                                            <h6 className="media-heading"><b>Fecha y hora:</b> {dateFormat(actividad.fechahora, "dd/mm/yyyy h:MM TT")}</h6>
                                            <h6 className="media-heading"><b>Ubicación:</b> {actividad.ubicacion}</h6>
                                            <h6 className="media-heading">{actividad.descripcion}</h6>
                                            <h6 className="media-heading"><b>{actividad.numusuarios}</b> personas asistirán a la actividad.</h6>
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
