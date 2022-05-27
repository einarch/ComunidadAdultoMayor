import PropTypes from "prop-types";
import { Card, Form, Row, Col, Modal, Image } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import dateFormat, { masks } from "dateformat";
import TextTruncate from 'react-text-truncate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './../comunidad/Publicacion.css';
import avatar from '../imagenes/avatar.jpg';
import publicacionDef from '../imagenes/publicacionDef.webp'
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

const getTimePub = (dateIn) => {
    var date = new Date(dateIn);
    var timePub = date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    return timePub;
};

let clicked = false;
function like(){
    const likeBtn = document.querySelector(".like__btn");
    let likeIcon = document.querySelector("#icon"),
      count = document.querySelector("#count");
    if(likeBtn==null){
   
    }else{
        
    
    
    
      if (clicked==false) {
        clicked = true;
        likeIcon.innerHTML = `<i class="fas fa-thumbs-up"></i>`;
        
        count = count.textContent ++;
        console.log(count.textContent);
      } else {
        clicked = false;
        likeIcon.innerHTML = `<i class="far fa-thumbs-up"></i>`;
        count=count.textContent--;
      }
    
    }
}

function CardPublicacion({ nombre, apellido, fechaHora, descripcion, imagen, idPub }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Card key={idPub} className="cardSec text-center">
            <div className='cardImageSize'>
                <Card.Img className="cardItemImage" src={imagen ? imagen : publicacionDef} />
            </div>
            <Card.Body className="col-sm-12 d-flex flex-column align-items-center justify-content-center">
                <Card.Text>
                    <div className="col-sm-12">
                        <div className="h-100 d-flex justify-content-center align-items-center" >
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
                        <div className="col-sm-12 cardItmDes mb-4" >
                            <TextTruncate
                                className="cardItmText"
                                line={3}
                                element="span"
                                truncateText="…"
                                text={descripcion}
                            />
                        </div>
                    </div>
                </Card.Text>

                <div id="content">
                    <div id="left">
                    <button class="like__btn" onClick={like()}>
   <span id="icon"><i class="far fa-thumbs-up"></i></span>
   <span id="count">0</span> Like
</button>
                    </div>
                    <div id="right">
                        <button

                            className="btn btn-success "
                            //style="width: 104px;"
                            onClick={handleShow}>
                            Ver detalle
                        </button>
                    </div>
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
                                <h6 className="textLabel">Fecha y hora</h6>
                                <span className="textInfoModal">{dateFormat(fechaHora, "dd/mm/yyyy h:MM TT")}</span>
                                <h6 className="textLabel">Descripción</h6>
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


CardPublicacion.propTypes = {
    nombre: PropTypes.string.isRequired,
    apellido: PropTypes.string,
    fechaHora: PropTypes.string,
    descripcion: PropTypes.string,
    imagen: PropTypes.string,
    idPub: PropTypes.string,
};

export default CardPublicacion;