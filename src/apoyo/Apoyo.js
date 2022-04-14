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
                <h1 className="header"> Voluntarios de Apoyo</h1>
                <br />
                <br />
                <Container id="containerSection" className="p-4 mb-4">
                    {data.map(apoyo => {
                        return (
                            <div id="itemSectionCard" className="card shadow-0 border rounded-3 p-3 mb-2">
                                <div className="card-body">
                                    <div className="media d-flex">
                                        <img src={avatar} alt="" className="rounded-circle" height="80" width="80"></img>
                                        <div className="media-body flex-grow-1 ms-3">
                                            <h5 className='voluntarioUserName mt-0 mb-1'><b>{apoyo.nombre}</b></h5>
                                            <br></br>
                                            <h6 className="media-heading">{apoyo.ciudad} &emsp; &ensp; <b>Teléfono:</b>{apoyo.telefono} </h6>
                                            <br></br>
                                            <h6 className="media-heading"><b>Días Disponibles:</b> {apoyo.diasdisp}</h6>
                                            <br></br>
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

export default Apoyo;
