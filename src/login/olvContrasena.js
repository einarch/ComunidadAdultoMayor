import React from 'react';
import { useState } from 'react';
import { useFormik } from "formik";
import { Form, InputGroup, Button } from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import configData from "../config/config.json";
import Alert from "react-bootstrap/Alert";
import "./olvContrasena.css";
import * as Yup from "yup";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const URL_ACTUALIZAR = configData.ACTUALIZAR_API_URL;
const URL_BUSCAR = configData.BUSCAR_API_URL;

const enviarDatos = async (url, datos) => {
    const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const rjson = await resp.json();
    return rjson;
}



let mensaje = " ";
let idUs = 0;
let i = 0;
let a1="success";
let a2="Success:";
const OlvContrasena = ({ children }) => {

    const [isValid, setIsValid] = useState(false);
    const CrearDatos = () => {
        setIsValid(false)
        const datos = {
            "nombre": values.nombre,
            "apellido": values.apellido,
            "usuario": values.email,
            "idUsuario": idUs,
            "clave": values.password,
            "fechaNacimiento": values.fechaNacimiento
        };
        return datos;
    }

    function ejecutaAlerta() {   

        setTimeout(function() {setIsValid(false)}, 4000)
        }


    const Actualizar = async () => {
        const respuestaJson = await enviarDatos(URL_BUSCAR, CrearDatos());
        idUs = respuestaJson.IDUSUARIO;
        if (respuestaJson.Existe === true && values.nombre === respuestaJson.NOMBRE && values.apellido === respuestaJson.APELLIDOS && values.fechaNacimiento === respuestaJson.FECHANACIMIENTO) {
            const respuesta1Json = await enviarDatos(URL_ACTUALIZAR, CrearDatos());
            setIsValid(false)
            console.log(respuesta1Json.Guardado);
            if (respuesta1Json.Guardado === true) {
                mensaje = respuesta1Json.Mensaje;
                a1="success";
                a2="Success:";
                setIsValid(true)
                window.location.href = '/Login';
            }
        } else {
            if (respuestaJson.Existe === false) {
                mensaje = respuestaJson.Mensaje;
                a1="danger";
                a2="Danger:";
                setIsValid(true)
                i = i + 1;
                console.log(i);
                idUs = 0;
                ejecutaAlerta();
            } else {
                mensaje = "Los datos introducidos no pertenecen a una cuenta";
                a1="danger";
                a2="Danger:";
                setIsValid(true)
                i = i + 1;
                console.log(i);
                ejecutaAlerta();
            }
            //mostrarAlerta(err);
            if (i > 3) {
                window.location.href = '*';
                i = 0
            }
        }

    }
    const [state, setstate] = useState(false);

    const paginaI = () => {
        window.location.href = '/';
    }
    const login = () => {
        window.location.href = "/login";
    }
    const toggleBtn = () => {
        setstate(prevState => !prevState);
    }

    const { handleSubmit, resetForm, handleChange, values, touched, errors, handleBlur } = useFormik({

        initialValues: { nombre: "", apellido: "", email: "", password: "", password2: "", fechaNacimiento: "" },
        onSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                resetForm();
                setSubmitting(false);
            }, 4000);
        },


        validationSchema: Yup.object().shape({
            nombre: Yup.string()
                .min(3, "El Nombre debe contener al menos 3 caracteres")
                .max(30, "El Nombre debe contener máximo 30 caracteres")
                .required("El Nombre es requerido")
                .matches(/^[a-zA-Z ]+$/, "Caracteres no permitidos"),
            apellido: Yup.string()
                .min(3, "Apellidos debe contener al menos 3 caracteres")
                .max(30, "Apellidos debe contener máximo 30 caracteres")
                .required("Apellidos es requerido")
                .matches(/^[a-zA-Z ]+$/, "Caracteres no permitidos"),
            email: Yup.string()
                .min(6, "El Correo debe contener al menos 6 caracteres")
                .required("El Correo es requerido")
                .matches(/^(?=.{2,}@)[0-9a-z]+(?:\.[0-9a-z]+)*@[a-z0-9]{2,}(?:\.[a-z]{2,})+$/, "El correo debe seguir el formato mínimo: us@bo.co"),
            password: Yup.string()
                .required("La Contraseña es requerido")
                .min(6, "La Contraseña debe contener al menos 6 caracteres")
                .max(15, "La Contraseña debe contener máximo 15 caracteres")
                .matches(/(?!.* )(?!.*[-_,.#$%&:;'?¡!"{}()¿°|[@^~+*¬<>])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,15})/, "La contraseña debe tener al menos una letra Mayúscula y una letra minúscula"),
            password2: Yup.string()
                .required("Confirmar Contraseña es requerido")
                .min(6, "Confirmar Contraseña debe contener al menos 6 caracteres")
                .max(15, "Confirmar Contraseña debe contener máximo 15 caracteres")
                .matches(/(?!.* )(?!.*[-_,.#$%&:;'?¡!"{}()¿°|[@^~+*¬<>])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,15})/, "La contraseña debe tener al menos una letra Mayúscula y una letra minúscula")
                .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir'),
            fechaNacimiento: Yup.string()
                .required("La Fecha de Nacimiento es requerido")
        })

    })

    return (
        <div className='OlvPage' >
            <br />
            <Alert className="container d-flex justify-content-center align-items-center" show={isValid} variant={a1}>
                <Alert.Heading>
                <FontAwesomeIcon icon={faTriangleExclamation} style={{ color: "#842029" }} />
                    {mensaje}
                </Alert.Heading>
            </Alert>
            <Container className="OlvForm">
                <h3 class="textTitleForm d-flex flex-column align-items-center"> Restablecer Contraseña </h3>
                <div className=" d-flex flex-row justify-content-left textForm mb-1">
                    <span >Los campos marcados * son obligatorios</span>
                </div>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor="email" className="form-label textLabel d-flex flex-row justify-content-left"  >Correo*</Form.Label>
                        <Form.Control
                            className={errors.email && touched.email && "error"}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Ingrese su correo"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                    </Form.Group>
                    <Form.Text className="errorMessModal d-flex flex-row justify-content-center" muted>
                        {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                        )}
                    </Form.Text>
                    <Form.Group>
                        <Form.Label htmlFor="text" className="form-label textLabel d-flex flex-row justify-content-left">Nombre*</Form.Label>
                        <Form.Control className={errors.nombre && touched.nombre && "error"}
                            id="nombre"
                            type="text"
                            name="nombre"
                            placeholder="Ingrese su nombre"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.nombre}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Text className="errorMessModal d-flex flex-row justify-content-center" muted>
                        {errors.nombre && touched.nombre && (
                            <div className="input-feedback">{errors.nombre}</div>
                        )}
                    </Form.Text>
                    <Form.Group>
                        <Form.Label htmlFor="text" className="form-label textLabel d-flex flex-row justify-content-left"  >Apellidos*</Form.Label>
                        <Form.Control
                            className={errors.apellido && touched.apellido && "error"}
                            id="apellido"
                            type="text"
                            name="apellido"
                            placeholder="Ingrese sus apellidos"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.apellido}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Text className="errorMessModal d-flex flex-row justify-content-center" muted>
                        {errors.apellido && touched.apellido && (
                            <div className="input-feedback">{errors.apellido}</div>
                        )}
                    </Form.Text>

                    <Form.Group>
                        <Form.Label htmlFor="password" id="ciudad" className="form-label textLabel d-flex flex-row justify-content-left" >Fecha de Nacimiento*</Form.Label>
                        <Form.Control type="date"
                            min="1950-01-01"
                            max="2004-12-31"
                            onChange={handleChange}
                            onBlur={handleBlur} id="fechaNacimiento"
                            name="fechaNacimiento"
                            value={values.fechaNacimiento} />
                        <Form.Text className="errorMessModal d-flex flex-row col-11 justify-content-center" muted>
                            {errors.fechaNacimiento && touched.fechaNacimiento && (
                                <div className="input-feedback">{errors.fechaNacimiento}</div>
                            )}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="password" className="form-label textLabel d-flex flex-row justify-content-left" >Contraseña*</Form.Label>
                        <InputGroup>
                            <Form.Control
                                className={errors.password && touched.password && "error"}
                                id="password"
                                type={state ? "text" : "password"}
                                name="password"
                                placeholder="Ingrese una contraseña"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <Button
                                className='button-block'
                                variant="light"
                                onClick={toggleBtn}
                            >
                                {state ?
                                    <AiOutlineEye /> : <AiOutlineEyeInvisible />
                                }

                            </Button>
                        </InputGroup>
                    </Form.Group>
                    <Form.Text className="errorMessModal d-flex flex-row justify-content-center" muted>
                        {errors.password && touched.password && (
                            <div className="input-feedback">{errors.password}</div>
                        )}
                    </Form.Text>
                    <Form.Group className="col-md-12">
                        <Form.Label htmlFor="password" className="form-label textLabel d-flex flex-row justify-content-left">Confirmar Contraseña*</Form.Label>
                        <InputGroup>
                            <Form.Control
                                className={errors.password2 && touched.password2 && "error"}
                                id="password2"
                                type={state ? "text" : "password"}
                                name="password2"
                                placeholder="Vuelva a ingresar la contraseña"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password2}
                            />
                            <Button
                                className='button-block'
                                variant="light"
                                onClick={toggleBtn}
                            >
                                {state ?
                                    <AiOutlineEye align="center" /> : <AiOutlineEyeInvisible align="center" />
                                }

                            </Button>
                        </InputGroup>
                    </Form.Group>
                    <Form.Text className="errorMessModal d-flex flex-row justify-content-center" muted>
                        {errors.password2 && touched.password2 && (
                            <div className="input-feedback">{errors.password2}</div>
                        )}
                    </Form.Text>
                    <br />
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        <button
                            className="btn btn-secondary col-4 m-1"
                            onClick={paginaI}
                            href="../components/PaginaInicio"
                        >Cancelar
                        </button>
                        <button
                            className="btn btn-success col-4 m-1"
                            as="Input"
                            onClick={Actualizar} >
                            Aceptar
                        </button>
                    </div>
                </Form>
            </Container >
            <br />
        </div >
    )

}

export default OlvContrasena;