import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './../apoyo/Apoyo.css';
import avatar from '../imagenes/avatar.jpg';
import NavegacionAp from '../components/NavegacionVol';
import configData from "../config/config.json";

const Apoyo = ({ children }) => {
    const naveg = <NavegacionAp />;

    const baseUrl = configData.VOLUNTEERS_API_URL;
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
                <h2 className="header"> Voluntarios de Apoyo</h2>
                <br />
                <br />
                <Container id="containerSection" className="p-4 mb-4">
                    {data.map(apoyo => {
                        return (
                            <div id="itemSectionCard" className="card shadow-0 border rounded-3 p-3">
                                <Container className="card-body">
                                    <Container id="divItem" className="media d-flex center">
                                        <img src={avatar} alt="" className="rounded-circle" height="200" width="200"></img>
                                        <div id="divBodyItem" className="media-body flex-grow-1">
                                            <h3 className='voluntarioUserName mt-0 mb-1'><b>{apoyo.nombre}</b></h3>
                                            <br></br>
                                            <h4 className="media-heading">{apoyo.ciudad} &emsp; &ensp; <b>Teléfono:</b>{apoyo.telefono} </h4>
                                            <br></br>
                                            <h4 className="media-heading"><b>Días Disponibles:</b> {apoyo.diasdisp}</h4>
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

export default Apoyo;
