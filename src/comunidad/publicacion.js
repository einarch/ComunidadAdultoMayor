import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Form, Row, Col, Modal, Image } from 'react-bootstrap';
import { useFormik, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import dateFormat, { masks } from "dateformat";
import TextTruncate from 'react-text-truncate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './../comunidad/Publicacion.css';
import avatar from '../imagenes/avatar.jpg';
import publicacionDef from '../imagenes/publicacionDef.webp'
import configData from "../config/config.json";
import { faClock } from '@fortawesome/free-solid-svg-icons';

const URL_PUBLICAR = configData.PUBLICAR_API_URL;

const Publicacion = ({ children }) => {
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
    const baseUrl = configData.PUBLICATIONS_API_URL;
    const [data, setData] = useState([]);
    //const [desc, setDesc] = useState("");
    const hoy = new Date();

    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    //la parte de validacion
    const { handleSubmit, resetForm, handleChange, values, touched, errors, handleBlur, isValid, isSubmitting, setFieldValue } = useFormik({
        initialValues: { descri: "", file: undefined },
        onSubmit: (values, { setSubmitting, resetForm, handleChange }) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            publicar();
            setSubmitting(true);
            ;
            // Simulate submitting to database, shows us values submitted, resets form
            setTimeout(() => {
                resetForm();
                setSubmitting(false);
            }, 500);
        },

        validationSchema: Yup.object().shape({
            descri: Yup.string()
                .required("Este campo es requerido")
                .min(4, "La descripcion debe tener minimo 4 caracteres")
                .max(1000, "La descripcion debe tener maximo 1000 caracteres"),
            file: Yup.mixed()
                .test(
                    "fileType",
                    "El tipo de imagen no permitido",
                    (file) =>
                        file && SUPPORTED_FORMATS.includes(file.type)
                )

        })
    })

    //POST publicacion
    const enviarDatos = async (url, datos) => {
        const resp = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json',
            }

        });
        console.log(resp);
        const rjson = await resp.json();
        return rjson;
    }

    //Convertir imagen a base 64
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    //Guardar una imagen en un server externo
    const postImage = async () => {
        var imageData = await toBase64(selectedFile);
        var imageToSend = imageData.replace(/^data:image\/[a-z]+;base64,/, "");

        var formdata = new FormData();
        formdata.append("image", imageToSend);

        var imagePosted =
            await fetch("https://api.imgur.com/3/image/", {
                method: "post",
                headers: {
                    Authorization: "Client-ID b690f8f677e6fa3"
                },
                body: formdata
            }).then(res => {
                return res.json();
            }).catch(error => console.error(error))

        var responseImage = imagePosted.data.link;
        console.log("Image Enviada: " + responseImage);
        return responseImage;
    };

    //Construir publicacion
    let us = localStorage.getItem("user");
    const publicar = async () => {
        var imageURL = await postImage();
        const fH = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate() + ' ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        console.log(fH);
        const datos = {
            "idUs": us,
            "descripcion": values.descri,
            "fecha": fH,
            "imagen": imageURL
        };
        const respuestaJson = await enviarDatos(URL_PUBLICAR, datos);
        console.log("Publicacion Enviada: " + respuestaJson);
        window.location = window.location.href;
    }

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

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
                <h2 className="sectionTitle">Publicaciones y Noticias</h2>
                <br />
                <Container className="d-flex flex-row justify-content-end">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#miModal">Publicar</button>
                </Container>
                <div align="center">
                    <div className="modal fade" id="miModal" tabIndex="-1" aria-hidden="true" aria-labelledby="modalTitle" data-bs-backdrop="static">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modalColor d-flex flex-row justify-content-center">
                                    <h3 className="textTitleForm">Crear Publicación</h3>
                                </div>
                                <div className="modal-body tam p-3 modalColor" id="Cpubli">
                                    <Form.Group className="col-md-12">
                                        <Form.Control
                                            as="textarea"
                                            rows={14}
                                            className={errors.descri && touched.descri && "error"}
                                            class="form-control"
                                            id="descri"
                                            name="descri"
                                            placeholder="¿Que estas pensando?"
                                            onChange={handleChange}

                                            onBlur={handleBlur}
                                            value={values.descri}
                                            required>
                                        </Form.Control>
                                        <Form.Text className="errorMessModal d-flex flex-row" muted>
                                            {errors.descri && touched.descri && (
                                                <div className="input-feedback">{errors.descri}</div>
                                            )}
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group className="col-md-12">
                                        <Form.Label className="form-label textLabel d-flex flex-row align-items-left">Imagen</Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept=".png,.jpg,.jpeg"
                                            name="file"
                                            id="file"
                                            className={errors.file && touched.file && "error"}
                                            onBlur={handleBlur}
                                            onChange={({ currentTarget }) => {
                                                const file = currentTarget.files[0];
                                                const reader = new FileReader();
                                                if (file) {
                                                    reader.onloadend = () => {
                                                        setSelectedFile(file)
                                                    };
                                                    reader.readAsDataURL(file);
                                                    setFieldValue("file", file);
                                                }
                                            }}
                                        >
                                        </Form.Control>
                                        <Form.Text className="errorMessModal d-flex flex-row" muted>
                                            {errors.file && touched.file && (
                                                <div className="input-feedback">{errors.file}</div>
                                            )}
                                        </Form.Text>
                                    </Form.Group>
                                </div>
                                <div className="model-footer col-12 modalColor" align="center">
                                    <button
                                        as="Input"
                                        class="btn btn-secondary col-3 m-2"
                                        data-bs-dismiss="modal"
                                        onClick={resetForm}
                                    >Cancelar</button>
                                    <button
                                        type="submit"
                                        as="Input"
                                        class="btn btn-success col-3 m-2"
                                        data-bs-dismiss={
                                            touched.descri && !errors.descri ? "modal" : null}
                                        onClick={handleSubmit}
                                    >Publicar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Container className="p-4 mb-4">
                    <Row xs={1} md={3} className="g-4">
                        {Array.from(data).map(publicacion => (
                            <Col>
                                <Card className="cardSec text-center">
                                    <div className='cardImageSize'>
                                        <Card.Img className="cardItemImage" src={publicacion.IMAGENP ? publicacion.IMAGENP : publicacionDef} />
                                    </div>
                                    <Card.Body className="col-sm-12 d-flex flex-column align-items-center justify-content-center">
                                        <Card.Text>
                                            <div className="col-sm-12">
                                                <div className="h-100 d-flex justify-content-center align-items-center" >
                                                    <div className="col-sm-3">
                                                        <img src={avatar} className="rounded-circle" height="60" width="60"></img>
                                                    </div>
                                                    <div className="col-sm-6" >
                                                        <h4 className="cardItmUserName"><b>{publicacion.NOMBRE} {publicacion.APELLIDO}</b></h4>
                                                    </div>
                                                    <div className="col-sm-4 cartItmDate mb-2" >
                                                        <time class="icon mb-3">
                                                            <em>{getDayName(publicacion.FECHAHORAP)}</em>
                                                            <strong>{getMonth(publicacion.FECHAHORAP)}</strong>
                                                            <span>{getDayNumber(publicacion.FECHAHORAP)}</span>
                                                        </time>
                                                        <FontAwesomeIcon icon={faClock} style={{ color: "#1464b4" }} />
                                                        <span className="cardItmText"><b> {getTimePub(publicacion.FECHAHORAP)}</b></span>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 cardItmDes mb-4" >
                                                    <TextTruncate
                                                        className="cardItmText"
                                                        line={3}
                                                        element="h6"
                                                        truncateText="…"
                                                        text={publicacion.DESCRIPCIONP}
                                                    />
                                                </div>
                                            </div>
                                        </Card.Text>
                                        <div id="content">
                                       <div id="left">
                                       <button type="button" class="boton-reacciones" >
    <span class="texto-boton">Reaccionar</span>
    <div class="reacciones">
        <div class="reaccion">
            <i class="fas fa-thumbs-up"></i>
            <span class="nombre-reccion" id='MeGusta'>
                 
            </span>
        </div>
        <div class="reaccion">
            <i class="fas fa-heart"></i>
            <span class="nombre-reccion" id='MeEncanta'>
            
            </span>
        </div>
        <div class="reaccion">
            <i class="far fa-sad-tear"></i>
            <span class="nombre-reccion" id='MeEntristece'>
                
            </span>
        </div>
        <div class="reaccion">
            <i class="far fa-grin-squint-tears"></i>
            <span class="nombre-reccion" id='MeDivierte'>
                
            </span>
        </div>
        <div class="reaccion">
            <i class="far fa-angry"></i>
            <span class="nombre-reccion" id='MeEnoja'>
                
            </span>
        </div>
    </div>
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
                                                                src={publicacion.IMAGEN ? publicacion.IMAGEN : publicacionDef}
                                                                className='img-fluid rounded'
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={7}>
                                                        <h6 className="textLabel label">Nombre</h6>
                                                        <span className="textInfoModal"> {publicacion.NOMBRE} {publicacion.APELLIDO}</span>
                                                        <h6 className="textLabel">Fecha y hora</h6>
                                                        <span className="textInfoModal">{dateFormat(publicacion.FECHAHORAP, "dd/mm/yyyy h:MM TT")}</span>
                                                        <h6 className="textLabel">Descripción</h6>
                                                        <span className="textInfoModal">{publicacion.DESCRIPCIONP}</span>
                                                    </Col>
                                                </Row>
                                            </Modal.Body>
                                            <Modal.Footer>
                                            <button type="button" class="boton-reaccionesM" >
    <span class="texto-boton">Reaccionar</span>
    <div class="reacciones">
        <div class="reaccion">
            <i class="fas fa-thumbs-up"></i>
            <span class="nombre-reccion">
                Me gusta
            </span>
        </div>
        <div class="reaccion">
            <i class="fas fa-heart"></i>
            <span class="nombre-reccion">
                Me encanta
            </span>
        </div>
        <div class="reaccion">
            <i class="far fa-sad-tear"></i>
            <span class="nombre-reccion">
                Me entristece
            </span>
        </div>
        <div class="reaccion">
            <i class="far fa-grin-squint-tears"></i>
            <span class="nombre-reccion">
                Me divierte
            </span>
        </div>
        <div class="reaccion">
            <i class="far fa-angry"></i>
            <span class="nombre-reccion">
                Me enoja
            </span>
        </div>
    </div>
</button> 
                                                <button className="btn btn-primary" onClick={handleClose}>
                                                    Cerrar
                                                </button>
                                            </Modal.Footer>
                                        </Modal>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </></>
    );
}

export default Publicacion;
