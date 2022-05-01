import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import './../apoyo/Apoyo.css';
import avatar from '../imagenes/avatar.jpg';
import configData from "../config/config.json";

const Apoyo = ({ children }) => {

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
            <br />
            <br />
        </div><>
                <br />
                <br />
                <h2 className="title"> Voluntarios de Apoyo</h2>
                <br />
                <Container className="p-4 mb-4">
                    {data.map(apoyo => {
                        return (
                            <Card id="cardItem" className="text-left">
                                <Card.Body>
                                    <Card.Text className='d-flex flex-row'>
                                        <div className='col-sm-2 d-flex flex-column align-items-center justify-content-center '>
                                            <img src={avatar} className="rounded-circle" height="120" width="120"></img>
                                        </div>
                                        <div className="col-sm-10 d-flex flex-column align-items-left justify-content-center ">
                                            <h3 className="cardItemUserName mt-0 mb-1"><b>{apoyo.nombre}</b></h3>
                                            <br></br>
                                            <h4 className="cardItemTitle">{apoyo.ciudad} &emsp; &ensp; <b>Teléfono:</b>{apoyo.telefono} </h4>
                                            <br></br>
                                            <h4 className="cardItemTitle"><b>Días Disponibles:</b> {apoyo.diasdisp}</h4>
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

export default Apoyo;
