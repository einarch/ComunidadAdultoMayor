import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { useFormik, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import './../actividades/Actividad.css';
import configData from "../config/config.json";
import CardActividad from './CardActividad';
import Footer from '../components/Footer';

const Actividad = ({ children }) => {
    let userID = localStorage.getItem("user");
    const [data, setData] = useState([]);

    let acti=[];
    let ac1="";

    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
    const [selectedFile, setSelectedFile] = useState();

    const getActivitiesURL = configData.ACTIVITIES_API_URL;
    const postActivityURL = configData.CREAR_ACTIVIDAD_API_URL;
    const URL_BUSCARASISTIRE = configData.BUSCARASISTIRE_API_URL;

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
                acti=response.data;
            }).catch(error => {
                console.log(error);
            })
            /*for (var i=0; i<acti.length; i++) { 
                const datos = {
                    "idUsuario": userID,
                    "idActividad": acti[i].IDACT,
                };
                const respuestaJson = await postActivity(URL_BUSCARASISTIRE, datos);
                if(respuestaJson.Existe===true){
                    ac1=JSON.stringify(acti[i]);
                    ac1=ac1.replace("}", ",\"EXISTE\":\"true\"}");
                    ac1=JSON.parse(ac1);
                    acti[i]=ac1;
                    console.log(acti);
                }else{
                    ac1=JSON.stringify(acti[i]);
                    ac1=ac1.replace("}", ",\"EXISTE\":\"false\"}");
                    ac1=JSON.parse(ac1);
                    acti[i]=ac1;
                    }
                }
      return acti;*/
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
                <h2 className="sectionTitle">Actividades</h2>
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
                        {Array.from(data).map(({ ACTIVIDAD, NOMBRE, APELLIDO, FECHAHORAA, UBICACIONA, DESCRIPCIONA, IMAGENA, CONTADORASISTIRE, IDACT, EXISTE}) => (
                            <Col>
                                <CardActividad actividad={ACTIVIDAD} nombre={NOMBRE} apellido={APELLIDO} fechaHora={FECHAHORAA} ubicacion={UBICACIONA} descripcion={DESCRIPCIONA} imagen={IMAGENA} asistentes={CONTADORASISTIRE} idAct={IDACT} existe={EXISTE} idUsuario={userID}/>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <Footer></Footer>
            </></>
    );
}

export default Actividad;