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
            <br />
            <br />
        </div><>
                <br />
                <br />
                <h2 className="title">Actividades y Eventos</h2>
                <br />
                <br />
                <Container id="containerSection" className="p-4 mb-4">
                    {data.map(actividad => {
                        return (
                            <div id="itemSectionCard" className="card shadow-0 border rounded-3">
                                <Container className="card-body">
                                    <Container id="divItem" className="media d-flex centerAct">
                                        <img src={avatar} alt="" className="rounded-circle" height="120" width="120"></img>
                                        <div id="divBodyItem" className="media-body flex-grow-1">
                                            <h3 className="cardItemUserName mt-0 mb-1"><b>{actividad.nombreusuario}</b></h3>
                                            <h4 className="cardItemTitle"><b>Actividad:</b> <span className='uppercaseText'>{actividad.actividad}</span></h4>
                                            <h4 className="cardItemTitle"><b>Fecha y hora:</b> {dateFormat(actividad.fechahora, "dd/mm/yyyy h:MM TT")}</h4>
                                            <h4 className="cardItemTitle"><b>Ubicación:</b> {actividad.ubicacion}</h4>
                                            <h4 className="cardItemTitle">{actividad.descripcion}</h4>
                                            <h4 className="cardItemTitle"><b>{actividad.numusuarios}</b> personas asistirán a la actividad.</h4>
                                        </div>
                                    </Container>
                                </Container>
                            </div>

                        )
                    }
                    )}
                </Container>
            </></>
    );
}

export default Actividad;
