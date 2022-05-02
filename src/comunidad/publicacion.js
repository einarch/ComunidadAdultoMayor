import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import dateFormat, { masks } from "dateformat";
import './../comunidad/Publicacion.css';
import avatar from '../imagenes/avatar.jpg';
import configData from "../config/config.json";

const Publicacion = ({ children }) => {

    const baseUrl = configData.PUBLICATIONS_API_URL;
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
                <h2 className="title">Publicaciones y Noticias</h2>
                <br />
                <div align="center" >
                    <button type="button" class=" btn btn-success m-2" data-bs-toggle="modal" data-bs-target="#miModal"  >Publicar</button>
                    <div class="modal fade" id="miModal" tabindex="-1" aria-hidden="true" aria-labelledby="modalTitle" data-bs-backdrop="static">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header" className='color'>
                                    <h2 class="modal-title" id="modalTitle"><b>CREAR PUBLICACION</b></h2>

                                </div>
                                <div class="modal-body" className='color'>
                                    <p align="left"> &nbsp; Escribe la publicación:</p>

                                    <textarea name="textarea" className='text' id="descri" rows="10" cols="35"></textarea>

                                </div>
                                <div class="model-footer" align="right" className='color'>
                                    <button type="button" class="btn btn-secondary m-2 " data-bs-dismiss="modal" > Cancelar </button>
                                    <button type="button" class="btn btn-success m-2 " data-bs-dismiss="modal" > Publicar </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <Container className="p-4 mb-4">
                    {data.map(publicacion => {
                        return (
                            <Card id="cardItem" className="text-left">
                                <Card.Body>
                                    <Card.Text className='d-flex flex-row'>
                                        <div className='col-sm-2 d-flex flex-column align-items-center justify-content-center '>
                                            <img src={avatar} className="rounded-circle" height="120" width="120"></img>
                                        </div>
                                        <div className="col-sm-10 d-flex flex-column align-items-left justify-content-center ">
                                            <h3 className="cardItemUserName mt-0 mb-1"><b>{publicacion.nombre}</b></h3>
                                            <h4 className="cardItemTitle"><b>Publicado:</b> {dateFormat(publicacion.fechahora, "dd/mm/yyyy h:MM TT")}</h4>
                                            <h4 className="cardItemTitle"> {publicacion.descripcion}</h4>
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

export default Publicacion;
