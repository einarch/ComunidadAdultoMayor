import PropTypes from "prop-types";
import { Container, Card, Form, Row, Col, Modal, Image } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import dateFormat, { masks } from "dateformat";
import TextTruncate from 'react-text-truncate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './../comunidad/Publicacion.css';
import avatar from '../imagenes/avatar.jpg';
import publicacionDef from '../imagenes/publicacionDef.jpg'
import configData from "../config/config.json";
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';


const URL_BUSCARLIKE = configData.BUSCLIKE_API_URL;
const URL_ACLIKE = configData.ACLIKE_API_URL;
const URL_AGLIKE = configData.AGLIKE_API_URL;
const URL_QLIKE = configData.QLIKE_API_URL;


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

let c = "";
let exist = "";
let cont = 0;
let usuario = 0;
let bot= "";
let clicked = false;

function CardPublicacion({ nombre, apellido, fechaHora, descripcion, imagen, contadorLike, idPub, existe, idUsuario  }) {

    console.log(idPub);
    console.log(idUsuario);
    cont = contadorLike;
    exist = existe;
    usuario = idUsuario;
    console.log(exist);
    console.log(cont);

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
        bLike();
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
        console.log(idPub);
        const datos = {
            "idUsuario": usuario,
            "idPublicacion": idPub,
            "meGusta": cont,
            "existe": exist
        };
        //console.log(datos);
        return datos;
    }

    const bLike = ()=> {
        //console.log(crearDatos());
        //const respuestaJson = await enviarDatos(URL_BUSCARLIKE, crearDatos());
        //console.log(respuestaJson.Existe);
        //existe = respuestaJson.Existe;
        //console.log(existe);
        if (exist==="true") {
            c="#4fbec9";
            bot="Me Gusta";
        }else{
            if (exist==="false")
            c="#fff";
            bot="Dar Me Gusta";
        }
    }
    // desde aqui comenten 
    
    const like = async () =>{ 
        const palabra = document.getElementById("count");
        const count = document.getElementById("num");
        console.log(idPub);
        if (existe==="true"){
            clicked= true;
        }else{
            clicked= false;
        }
            if (!clicked) {
                clicked = true;
                palabra.textContent = "Me gusta";
                palabra.setAttribute("style", "color: #4fbec9");
                console.log("me gusta");
                count.textContent++;
                console.log(count.textContent);
                cont= contadorLike;
                cont=cont+1;
                exist="true";
                existe="true";
                const respuesta3Json = await enviarDatos(URL_ACLIKE, crearDatos());
                //const respuesta4Json = await enviarDatos(URL_AGLIKE, crearDatos());
                console.log(respuesta3Json);
            } else {
                clicked = false;
                palabra.textContent = "Dar me gusta";
                console.log("Dar me gusta");
                count.textContent--;
                console.log(count.textContent);
                cont= contadorLike;
                cont= cont-1;
                exist="false";
                existe="false";
                const respuesta1Json = await enviarDatos(URL_ACLIKE, crearDatos());
                //const respuesta2Json = await enviarDatos(URL_QLIKE, crearDatos());
                console.log(respuesta1Json);;
            }
    }


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
            <Card.Body className="col-sm-12 d-flex flex-column align-items-center justify-content-center">
                <Card.Text>
                    <div className="col-sm-12 mb-2">
                        <div className=" cardItmHeaderPubli d-flex justify-content-center align-items-center text-center" >
                            <div className="col-sm-3 mb-5">
                                <img src={avatar} className="rounded-circle" height="60" width="60"></img>
                            </div>
                            <div className="col-sm-6 mb-5" >
                                <h4 className="cardItmUserName"><b>{nombre} {apellido}</b></h4>
                            </div>
                            <div className="col-sm-4 cartItmDate mb-4" >
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
                <br></br>
                <div className="cardButtonsSec h-100 d-flex justify-content-center align-items-center mb-2">
                    <div className="badge me-auto">
                        <button class="btn btn-warning" onClick={like}>
                            <FontAwesomeIcon icon={faThumbsUp} style={{ color: "#fff" }} />
                            <span className="textLikeButton" id="count" style={{color: c}}>{bot}</span>
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
                                    <span className="textLikeButton" id="count" style={{color: c}}>{bot}</span>
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
    existe: PropTypes.string,
    idUsuario: PropTypes.string,
};

export default CardPublicacion;