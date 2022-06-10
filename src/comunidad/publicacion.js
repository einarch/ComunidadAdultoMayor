import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Row, Col, Navbar } from 'react-bootstrap';
import { useFormik, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import './../comunidad/Publicacion.css';
import configData from "../config/config.json";
import CardPublicacion from './CardPublicacion';
import Footer from '../components/Footer';

const URL_PUBLICAR = configData.PUBLICAR_API_URL;

const Publicacion = ({ children }) => {

    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
    const [selectedFile, setSelectedFile] = useState();

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
                .required("La Descripción es requerido")
                .min(4, "La Descripción debe contener al menos 4 caracteres")
                .max(1000, "La Descripción debe contener máximo 1000 caracteres"),
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
        var imageURL = "";
        if (selectedFile && values.file) {
            var imageURL = await postImage();
        }
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

    function borrar() {
        document.getElementById("file").value = "";
        return resetForm();
    }

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
                <h2 className="sectionTitle">Publicaciones</h2>
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
                                    <div className="d-flex flex-row textForm mb-1">
                                        <span >Los campos marcados * son obligatorios</span>
                                    </div>
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
                                        onClick={borrar}
                                    >Cancelar</button>
                                    <button
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
                        {Array.from(data).map(({ NOMBRE, APELLIDO, FECHAHORAP, DESCRIPCIONP, IMAGENP, CONTADORLIKE, IDPUB, EXISTE }) => (
                            <Col>
                                <CardPublicacion nombre={NOMBRE} apellido={APELLIDO} fechaHora={FECHAHORAP} descripcion={DESCRIPCIONP} imagen={IMAGENP} contadorLike={CONTADORLIKE} idPub={IDPUB} existe={EXISTE} idUsuario={us} />
                            </Col>
                        ))}
                    </Row>
                </Container>
                <Footer></Footer>
            </></>
    );
}

export default Publicacion;
