import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useFormik} from "formik";
import * as Yup from "yup";
import dateFormat from "dateformat";
import './../comunidad/Publicacion.css';
import avatar from '../imagenes/avatar.jpg';
import configData from "../config/config.json";


const URL_PUBLICAR = configData.PUBLICAR_API_URL;


const enviarDatos = async (url, datos) => {
    const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    console.log(resp);
    const rjson = await resp.json();
    console.log('hola');
    return rjson;
}

const Publicacion = ({ children }) => {

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
const { handleSubmit, resetForm, handleChange, values, touched, errors, handleBlur, isValid, isSubmitting } = useFormik({
    initialValues: { descri: "" },
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
            .max(1000, "La descripcion debe tener maximo 1000 caracteres")
            
    })
})
    
    let us = localStorage.getItem("user");
    const publicar = async () => {
        const fH = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate() + ' ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        console.log(fH);
        const datos = {
            "idUs": us,
            "descripcion": values.descri,
            "fecha": fH
        };
        console.log(datos);
        console.log(datos.idUs);
        console.log(datos.descripcion);
        const respuestaJson = await enviarDatos(URL_PUBLICAR, datos);
        console.log(respuestaJson);
        window.location=window.location.href;
    }
    function cambiar(){
     // event  =>  setDesc ( event .target.value);
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
                <h2 className="title">Publicaciones y Noticias</h2>
                <br />
                <Container className="d-flex flex-row justify-content-end">
                    <button type="button" className="btn m-2 btn-primary" data-bs-toggle="modal" data-bs-target="#miModal">Publicar</button>
                </Container>
                <div align="center">
                    <div className="modal fade" id="miModal" tabIndex="-1" aria-hidden="true" aria-labelledby="modalTitle" data-bs-backdrop="static">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modalColor d-flex flex-row justify-content-center">
                                    <h2 className="modal-title"><b>PUBLICACIÓN</b></h2>
                                </div>
                                <div className="modal-body tam p-3 modalColor" id="Cpubli">
                                    <Form.Group className="col-md-12">
                                            <Form.Label className="form-label textModal d-flex flex-row align-items-left">Escribe la publicacion *</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={14}
                                                className={errors.descri && touched.descri && "error"}
                                                class="form-control"
                                                id="descri"
                                                name="descri"
                                                placeholder="Escriba lo que quiere publicar"
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
                    {data.map(publicacion => {
                        return (
                            <Card id="cardItem" className="text-left">
                                <Card.Body>
                                    <Card.Text className='d-flex flex-row'>
                                        <div className='col-sm-2 d-flex flex-column align-items-center justify-content-center '>
                                            <img src={avatar} className="rounded-circle" height="120" width="120"></img>
                                        </div>
                                        <div className="col-sm-10 d-flex flex-column align-items-left justify-content-center ">
                                            <h3 className="cardItemUserName mt-0 mb-1"><b>{publicacion.NOMBRE} {publicacion.APELLIDO}</b></h3>
                                            <h4 className="cardItemTitle"><b>Publicado:</b> {dateFormat(publicacion.FECHAHORAP, "dd/mm/yyyy h:MM TT")}</h4>
                                            <h4 className="cardItemTitle"> {publicacion.DESCRIPCIONP}</h4>
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

export default Publicacion;
