import PropTypes from "prop-types";
import { Container, Card, Form, Row, Col, Modal, Image } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import dateFormat, { masks } from "dateformat";
import TextTruncate from 'react-text-truncate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './../comunidad/Publicacion.css';
import avatar from '../imagenes/avatar.jpg';
import publicacionDef from '../imagenes/publicacionDef.jpg'
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

// Calcular Fechas par Date Icon
const getMonth = (dateIn) => {
    var date = new Date(dateIn);
    var monthName = date.toLocaleString('es-es', { month: 'long' });
    monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    return monthName;
};

const getDayNumber = (dateIn) => {
    var date = new Date(dateIn);
    var dayNumber = date.toLocaleString('es-es', { day: 'numeric' });
    dayNumber = dayNumber.charAt(0).toUpperCase() + dayNumber.slice(1);
    return dayNumber;
};

const getDayName = (dateIn) => {
    var date = new Date(dateIn);
    var dayName = date.toLocaleString('es-es', { weekday: 'long' });
    dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    return dayName;
};

const getTimePub = (dateIn) => {
    var date = new Date(dateIn);
    var timePub = date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    return timePub;
};
// desde aqui comenten 
let clicked = false;
var
    palabra = document.getElementById("count"),
    count = document.getElementById("num");

function like() {

    if (palabra == null) {
        palabra = document.getElementById("count");
        count = document.getElementById("num");
        console.log(palabra);
        console.log(count);
        console.log("Es el inicio");

    } else {
        console.log(palabra);
        console.log(count);
        console.log("Ya empezo");
        if (!clicked) {
            clicked = true;
            palabra.textContent = "Me gusta";
            console.log("me gusta");
            count.textContent++;
            console.log(count.textContent);
        } else {
            clicked = false;
            palabra.textContent = "Dar me gusta";
            console.log("Dar me gusta");
            count.textContent--;
            console.log(count.textContent);
        }
    }
}
// este comando funciona cuando ya estemos dentro de la seccion, asi si funciona
/* 
const likeBtn = document.querySelector(".like__btn");
let likeIcon = document.querySelector("#icon"),
  count = document.querySelector("#count");

let clicked = false;


likeBtn.addEventListener("click", () => {
  if (!clicked) {
    clicked = true;
    likeIcon.innerHTML = `<i class="fas fa-thumbs-up"></i>`;
    count.textContent++;
  } else {
    clicked = false;
    likeIcon.innerHTML = `<i class="far fa-thumbs-up"></i>`;
    count.textContent--;
  }
}); 
*/

function CardPublicacion({ nombre, apellido, fechaHora, descripcion, imagen, contadorLike, idPub }) {

    console.log(nombre);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Card key={idPub} className="cardSec ">
            <div className='cardImageSec mb-5'>
                <Card.Img className="cardItemImage" src={imagen ? imagen : publicacionDef} />
            </div>
            <Container className=" shadow bubble bubble-bottom">

                <div className="textPubl">
                    <div className="bubble-text-title">
                        <b>Publicación</b>
                    </div>
                    <TextTruncate
                        className="bubble-text"
                        color="#fff"
                        line={2}
                        element="span"
                        truncateText="…"
                        text={descripcion}
                    />
                </div>
            </Container>
            <br></br>
            <br></br>
            <Card.Body className="col-sm-12 d-flex flex-column align-items-center justify-content-center">
                <Card.Text>
                    <div className="col-sm-12">
                        <div className=" cardItmHeaderPubli d-flex justify-content-center align-items-center text-center" >
                            <div className="col-sm-3">
                                <img src={avatar} className="rounded-circle" height="60" width="60"></img>
                            </div>
                            <div className="col-sm-6" >
                                <h4 className="cardItmUserName"><b>{nombre} {apellido}</b></h4>
                            </div>
                            <div className="col-sm-4 cartItmDate mb-2" >
                                <time class="icon mb-3">
                                    <em>{getDayName(fechaHora)}</em>
                                    <strong>{getMonth(fechaHora)}</strong>
                                    <span>{getDayNumber(fechaHora)}</span>
                                </time>
                                <FontAwesomeIcon icon={faClock} style={{ color: "#1464b4" }} />
                                <span className="cardItmText"><b> {getTimePub(fechaHora)}</b></span>
                            </div>
                        </div>

                    </div>
                </Card.Text>
                <div className="cardButtonsSec h-100 d-flex justify-content-center align-items-center mb-2">
                    <div className="badge me-auto">
                        <button class="btn btn-warning" onClick={like}>
                            <FontAwesomeIcon icon={faThumbsUp} style={{ color: "#fff" }} />
                            <span className="textLikeButton" id="count">Dar me Gusta</span>
                            <script>like()</script>
                        </button>
                    </div>
                    <div className="badge me-auto">
                        <button
                            className="btn btn-success"
                            onClick={handleShow}>
                            Ver detalle
                        </button>
                    </div>
                </div>
                <div className="cardFooterSec d-flex align-items-center justify-content-center">
                    {contadorLike != 0 ? <FontAwesomeIcon icon={faThumbsUp} style={{ color: "#0c4c8c" }} /> : ""}
                    <span className="cardItmText" > <b id="num">{contadorLike != 0 ? contadorLike : ""}</b> </span>
                </div>
                <Modal
                    className='mb-1'
                    show={show}
                    onHide={handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered >
                    <Modal.Header className="d-flex flex-row justify-content-center">
                        <Modal.Title className="textTitleForm">Detalle de Publicación</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs={6} md={5}>
                                <div className='h-100 d-flex justify-content-center align-items-center'>
                                    <Image
                                        src={imagen ? imagen : publicacionDef}
                                        className='img-fluid rounded'
                                    />
                                </div>
                            </Col>
                            <Col xs={12} md={7}>
                                <h6 className="textLabel label">Nombre</h6>
                                <span className="textInfoModal"> {nombre} {apellido}</span>
                                <br></br><br></br>
                                <h6 className="textLabel">Fecha y hora</h6>
                                <span className="textInfoModal">{dateFormat(fechaHora, "dd/mm/yyyy h:MM TT")}</span>
                                <br></br><br></br>
                                <h6 className="textLabel">Descripción</h6>
                                <span className="textInfoModal">{descripcion}</span>
                                <br></br><br></br>
                                <button class="btn btn-warning" onClick={like}>
                                    <FontAwesomeIcon icon={faThumbsUp} style={{ color: "#fff" }} />
                                    <span className="textLikeButton" id="count">Dar me Gusta</span>
                                    <script>like()</script>
                                </button>
                                <br></br><br></br>
                                {contadorLike != 0 ? <FontAwesomeIcon icon={faThumbsUp} style={{ color: "#0c4c8c" }} /> : ""}
                                <span className="cardItmText" > <b id="num">{contadorLike != 0 ? contadorLike : ""}</b> </span>
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


CardPublicacion.propTypes = {
    nombre: PropTypes.string.isRequired,
    apellido: PropTypes.string,
    fechaHora: PropTypes.string,
    descripcion: PropTypes.string,
    imagen: PropTypes.string,
    contadorLike: PropTypes.string,
    idPub: PropTypes.string,
};

export default CardPublicacion;