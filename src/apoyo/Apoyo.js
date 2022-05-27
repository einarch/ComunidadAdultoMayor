import React, { useState, useEffect } from 'react';
import TextTruncate from 'react-text-truncate';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from "yup";
import './../apoyo/Apoyo.css';
import avatar from '../imagenes/avatar.jpg';
import voluntarioDef from './../imagenes/voluntarioDef.webp'
import configData from "../config/config.json";
import { Row, Col, Modal, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Apoyo = ({ children }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

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
    const IDROL = userROL;
    // Añadir un voluntario con los datos introducidos
    let userID = localStorage.getItem("user");
    const createNewVoluntario = async () => {
        var imageURL = "";
        if (selectedFile && values.file) {
            var imageURL = await postImage();
        }

        if (values.description == "") {
            values.description = "Ser solidario";
        }

        const datos = {
            "userID": userID,
            "telefono": values.telefono,
            "dias": values.dias,
            "tipo": values.tipo,
            "descripcion": values.description,
            "imagen": imageURL,
        };
        console.log("Voluntario: " + JSON.stringify(datos));
        const respuestaJson = await postVoluntario(postVoluntarioURL, datos);
        console.log("Voluntario Enviado: " + respuestaJson);
        window.location = window.location.href;

    }
    const { handleSubmit, resetForm, handleChange, values, touched, isValid, errors, handleBlur, setFieldValue } = useFormik({

        initialValues: { telefono: "", dias: "", tipo: "", description: "", file: undefined },
        onSubmit: (values, { setSubmitting, resetForm }) => {
            createNewVoluntario();
            setSubmitting(true);
            setTimeout(() => {
                console.log("Logging in", values);
                setSubmitting(false);
            }, 500);

            resetForm({ values: '' });
        },

        validationSchema: Yup.object().shape({
            telefono: Yup.number()
                .typeError("El Teléfono solo se admite números")
                .required("El Teléfono es requerido")
                .min(6, "El Teléfono debe contener al menos 10 dígitos")
                .max(15, "El Teléfono debe contener debe contener máximo 10 dígitos")
                .positive(`Solo numeros positivos`),
            dias: Yup.string()
                .required("Los Días disponibles es requerido")
                .min(4, "Los Días disponibles debe contener al menos 4 caracteres")
                .max(50, "Los Días disponibles debe contener máximo 50 caracteres"),
            tipo: Yup.string()
                .required("El Tipo de apoyo es requerido")
                .min(4, "El Tipo de apoyo debe contener al menos 4 caracteres")
                .max(255, "El Tipo de apoyo debe contener máximo 255 caracteres"),
            description: Yup.string()
                .min(4, "La Motivación debe contener al menos 4 caracteres")
                .max(400, "La Motivación debe contener máximo 400 caracteres"),
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

    function borrar() {
        document.getElementById("file").value = "";
        return resetForm();
    }

    useEffect(() => {
        peticionGet();
    }, [])

    const enviarFormulario =() => {    
        var numero = obtenerDatos();
         console.log(numero);
         
    var win= window.open(`https://wa.me/${numero}?text=Hola%20podrias%20ayudarme%20a%20realizar`,'_blank');      
    }
    function obtenerDatos(){
     var x1 = document.getElementById("cmd").innerHTML;
     var r =x1;
     return r;
 }

    return (
        <div className='body'>
            <br />
            <br />
            <br />

            <br />
            <br />
            <h2 className="sectionTitle">Voluntarios de Apoyo</h2>
            <br />
            {IDROL == 2 ?
                <Container className="d-flex flex-row justify-content-end">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createVolunta">Ser voluntario</button>
                </Container> : ""}
            <div align="center">
                <div className="modal fade" id="createVolunta" tabIndex="-1" aria-hidden="true" aria-labelledby="modalTitle" data-bs-backdrop="static">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modalColor d-flex flex-row justify-content-center">
                                <h3 className="textTitleForm">Registrar Voluntario</h3>
                            </div>
                            <div className="modal-body tam p-3 modalColor ">
                                <div className="d-flex flex-row textForm mb-1">
                                    <span >Los campos marcados * son obligatorios</span>
                                </div>
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
                                >Registrar</button>
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
                                    <Card.Img className="cardItemImage" src={apoyo.IMAGENV ? apoyo.IMAGENV : voluntarioDef} />
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
                                    
        
                                    <button type="button" class="boton-contactar"  onClick={enviarFormulario} >
                                                    <span class="texto-boton">Contactar </span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23"   onClick={enviarFormulario} type='button' fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16" color='white'>
                                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                                        </svg>
                                                    <div class="contactar">
                                                    <div id ="cmd" className="cardItmText">{apoyo.TELEFONOV}</div> 
                                                    </div>
                                    </button>
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
                                                            src={apoyo.IMAGENV ? apoyo.IMAGENV : voluntarioDef}
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
                                                    <br />
                                                    <button type="button" class="boton-contactar"  onClick={enviarFormulario} >
                                                    <span class="texto-boton">Contactar </span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23"   onClick={enviarFormulario} type='button' fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16" color='white'>
                                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                                        </svg>
                                                    <div class="contactar">
                                                    <div id ="cmd" className="cardItmText">{apoyo.TELEFONOV}</div> 
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
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );

}

export default Apoyo;
