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
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
//import { faWha } from "@fortawesome/free-solid-svg-icons";

function CardVoluntario({ nombre, apellido, tipoDeApoyo, telefono, ciudad, diasDisponibles, descripcion, imagen, idVol }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const enviarFormulario = () => {
    var voluntarioTel = telefono;
    voluntarioTel = voluntarioTel.replaceAll("\\s+", "")
    if (voluntarioTel.startsWith("591")) {
      voluntarioTel = voluntarioTel.substring(3, voluntarioTel.length);
    }
    console.log("Teléfono: " + voluntarioTel);

    var win = window.open(`https://wa.me/591${voluntarioTel}?text=Hola%20podrias%20ayudarme%20a%20realizar`, '_blank');
  }

  //tenemos el rol
  let userROL = localStorage.getItem("id");
  const IDROL = userROL;

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
      
        <div className="cardButtonsSec h-100 d-flex justify-content-center align-items-center">
          {IDROL != 2 ?
            <div className="badge">
              <button
                className="btn btn-warning"
                onClick={enviarFormulario} >
                <span class="texto-boton">Contactar </span>
                <FontAwesomeIcon icon={faWhatsapp} style={{ color: "#fff" }} />
              </button>
            </div>
            : ""}
          <div className="badge">
            <button
              className="btn btn-success"
              onClick={handleShow}>
              Ver detalle
            </button>
          </div>
        </div>

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
                <br></br><br></br>
                <h6 className="textLabel label">Ciudad</h6>
                <span className="textInfoModal"> {ciudad}</span>
                <br></br><br></br>
                <h6 className="textLabel">Teléfono</h6>
                <span className="textInfoModal">{telefono}</span>
                <br></br><br></br>
                <h6 className="textLabel">Días Disponibles</h6>
                <span className="textInfoModal">{diasDisponibles}</span>
                <br></br><br></br>
                <h6 className="textLabel">Tipo de Apoyo</h6>
                <span className="textInfoModal">{tipoDeApoyo}</span>
                <br></br><br></br>
                {descripcion ? <h6 className="textLabel">Motivación </h6> : ""}
                <span className="textInfoModal">{descripcion}</span>
                <br></br>
                <br></br>
                {IDROL != 2 ?
                  <button type="button" class="btn btn-warning" onClick={enviarFormulario} >
                    <span class="texto-boton">Contactar </span>
                    <FontAwesomeIcon icon={faWhatsapp} style={{ color: "#fff" }} />
                  </button> : ""}
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