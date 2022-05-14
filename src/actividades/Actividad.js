import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useFormik, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import dateFormat, { masks } from "dateformat";
import './../actividades/Actividad.css';
import avatar from './../imagenes/avatar.jpg'
import configData from "../config/config.json";

const Actividad = ({ children }) => {

    const getActivitiesURL = configData.ACTIVITIES_API_URL;
    const postActivityURL = configData.CREAR_ACTIVIDAD_API_URL;

    const [data, setData] = useState([]);

    // Configurando fecha minima valida
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var minValidDate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 16);

    // Manejando validaciones de todos los campos del formulario de Actividad
    const { handleSubmit, handleChange, values, touched, errors, handleBlur } = useFormik({

        initialValues: { name: "", dateTimeActivity: "", location: "", description: "" },
        onSubmit: (values, { setSubmitting }, { resetForm }) => {
            setTimeout(() => {
                console.log("Logging in", values);
                setSubmitting(false);
            }, 500);

            resetForm({ values: '' });
            console.log("Values: " + values);
        },

        validationSchema: Yup.object().shape({
            name: Yup.string()
                .required("Este campo es requerido")
                .min(4, "Nombre debe tener minimo 4 caracteres")
                .max(80, "Nombre debe tener maximo 80 caracteres"),
            dateTimeActivity: Yup.date()
                .min(minValidDate, "No se acepta fecha y horas pasadas")
                .required("Introduzca una fecha y hora"),
            location: Yup.string()
                .required("Introduzca una ubicación")
                .min(4, "Ubicación debe tener minimo 4 caracteres")
                .max(255, "Ubicación debe tener máximo 255 caracteres"),
            description: Yup.string()
                .min(4, "Descripción debe tener minimo 4 caracteres")
                .max(255, "Descripción debe tener máximo 255 caracteres"),

        })
    })

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

        const datos = {
            "userID": userID,
            "nombre": values.name,
            "fechaHora": values.dateTimeActivity,
            "ubicacion": values.location,
            "descripcion": values.description
        };
        console.log("Actividad: " + JSON.stringify(datos));
        const respuestaJson = await postActivity(postActivityURL, datos);
        console.log("Response: " + respuestaJson);
    }
    const configDateLimits = async () => {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000;
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 16);

        console.log("Fecha: " + localISOTime);
        document.getElementsByName("dateTimeActivity")[0].min = localISOTime;
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
                <h2 className="title">Actividades y Eventos</h2>
                <br />
                <Container className="d-flex flex-row justify-content-end">
                    <button type="button" className="btn m-2 btn-primary" data-bs-toggle="modal" data-bs-target="#createActivity">Crear</button>
                </Container>
                <div align="center">
                    <div className="modal fade" id="createActivity" tabindex="-1" aria-hidden="true" aria-labelledby="modalTitle" data-bs-backdrop="static">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modalColor d-flex flex-row justify-content-center">
                                    <h2 className="modal-title"><b>ACTIVIDAD</b></h2>
                                </div>
                                <div className="modal-body tam p-3 modalColor ">
                                    <Form id="createActivityForm" className="row g-3" onSubmit={handleSubmit}>
                                        <Form.Group className="col-md-12">
                                            <Form.Label className="form-label textModal d-flex flex-row align-items-left">Nombre</Form.Label>
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
                                            />
                                            <Form.Text className="errorMessModal d-flex flex-row" muted>
                                                {errors.name && touched.name && (
                                                    <div className="input-feedback">{errors.name}</div>
                                                )}
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group className="col-md-12">
                                            <Form.Label className="form-label textModal d-flex flex-row align-items-left">Fecha y Hora</Form.Label>
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
                                            <Form.Label className="form-label textModal d-flex flex-row align-items-left">Ubicación</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                className={errors.location && touched.location && "error"}
                                                class="form-control"
                                                id="location"
                                                name="location"
                                                placeholder="Ingrese una ubicación"
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
                                            <Form.Label className="form-label textModal d-flex flex-row align-items-left">Descripción</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
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
                                    </Form>
                                </div>
                                <div className="model-footer col-12 modalColor" align="center">
                                    <button type="button" class="btn btn-secondary col-3 m-2" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="submit" class="btn btn-success col-3 m-2" data-bs-dismiss="modal" onClick={createNewActivity}>Crear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Container className="p-4 mb-4">
                    {data.map(actividad => {
                        return (
                            <Card id="cardItem" className="text-left">
                                <Card.Body>
                                    <Card.Text className='d-flex flex-row'>
                                        <div className='col-sm-2 d-flex flex-column align-items-center justify-content-center '>
                                            <img src={avatar} className="rounded-circle" height="120" width="120"></img>
                                        </div>
                                        <div className="col-sm-10 d-flex flex-column align-items-left justify-content-center ">
                                            <h3 className="cardItemUserName mt-0 mb-1"><b>{actividad.NOMBRE} {actividad.APELLIDO}</b></h3>
                                            <h4 className="cardItemTitle"><b>Actividad:</b> <span className='uppercaseText'>{actividad.ACTIVIDAD}</span></h4>
                                            <h4 className="cardItemTitle"><b>Fecha y hora:</b> {dateFormat(actividad.FECHAHORAA, "dd/mm/yyyy h:MM TT")}</h4>
                                            <h4 className="cardItemTitle"><b>Ubicación:</b> {actividad.UBICACIONA}</h4>
                                            <h4 className="cardItemTitle">{actividad.DESCRIPCIONA}</h4>
                                            <h4 className="cardItemTitle"><b>{actividad.numusuarios}</b> personas asistirán a la actividad.</h4>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    }
                    )}
                </Container>
            </></>
    );
}

export default Actividad;
