import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useFormik, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import dateFormat, { masks } from "dateformat";
import './../comunidad/Publicacion.css';
import avatar from '../imagenes/avatar.jpg';
import configData from "../config/config.json";


const URL_PUBLICAR = configData.PUBLICAR_API_URL;


const enviarDatos = async (url, datos) => {
    const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    console.log(resp);
    const rjson = await resp.json();
    console.log('hola');
    return rjson;
}
//la parte de validacion

const Publicacion = ({ children }) => {

    const baseUrl = configData.PUBLICATIONS_API_URL;
    const [data, setData] = useState([]);
    const [desc, setDesc] = useState("");
    const hoy = new Date();

    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    let us = localStorage.getItem("user");
    const publicar = async () => {
        const fH = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate() + ' ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        console.log(fH);
        const datos = {
            "idUs": us,
            "descripcion": desc,
            "fecha": fH
        };
        console.log(datos);
        console.log(datos.idUs);
        console.log(datos.descripcion);
        const respuestaJson = await enviarDatos(URL_PUBLICAR, datos);
        console.log(respuestaJson);
        window.location=window.location.href;
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
                <Container className="d-flex flex-row justify-content-end">
                    <button type="button" className="btn m-2 btn-primary" data-bs-toggle="modal" data-bs-target="#miModal">Publicar</button>
                </Container>
                <div align="center">
                    <div className="modal fade" id="miModal" tabIndex="-1" aria-hidden="true" aria-labelledby="modalTitle" data-bs-backdrop="static">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modalColor d-flex flex-row justify-content-center">
                                    <h2 className="modal-title"><b>PUBLICACIÓN</b></h2>
                                </div>
                                <div className="modal-body tam p-3 modalColor" id="Cpubli">
                                    <p className="textModal" align="left">Escribe la publicación:</p>
                                    <textarea className="form-control textModal" id="desc" rows="14" cols="35" onChange={event => setDesc(event.target.value)}></textarea>
                                </div>
                                <div className="model-footer col-12 modalColor" align="center">
                                    <button 
                                     as="Input"
                                     class="btn btn-secondary col-3 m-2"
                                     data-bs-dismiss="modal"
                                     //onClick={resetForm}
                                     >Cancelar</button>
                                    <button type="button" className="btn btn-success col-3 m-2 " data-bs-dismiss="modal" onClick={publicar}>Publicar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                                            <h3 className="cardItemUserName mt-0 mb-1"><b>{publicacion.NOMBRE} {publicacion.APELLIDO}</b></h3>
                                            <h4 className="cardItemTitle"><b>Publicado:</b> {dateFormat(publicacion.FECHAHORAP, "dd/mm/yyyy h:MM TT")}</h4>
                                            <h4 className="cardItemTitle"> {publicacion.DESCRIPCIONP}</h4>
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
