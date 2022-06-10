import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import dateFormat, { masks } from "dateformat";
import TextTruncate from 'react-text-truncate';
import './../actividades/Actividad.css';
import avatar from './../imagenes/avatar.jpg'
import actividadDef from './../imagenes/actividadDef.jpg'
import { Row, Col, Modal, Image, Card, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import configData from "../config/config.json";
import { boolean } from "yup";


const URL_BUSCARASISTIRE = configData.BUSCARASISTIRE_API_URL;
const URL_ACASISTIRE = configData.ACASISTIRE_API_URL;
const URL_AGASISTIRE = configData.AGASISTIRE_API_URL;
const URL_QASISTIRE = configData.QASISTIRE_API_URL;


let c = "";
let exist = "";
let cont = 0;
let usuario = 0;
let textButton = ""
let bot= "";

function CardActividad({ actividad, nombre, apellido, fechaHora, ubicacion, descripcion, imagen, asistentes, idAct, existe, idUsuario }) {
    //console.log(idUsuario);
    console.log(idAct);
    console.log(idUsuario);
    cont = asistentes;
    exist = existe;
    usuario = idUsuario;
    console.log(exist);
    console.log(cont);


    // Calcular Fechas par Date Icon
    const getMonth = (dateIn) => {
        var date = new Date(dateIn);
        var monthName = date.toLocaleString('es-es', { month: 'long' });
        monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
        console.log("hola,hola estoy aqui3");
        //bAsistire();
        return monthName;
    };
    console.log("hola,hola estoy aqui");

    const getDayNumber = (dateIn) => {
        var date = new Date(dateIn);
        var dayNumber = date.toLocaleString('es-es', { day: 'numeric' });
        dayNumber = dayNumber.charAt(0).toUpperCase() + dayNumber.slice(1);
        console.log("hola,hola estoy aqui2");
        bAsistire();
        return dayNumber;
    };

    const getDayName = (dateIn) => {
        var date = new Date(dateIn);
        var dayName = date.toLocaleString('es-es', { weekday: 'long' });
        dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
        return dayName;
    };

    const getTimeAct = (dateIn) => {
        var date = new Date(dateIn);
        var timeAct = date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
        return timeAct;
    };


    const enviarDatos = async (url, datos) => {
        console.log(datos);
        const resp = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json',
            }

        });
        console.log(datos);
        const rjson = await resp.json();
        console.log(resp);
        console.log(rjson);
        return rjson;
    }



    const crearDatos = () => {

        const datos = {
            "idUsuario": usuario,
            "idActividad": idAct,
            "asistire": cont,
            "existe": exist
        };
        //console.log(datos);
        return datos;
    }

    const bAsistire = ()=> {
        //console.log(crearDatos());
        //const respuestaJson = await enviarDatos(URL_BUSCARASISTIRE, crearDatos());
        //console.log(respuestaJson.Existe);
        //existe = respuestaJson.Existe;
        //console.log(existe);
        if (exist==="true") {
            c="#4fbec9";
            bot="Asistire";
        }else{
            if (exist==="false")
            c="#fff";
            bot="Asistir";
        }
    }

    const cAsistire = async () =>{
        textButton = document.getElementById("count");
        const count = document.getElementById("num");
        const icono = document.getElementById("icon");
        exist=existe;
        console.log(existe);
        console.log(exist);
        if (exist === "true") {
            textButton.setAttribute("style", "color: #fff");
            icono.setAttribute("style", "color: #fff");
            bot = "Asistir";
            textButton.textContent = bot;
            count.textContent--;
            cont= asistentes;
            cont= cont-1;
            exist="false";
            existe="false";
            const respuesta1Json = await enviarDatos(URL_ACASISTIRE, crearDatos());
            //const respuesta2Json = await enviarDatos(URL_QASISTIRE, crearDatos());
            console.log(respuesta1Json);;
        }else{
            if(exist==="false"){
                bot="Asistire";
                textButton.setAttribute("style", "color: #4fbec9");
                icono.setAttribute("style", "color: #4fbec9");
                textButton.textContent=bot;
                count.textContent++;
                cont= asistentes;
                cont=cont+1;
                exist="true";
                existe="true";
                const respuesta3Json = await enviarDatos(URL_ACASISTIRE, crearDatos());
                //const respuesta4Json = await enviarDatos(URL_AGASISTIRE, crearDatos());
                console.log(respuesta3Json);
            }
        } 
    }


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Card key={idAct} className="cardSec">
            <div className='cardImageSec mb-5'>
                <Card.Img className="cardItemImage" src={imagen ? imagen : actividadDef} />
            </div>
            <Container className="shadow bubble bubble-bottom">
                <div className="textPubl">
                    <div className="bubble-text-title">
                        <b>Actividad</b>
                    </div>
                    <TextTruncate
                        className="bubble-text"
                        color="#fff"
                        line={2}
                        element="h3"
                        truncateText="…"
                        text={actividad}
                    />
                </div>
            </Container>
            <Card.Body className="cardBodySec col-sm-12 d-flex flex-column ">
                <Card.Text>
                    <div className="col-sm-12">

                        <div className="cardItmHeaderAct d-flex justify-content-center align-items-center text-center">
                            <div className="col-sm-3">
                                <img src={avatar} className="rounded-circle" height="60" width="60"></img>
                            </div>
                            <div className="col-sm-6" >
                                <h4 className="cardItmUserName"><b>{nombre} {apellido}</b></h4>
                            </div>
                            <div className="col-sm-4 cartItmDateAct mb-2" >
                                <time class="icon mb-3">
                                    <em>{getDayName(fechaHora)}</em>
                                    <strong>{getMonth(fechaHora)}</strong>
                                    <span>{getDayNumber(fechaHora)}</span>
                                </time>
                                <FontAwesomeIcon icon={faClock} style={{ color: "#1464b4" }} />
                                <span className="cardItmText"><b> {getTimeAct(fechaHora)}</b></span>
                            </div>
                        </div>


                    </div>
                </Card.Text>
                <br></br>
                <div className='d-flex flex-row justify-content-center mb-1'>
                    <FontAwesomeIcon icon={faLocationDot} style={{ color: "#1464b4" }} />
                </div>
                <div className="text-center mb-4">
                    <TextTruncate
                        className="cardItmText"
                        line={1}
                        element="span"
                        truncateText="…"
                        text={ubicacion}
                    />
                </div>
                <div className="cardButtonsSec h-100 d-flex justify-content-center align-items-center mb-2">
                    <div className="badge">
                        <button class="btn btn-warning" onClick={cAsistire}>
                            <FontAwesomeIcon icon={faPen} id="icon" style={{color: c}} />
                            <span className="textLikeButton" id="count" style={{color: c}}>{bot}</span>
                        </button>
                    </div>
                    <div className="badge">
                        <button
                            className="btn btn-success"
                            onClick={handleShow}>
                            Ver detalle
                        </button>{ }
                    </div>
                </div>
                <div className="cardFooterSec d-flex align-items-center justify-content-center">
                    {asistentes != 0 ? <FontAwesomeIcon icon={faUsers} style={{ color: "#0c4c8c" }} /> : ""}
                    <span className="cardItmText"> <b id="num">{asistentes != 0 ? asistentes : ""}</b> </span>
                </div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered >
                    <Modal.Header className="d-flex flex-row justify-content-center">
                        <Modal.Title className="textTitleForm">Detalle de Actividad</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs={6} md={5}>
                                <div className='h-100 d-flex justify-content-center align-items-center'>
                                    <Image
                                        src={imagen ? imagen : actividadDef}
                                        className='img-fluid rounded'
                                    />
                                </div>
                            </Col>
                            <Col xs={12} md={7}>
                                <h6 className="textLabel label">Nombre </h6>
                                <span className="textInfoModal"> {nombre} {apellido}</span>
                                <br></br><br></br>
                                <h6 className="textLabel label">Actividad </h6>
                                <span className="textInfoModal"> {actividad}</span>
                                <br></br><br></br>
                                <h6 className="textLabel">Fecha y hora </h6>
                                <span className="textInfoModal">{dateFormat(fechaHora, "dd/mm/yyyy h:MM TT")}</span>
                                <br></br><br></br>
                                <h6 className="textLabel">Ubicación </h6>
                                <span className="textInfoModal">{ubicacion}</span>
                                {descripcion ? <h6 className="textLabel">Descripción </h6> : ""}
                                <span className="textInfoModal">{descripcion}</span>
                                <br></br>
                                <br></br>
                                <button class="btn btn-warning" onClick={cAsistire}>
                                    <FontAwesomeIcon icon={faPen} style={{color: c}} />
                                    <span className="textLikeButton" id="count" style={{color: c}}>{bot}</span>
                                </button>
                                <br></br>
                                <br></br>
                                {cont != 0 ? <FontAwesomeIcon icon={faUsers} style={{ color: "#0c4c8c" }} /> : ""}
                                <span className="cardItmText"> <b>{cont != 0 ? cont : ""}</b> </span>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={handleClose}>
                            Cerrar
                        </button>
                    </Modal.Footer>
                </Modal>
            </Card.Body>
        </Card>

    );
}

CardActividad.propTypes = {
    actividad: PropTypes.string.isRequired,
    nombre: PropTypes.string,
    apellido: PropTypes.string,
    fechaHora: PropTypes.string,
    ubicacion: PropTypes.string,
    descripcion: PropTypes.string,
    imagen: PropTypes.string,
    asistentes: PropTypes.string,
    idAct: PropTypes.string,
    existe: PropTypes.string,
    idUsuario: PropTypes.string,
};

export default CardActividad;