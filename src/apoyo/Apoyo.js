import React, { useState, useEffect } from 'react';
import TextTruncate from 'react-text-truncate';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useFormik, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import './../apoyo/Apoyo.css';
import avatar from '../imagenes/avatar.jpg';
import voluntarioDef from './../imagenes/voluntarioDef.jpg'
import configData from "../config/config.json";
import { Row, Col, Modal, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Apoyo = ({ children }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const baseUrl = configData.VOLUNTEERS_API_URL;
    const postVoluntarioURL = configData.CREAR_VOLUNTARIO_API_URL;
    const [data, setData] = useState([]);

    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    /*    const rol = (data.map(apoyo => {
            return (apoyo.Nombre)})); 
            console.log(rol);*/
    // Hacer un POST al backend para crear una Actividad
    const postVoluntario = async (url, datos) => {
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
    //tenemos el rol
    let userROL = localStorage.getItem("id");
    console.log("tipo de voluntario");
    console.log(userROL);
    if (userROL == 1) {
        console.log("Es audulto mayor");
    } else {
        console.log("Es publico general");
    }
    const IDROL = userROL;
    // Añadir un voluntario con los datos introducidos
    let userID = localStorage.getItem("user");
    const createNewVoluntario = async () => {
        if (values.telefono == "" && values.dias == "" && values.tipo == "" && values.description == "") {
            console.log("Llene todos los campos");
            document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        } else {
            if (values.telefono == "") {
                console.log("Llene el campo de telefono");
            } else {
                if (values.dias == "") {
                    console.log("Llene el campo de dias disponibles");
                } else {
                    if (values.tipo == "") {
                        console.log("Llene el campo de tipo de ayuda");
                    } else {
                        if (values.description == "") {
                            console.log("Llene el campo de su motivacion");
                        } else {
                            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');

                            const datos = {
                                "userID": userID,
                                "telefono": values.telefono,
                                "dias": values.dias,
                                "tipo": values.tipo,
                                "descripcion": values.description
                            };
                            console.log("Voluntario: " + JSON.stringify(datos));
                            const respuestaJson = await postVoluntario(postVoluntarioURL, datos);
                            console.log("Response: " + respuestaJson);
                            window.location = window.location.href;

                        }
                    }
                }
            }
        }

    }
    const { handleSubmit, resetForm, handleChange, values, touched, isValid, errors, handleBlur } = useFormik({

        initialValues: { telefono: "", dias: "", tipo: "", description: "" },
        onSubmit: (values, { setSubmitting }, { resetForm }) => {
            setTimeout(() => {
                console.log("Logging in", values);
                setSubmitting(false);
            }, 500);

            resetForm({ values: '' });
        },

        validationSchema: Yup.object().shape({
            telefono: Yup.number()
                .typeError("Solo se admiten numeros")
                .required("Este campo es requerido")
                .min(10, "minimo 7 digitos porfavor")
                .positive(`Solo numeros positivos`),
            dias: Yup.string()
                .required("Este campo es requerido")
                .min(4, "Dias de la semana porfavor")
                .max(50, "No puede asignar mas dias de la semana"),
            tipo: Yup.string()
                .required("Este campo es requerido")
                .min(4, "El tipo de ayuda debe tener minimo 4 caracteres")
                .max(255, "El tipo de ayuda debe tener máximo 255 caracteres"),
            description: Yup.string()
                .min(4, "El motivo debe tener minimo 4 caracteres")
                .max(400, "El motivo debe tener máximo 400 caracteres"),

        })
    })

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    function borrar() {
        return resetForm();
    }
    useEffect(() => {
        peticionGet();
    }, [])

    if (IDROL == 2) {
        return (
            <><div>
                <br />
                <br />
                <br />
            </div><>
                    <br />
                    <br />
                    <h2 className="sectionTitle">Voluntarios de Apoyo</h2>
                    <br />
                    <Container className="d-flex flex-row justify-content-end">
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createVolunta">Ser voluntario</button>
                    </Container>
                    <div align="center">
                        <div className="modal fade" id="createVolunta" tabIndex="-1" aria-hidden="true" aria-labelledby="modalTitle" data-bs-backdrop="static">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modalColor d-flex flex-row justify-content-center">
                                        <h3 className="textTitleForm">Registrar Voluntario</h3>
                                    </div>
                                    <div className="modal-body tam p-3 modalColor ">
                                        <Form id="formulario" className="row g-3" onSubmit={handleSubmit}>
                                            <Form.Group className="col-md-12">
                                                <Form.Label className="form-label textLabel d-flex flex-row align-items-left">Teléfono*</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    id="telefono"
                                                    name="telefono"
                                                    className={errors.telefono && touched.telefono && "error"}
                                                    class="form-control"
                                                    placeholder="Ingrese el número al que se comunicarán"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.telefono}
                                                />
                                                <Form.Text className="errorMessModal d-flex flex-row" muted>
                                                    {errors.telefono && touched.telefono && (
                                                        <div className="input-feedback">{errors.telefono}</div>
                                                    )}
                                                </Form.Text>
                                            </Form.Group>
                                            <Form.Group className="col-md-12">
                                                <Form.Label className="form-label textLabel d-flex flex-row align-items-left">Días disponibles*</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    id="dias"
                                                    name="dias"
                                                    className={errors.dias && touched.dias && "error"}
                                                    class="form-control"
                                                    placeholder="Días de la semana"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.dias}
                                                />
                                                <Form.Text className="errorMessModal d-flex flex-row" muted>
                                                    {errors.dias && touched.dias && (
                                                        <div className="input-feedback">{errors.dias}</div>
                                                    )}
                                                </Form.Text>
                                            </Form.Group>
                                            <Form.Group className="col-md-12">
                                                <Form.Label className="form-label textLabel d-flex flex-row align-items-left">Tipo de apoyo*</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    id="tipo"
                                                    name="tipo"
                                                    className={errors.tipo && touched.tipo && "error"}
                                                    class="form-control"
                                                    placeholder="En que puede ayudar"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.tipo}
                                                />
                                                <Form.Text className="errorMessModal d-flex flex-row" muted>
                                                    {errors.tipo && touched.tipo && (
                                                        <div className="input-feedback">{errors.tipo}</div>
                                                    )}
                                                </Form.Text>
                                            </Form.Group>
                                            <Form.Group className="col-md-12">
                                                <Form.Label className="form-label textLabel d-flex flex-row align-items-left">Motivación</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    className={errors.description && touched.description && "error"}
                                                    class="form-control"
                                                    id="description"
                                                    name="description"
                                                    placeholder="¿Porque lo hace?"
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
                                                    name="imageFile"
                                                    id="imageFile"
                                                    onChange={changeHandler}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </div>
                                    <div className="model-footer col-12 modalColor" align="center">
                                        <Form.Text className="d-flex flex-column align-items-center" muted>
                                            {!isValid
                                                && !values.telefono
                                                && !values.dias
                                                && !values.tipo
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
                                        <button type="submit"
                                            as="Input"
                                            class="btn btn-success col-3 m-2"
                                            data-bs-dismiss={touched.telefono && !errors.telefono
                                                && touched.dias && !errors.dias
                                                && touched.tipo && !errors.tipo
                                                && touched.description && !errors.description ? "modal" : null}
                                            onClick={handleSubmit}
                                        >Crear</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Container className="p-4 mb-4">
                        <Row xs={1} md={3} className="g-4">
                            {Array.from(data).map(apoyo => (
                                <Col>
                                    <Card key={apoyo.TELEFONOV} className="cardSec text-center">
                                        <div className='cardImageSize'>
                                            <Card.Img className="cardItemImage" src={apoyo.IMAGEN ? apoyo.IMAGEN : voluntarioDef} />
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
                                                            text={apoyo.TIPOAPOYO}
                                                        />
                                                    </div>
                                                    <div className="d-flex justify-content-center align-items-center mb-3">
                                                        <div className="col-sm-5">
                                                            <img src={avatar} className="rounded-circle" height="60" width="60"></img>
                                                        </div>
                                                        <div className="col-sm-7" >
                                                            <h4 className="cardItmUserName"><b>{apoyo.NOMBRE} {apoyo.APELLIDO}</b></h4>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex flex-row justify-content-center'>
                                                        <FontAwesomeIcon icon={faLocationDot} style={{ color: "#1464b4" }} />
                                                    </div>
                                                    <span className="cardItmText">{apoyo.CIUDAD}</span>
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
                                                    <Modal.Title className="textTitleForm">Detalle de Voluntario</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Row>
                                                        <Col xs={6} md={5}>
                                                            <div className='h-100 d-flex justify-content-center align-items-center'>
                                                                <Image
                                                                    src={apoyo.IMAGEN ? apoyo.IMAGEN : voluntarioDef}
                                                                    className='img-fluid rounded'
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs={12} md={7}>
                                                            <h6 className="textLabel label">Nombre</h6>
                                                            <span className="textInfoModal">{apoyo.NOMBRE} {apoyo.APELLIDO}</span>
                                                            <h6 className="textLabel label">Ciudad</h6>
                                                            <span className="textInfoModal"> {apoyo.CIUDAD}</span>
                                                            <h6 className="textLabel">Teléfono</h6>
                                                            <span className="textInfoModal">{apoyo.TELEFONOV}</span>
                                                            <h6 className="textLabel">Días Disponibles</h6>
                                                            <span className="textInfoModal">{apoyo.DIASDISPONIBLES}</span>
                                                            <h6 className="textLabel">Tipo de Apoyo</h6>
                                                            <span className="textInfoModal">{apoyo.TIPOAPOYO}</span>
                                                            <h6 className="textLabel">Motivación: </h6>
                                                            <span className="textInfoModal">{apoyo.DESCRIPCIONV}</span>
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
    } else {
        return (
            <><div>
                <br />
                <br />
                <br />
            </div><>
                    <br />
                    <br />
                    <h2 className="sectionTitle">Voluntarios de Apoyo</h2>
                    <br />
                    <Container className="p-4 mb-4">
                        <Row xs={1} md={3} className="g-4">
                            {Array.from(data).map(apoyo => (
                                <Col>
                                    <Card key={apoyo.TELEFONOV} className="cardSec text-center">
                                        <div className='cardImageSize'>
                                            <Card.Img className="cardItemImage" src={apoyo.IMAGEN ? apoyo.IMAGEN : voluntarioDef} />
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
                                                            text={apoyo.TIPOAPOYO}
                                                        />
                                                    </div>
                                                    <div className="d-flex justify-content-center align-items-center mb-3">
                                                        <div className="col-sm-5">
                                                            <img src={avatar} className="rounded-circle" height="60" width="60"></img>
                                                        </div>
                                                        <div className="col-sm-7" >
                                                            <h4 className="cardItmUserName"><b>{apoyo.NOMBRE} {apoyo.APELLIDO}</b></h4>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex flex-row justify-content-center'>
                                                        <FontAwesomeIcon icon={faLocationDot} style={{ color: "#1464b4" }} />
                                                    </div>
                                                    <span className="cardItmText">{apoyo.CIUDAD}</span>
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
                                                    <Modal.Title className="textTitleForm">Detalle de Voluntario</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Row>
                                                        <Col xs={6} md={5}>
                                                            <div className='h-100 d-flex justify-content-center align-items-center'>
                                                                <Image
                                                                    src={apoyo.IMAGEN ? apoyo.IMAGEN : voluntarioDef}
                                                                    className='img-fluid rounded'
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs={12} md={7}>
                                                            <h6 className="textLabel label">Nombre</h6>
                                                            <span className="textInfoModal">{apoyo.NOMBRE} {apoyo.APELLIDO}</span>
                                                            <h6 className="textLabel label">Ciudad</h6>
                                                            <span className="textInfoModal"> {apoyo.CIUDAD}</span>
                                                            <h6 className="textLabel">Teléfono</h6>
                                                            <span className="textInfoModal">{apoyo.TELEFONOV}</span>
                                                            <h6 className="textLabel">Días Disponibles</h6>
                                                            <span className="textInfoModal">{apoyo.DIASDISPONIBLES}</span>
                                                            <h6 className="textLabel">Tipo de Apoyo</h6>
                                                            <span className="textInfoModal">{apoyo.TIPOAPOYO}</span>
                                                            <h6 className="textLabel">Motivación: </h6>
                                                            <span className="textInfoModal">{apoyo.DESCRIPCIONV}</span>
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
}

export default Apoyo;
