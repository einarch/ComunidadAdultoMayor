import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { ButtonToolbar, Form, Image } from 'react-bootstrap';
import { useFormik, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import dateFormat, { masks } from "dateformat";
import TextTruncate from 'react-text-truncate';
import './../actividades/Actividad.css';
import avatar from './../imagenes/avatar.jpg'
import actividadDef from './../imagenes/actividadDef.png'
import configData from "../config/config.json";
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faClock } from '@fortawesome/free-solid-svg-icons';

const Actividad = ({ children }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
        setData(data);
    }

    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
    const [selectedFile, setSelectedFile] = useState();

    const getActivitiesURL = configData.ACTIVITIES_API_URL;
    const postActivityURL = configData.CREAR_ACTIVIDAD_API_URL;

    const [data, setData] = useState([]);


    // Configurando fecha minima valida
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var minValidDate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 16);

    // Manejando validaciones de todos los campos del formulario de Actividad
    const { handleSubmit, resetForm, handleChange, values, touched, errors, handleBlur, isValid, isSubmitting, setFieldValue } = useFormik({
        initialValues: { name: "", dateTimeActivity: "", location: "", description: "", file: undefined },
        onSubmit: (values, { setSubmitting, resetForm }) => {
            createNewActivity();
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);

            // Simulate submitting to database, shows us values submitted, resets form
            setTimeout(() => {
                resetForm();
                setSubmitting(false);
            }, 500);
        },

        validationSchema: Yup.object().shape({
            name: Yup.string()
                .required("El Nombre es requerido")
                .min(4, "El Nombre debe contener al menos 3 caracteres")
                .max(80, "El Nombre debe contener máximo 80 caracteres"),
            dateTimeActivity: Yup.date()
                .min(minValidDate, "La hora y minutos debe ser igual o posterior a la actual")
                .required("La Fecha y hora es requerido"),
            location: Yup.string()
                .required("La Ubicación es requerido")
                .min(4, "La Ubicación debe contener al menos 4 caracteres")
                .max(255, "La Ubicación debe contener máximo 255 caracteres"),
            description: Yup.string()
                .min(4, "La Descripción debe contener al menos 4 caracteres")
                .max(255, "La Descripción debe contener máximo 255 caracteres"),
            file: Yup.mixed()
                .nullable()
                .notRequired()
                .test(
                    "fileType",
                    "El tipo de archivo no es permitido",
                    value => !value || (value && SUPPORTED_FORMATS.includes(value.type))
                )
        })
    })

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

    // Obtener todas las actividades registradas desde backend
    const getAllActivities = async () => {
        await axios.get(getActivitiesURL)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    // Hacer un POST al backend para crear una Actividad
    const postActivity = async (url, datos) => {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const res = await response.json();
        return res;
    }

    // Construir una actividad con los datos introducidos
    let userID = localStorage.getItem("user");
    const createNewActivity = async () => {
        var imageURL = "";
        if (selectedFile && values.file) {
            var imageURL = await postImage();
        }

        const datos = {
            "userID": userID,
            "nombre": values.name,
            "fechaHora": values.dateTimeActivity,
            "ubicacion": values.location,
            "descripcion": values.description,
            "imagen": imageURL,
        };
        console.log("Actividad: " + JSON.stringify(datos));
        const respuestaJson = await postActivity(postActivityURL, datos);
        console.log("Actividad Response: " + respuestaJson);
        window.location = window.location.href;
    }

    const configDateLimits = async () => {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000;
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 16);

        console.log("Fecha: " + localISOTime);
        document.getElementsByName("dateTimeActivity")[0].min = localISOTime;
    }

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

    function borrar() {
        document.getElementById("file").value = "";
        return resetForm();
    }

    useEffect(() => {
        configDateLimits();
        getAllActivities();
    }, [])

    return (
        <><div>
            <br />
            <br />
            <br />
        </div><>
                <br />
                <br />
                <h2 className="sectionTitle">Actividades y Eventos</h2>
                <br />
                <Container className="d-flex flex-row justify-content-end">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createActivity">Crear</button>
                </Container>
                <div align="center">
                    <div className="modal fade" id="createActivity" tabIndex="-1" aria-hidden="true" aria-labelledby="modalTitle" data-bs-backdrop="static">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modalColor d-flex flex-row justify-content-center">
                                    <h3 className="textTitleForm">Crear Actividad</h3>
                                </div>
                                <div className="modal-body tam p-3 modalColor">
                                <div className="d-flex flex-row textForm mb-1">
                                    <span >Los campos marcados * son obligatorios</span>
                                </div>
                                    <Form id="createActivityForm" className="row g-3" noValidate onSubmit={handleSubmit}>
                                        <Form.Group className="col-md-12">
                                            <Form.Label className="form-label textLabel d-flex flex-row align-items-left">Nombre*</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="name"
                                                name="name"
                                                className={errors.name && touched.name && "error"}
                                                class="form-control"
                                                placeholder="Ingrese el nombre de la actividad"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                                required>
                                            </Form.Control>
                                            <Form.Text className="errorMessModal d-flex flex-row" muted>
                                                {errors.name && touched.name && (
                                                    <div className="input-feedback">{errors.name}</div>
                                                )}
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group className="col-md-12">
                                            <Form.Label className="form-label textLabel d-flex flex-row align-items-left">Fecha y Hora*</Form.Label>
                                            <Form.Control
                                                type="datetime-local"
                                                min="2022-05-14T02:10"
                                                className={errors.dateTimeActivity && touched.dateTimeActivity && "error"}
                                                class="form-control"
                                                id="dateTimeActivity"
                                                name="dateTimeActivity"
                                                placeholder="Ingrese una fecha y hora"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.dateTimeActivity}
                                                required>
                                            </Form.Control>
                                            <Form.Text className="errorMessModal d-flex flex-row" muted>
                                                {errors.dateTimeActivity && touched.dateTimeActivity && (
                                                    <div className="input-feedback">{errors.dateTimeActivity}</div>
                                                )}
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group className="col-md-12">
                                            <Form.Label className="form-label textLabel d-flex flex-row align-items-left">Ubicación*</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                className={errors.location && touched.location && "error"}
                                                class="form-control"
                                                id="location"
                                                name="location"
                                                placeholder="Ingrese la ubicación"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.location}
                                                required>
                                            </Form.Control>
                                            <Form.Text className="errorMessModal d-flex flex-row" muted>
                                                {errors.location && touched.location && (
                                                    <div className="input-feedback">{errors.location}</div>
                                                )}
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group className="col-md-12">
                                            <Form.Label className="form-label textLabel d-flex flex-row align-items-left">Descripción</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                className={errors.description && touched.description && "error"}
                                                class="form-control"
                                                id="description"
                                                name="description"
                                                placeholder="Ingrese una descripción"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.description}>
                                            </Form.Control>
                                            <Form.Text className="errorMessModal d-flex flex-row" muted>
                                                {errors.description && touched.description && (
                                                    <div className="input-feedback">{errors.description}</div>
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
                                    </Form>
                                </div>
                                <div className="model-footer col-12 modalColor">
                                    <Form.Text className="d-flex flex-column align-items-center" muted>
                                        {!isValid
                                            && !values.name
                                            && !values.dateTimeActivity
                                            && !values.location
                                            && !values.description ?
                                            <div className="input-feedback">{"Por favor rellene el formulario correctamente"} </div> : null}
                                    </Form.Text>
                                    <button
                                        as="Input"
                                        class="btn btn-secondary col-3 m-2"
                                        data-bs-dismiss="modal"
                                        onClick={borrar}
                                    >Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        as="Input"
                                        class="btn btn-success col-3 m-2"
                                        data-bs-dismiss={touched.name && !errors.name
                                            && touched.dateTimeActivity && !errors.dateTimeActivity
                                            && touched.location && !errors.location
                                            && touched.description && !errors.description ? "modal" : null}
                                        onClick={handleSubmit}
                                    >Crear
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Container className="p-4 mb-4">
                    <Row xs={1} md={3} className="g-4">
                        {Array.from(data).map(actividad => (
                            <Col>
                                <Card key={actividad.FECHAHORAA} className="cardSec text-center">
                                    <div className='cardImageSize mb-3'>
                                        <Card.Img className="cardItemImage" src={actividad.IMAGENA ? actividad.IMAGENA : actividadDef} />
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
                                                        text={actividad.ACTIVIDAD}
                                                    />
                                                </div>
                                                <div className="cardItmHeaderAct d-flex justify-content-center align-items-center">
                                                    <div className="col-sm-3">
                                                        <img src={avatar} className="rounded-circle" height="60" width="60"></img>
                                                    </div>
                                                    <div className="col-sm-6" >
                                                        <h4 className="cardItmUserName"><b>{actividad.NOMBRE} {actividad.APELLIDO}</b></h4>
                                                    </div>
                                                    <div className="col-sm-4 cartItmDate mb-2" >
                                                        <time class="icon mb-3">
                                                            <em>{getDayName(actividad.FECHAHORAA)}</em>
                                                            <strong>{getMonth(actividad.FECHAHORAA)}</strong>
                                                            <span>{getDayNumber(actividad.FECHAHORAA)}</span>
                                                        </time>
                                                        <FontAwesomeIcon icon={faClock} style={{ color: "#1464b4" }} />
                                                        <span className="cardItmText"><b> {getTimeAct(actividad.FECHAHORAA)}</b></span>
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
                                                    text={actividad.UBICACIONA}
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
                                                                src={actividad.IMAGENA ? actividad.IMAGENA : actividadDef}
                                                                className='img-fluid rounded'
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={7}>
                                                        <h6 className="textLabel label">Nombre: </h6>
                                                        <span className="textInfoModal"> {actividad.NOMBRE} {actividad.APELLIDO}</span>
                                                        <h6 className="textLabel label">Actividad: </h6>
                                                        <span className="textInfoModal"> {actividad.ACTIVIDAD}</span>
                                                        <h6 className="textLabel">Fecha y hora: </h6>
                                                        <span className="textInfoModal">{dateFormat(actividad.FECHAHORAA, "dd/mm/yyyy h:MM TT")}</span>
                                                        <h6 className="textLabel">Ubicación: </h6>
                                                        <span className="textInfoModal">{actividad.UBICACIONA}</span>
                                                        <h6 className="textLabel">Descripción: </h6>
                                                        <span className="textInfoModal">{actividad.DESCRIPCIONA}</span>
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
                            </Col>
                        ))}
                    </Row>
                </Container>
            </></>
    );
}

export default Actividad;