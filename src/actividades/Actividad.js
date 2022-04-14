
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
                <Container className="p-2 mb-4 bg-light rounded-3 div2">
                    <div class="row justify-content-center" className="div1">
                        <table class="table table">
                            <tbody>
                                {data.map(actividad => {
                                    return (
                                        <tr>
                                            <th scope="row">
                                                <div class="media d-flex ">
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
                                            </th>
                                        </tr>
                                    )
                                }
                                )}
                            </tbody>
                        </table>
                    </div>
                </Container>
            </></>
    );
}

export default Actividad;
