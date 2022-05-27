import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import TextTruncate from 'react-text-truncate';
import Card from 'react-bootstrap/Card';
import './../apoyo/Apoyo.css';
import avatar from '../imagenes/avatar.jpg';
import voluntarioDef from './../imagenes/voluntarioDef.webp'
import { Row, Col, Modal, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

function CardVoluntario({ nombre, apellido, tipoDeApoyo, telefono, ciudad, diasDisponibles, descripcion, imagen, idVol }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const enviarFormulario = () => {
    var numero = corregirNumero();
    console.log(numero);

    var win = window.open(`https://wa.me/591${numero}?text=Hola%20podrias%20ayudarme%20a%20realizar`, '_blank');
  }

  function obtenerDatos() {
    var x1 = document.getElementById("cmd").innerHTML;
    var r = x1;
    return r;
  }

function corregirNumero(){
    var numer = obtenerDatos();
    var cantidad = numer.length;
    if (cantidad > 8) {
      var newNumero = numer.substring(3,numer.length);
  }else{
      var newNumero = numer;
  }
    return newNumero;
  }
  return (
    <Card key={idVol} className="cardSec text-center">
      <div className='cardImageSize'>
        <Card.Img className="cardItemImage" src={imagen ? imagen : voluntarioDef} />
      </div>
      <Card.Body className="col-sm-12 d-flex flex-column align-items-center justify-content-center">
        <Card.Text>
          <div className="col-sm-12">
            <div className='cardItmHeader'>
              <TextTruncate
                className="cardItmTitle"
                line={3}
                element="h3"
                truncateText="…"
                text={tipoDeApoyo}
              />
            </div>
            <div className="d-flex justify-content-center align-items-center mb-3">
              <div className="col-sm-5">
                <img src={avatar} className="rounded-circle" height="60" width="60"></img>
              </div>
              <div className="col-sm-7" >
                <h4 className="cardItmUserName"><b>{nombre} {apellido}</b></h4>
              </div>
            </div>
            <div className='d-flex flex-row justify-content-center'>
              <FontAwesomeIcon icon={faLocationDot} style={{ color: "#1464b4" }} />
            </div>
            <span className="cardItmText">{ciudad}</span>
          </div>
        </Card.Text>
       
        <br />
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
            <Modal.Title className="textTitleForm">Detalle de Voluntario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={6} md={5}>
                <div className='h-100 d-flex justify-content-center align-items-center'>
                  <Image
                    src={imagen ? imagen : voluntarioDef}
                    className='img-fluid rounded'
                  />
                </div>
              </Col>
              <Col xs={12} md={7}>
                <h6 className="textLabel label">Nombre</h6>
                <span className="textInfoModal">{nombre} {apellido}</span>
                <h6 className="textLabel label">Ciudad</h6>
                <span className="textInfoModal"> {ciudad}</span>
                <h6 className="textLabel">Teléfono</h6>
                <span className="textInfoModal" id="cmd">{telefono}</span>
                <h6 className="textLabel">Días Disponibles</h6>
                <span className="textInfoModal">{diasDisponibles}</span>
                <h6 className="textLabel">Tipo de Apoyo</h6>
                <span className="textInfoModal">{tipoDeApoyo}</span>
                <h6 className="textLabel">Motivación: </h6>
                <span className="textInfoModal">{descripcion}</span>
                <br />
                <button type="button" class="boton-contactar" onClick={enviarFormulario} >
                  <span class="texto-boton">Contactar </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" onClick={enviarFormulario} type='button' fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16" color='white'>
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                  </svg>
                  <div class="contactar">
                    <div  className="cardItmText">{telefono}</div>
                  </div>
                </button>
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


CardVoluntario.propTypes = {
  actividad: PropTypes.string.isRequired,
  nombre: PropTypes.string,
  apellido: PropTypes.string,
  fechaHora: PropTypes.string,
  ubicacion: PropTypes.string,
  descripcion: PropTypes.string,
  imagen: PropTypes.string,
  idVol: PropTypes.string,
};

export default CardVoluntario;