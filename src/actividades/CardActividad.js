import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import dateFormat, { masks } from "dateformat";
import TextTruncate from 'react-text-truncate';
import './../actividades/Actividad.css';
import avatar from './../imagenes/avatar.jpg'
import actividadDef from './../imagenes/actividadDef.png'
import { Row, Col, Modal, Image, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faClock } from '@fortawesome/free-solid-svg-icons';

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

const getTimeAct = (dateIn) => {
    var date = new Date(dateIn);
    var timeAct = date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    return timeAct;
};

function CardActividad({ actividad, nombre, apellido, fechaHora, ubicacion, descripcion, imagen, idAct }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Card key={idAct} className="cardSec text-center">
            <div className='cardImageSize mb-3'>
                <Card.Img className="cardItemImage" src={imagen ? imagen : actividadDef} />
            </div>
            <Card.Body className="col-sm-12 d-flex flex-column align-items-center justify-content-center">
                <Card.Text>
                    <div className="col-sm-12">
                        <div className='cardTitleSec'>
                            <TextTruncate
                                className="cardItmTitle"
                                line={2}
                                element="h3"
                                truncateText="…"
                                text={actividad}
                            />
                        </div>
                        <div className="cardItmHeaderAct d-flex justify-content-center align-items-center">
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
                                <span className="cardItmText"><b> {getTimeAct(fechaHora)}</b></span>
                            </div>
                        </div>
                        <div className='d-flex flex-row justify-content-center'>
                            <FontAwesomeIcon icon={faLocationDot} style={{ color: "#1464b4" }} />
                        </div>
                        <TextTruncate
                            className="cardItmText"
                            line={2}
                            element="span"
                            truncateText="…"
                            text={ubicacion}
                        />
                    </div>
                </Card.Text>
                <button
                    class="btn btn-success"
                    onClick={handleShow}>
                    Ver detalle
                </button>
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
                                <h6 className="textLabel label">Nombre: </h6>
                                <span className="textInfoModal"> {nombre} {apellido}</span>
                                <h6 className="textLabel label">Actividad: </h6>
                                <span className="textInfoModal"> {actividad}</span>
                                <h6 className="textLabel">Fecha y hora: </h6>
                                <span className="textInfoModal">{dateFormat(fechaHora, "dd/mm/yyyy h:MM TT")}</span>
                                <h6 className="textLabel">Ubicación: </h6>
                                <span className="textInfoModal">{ubicacion}</span>
                                <h6 className="textLabel">Descripción: </h6>
                                <span className="textInfoModal">{descripcion}</span>
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
    idAct: PropTypes.string,
};

export default CardActividad;