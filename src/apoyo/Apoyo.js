import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from "yup";
import './../apoyo/Apoyo.css';
import configData from "../config/config.json";
import { Row, Col } from 'react-bootstrap';
import CardVoluntario from './CardVoluntario';

const Apoyo = ({ children }) => {

    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
    const [selectedFile, setSelectedFile] = useState();

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
            telefono: Yup.string()
                .required("El Teléfono es requerido")
                .min(8, "El Teléfono debe contener al menos 8 dígitos")
                .max(11, "El Teléfono debe contener debe contener máximo 11 dígitos")
                .matches(/^[567][0-9]{7,11}$/, 'El Teléfono debe seguir el formato: 6XXXXXXX o 5916XXXXXXX'),
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
                    {Array.from(data).map(({ NOMBRE, APELLIDO, TIPOAPOYO, TELEFONOV, CIUDAD, DIASDISPONIBLES, DESCRIPCIONV, IMAGENV, IDVOL }) => (
                        <Col>
                            <CardVoluntario nombre={NOMBRE} apellido={APELLIDO} tipoDeApoyo={TIPOAPOYO} telefono={TELEFONOV} ciudad={CIUDAD} diasDisponibles={DIASDISPONIBLES} descripcion={DESCRIPCIONV} imagen={IMAGENV} idVol={IDVOL} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );

}

export default Apoyo;
