import React from 'react';
import { useState } from 'react';
import { useFormik } from "formik";
import { Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import configData from "../config/config.json";
import Alert from "react-bootstrap/Alert";
import "./Register.css";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';


const URL_REGISTRAR = configData.REGISTRAR_API_URL;
const URL_BUSCAR = configData.BUSCAR_API_URL;

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
    console.log(rjson);

    return rjson;
}



let mensaje = " ";
let a1 = "success";
let a2 = "Success:";
let p="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z";

const Register = ({ children }) => {

    const [isValid, setIsValid] = useState(false);
    const Registrarse = async (e) => {
        setIsValid(false)
        const datos = {
            "nombre": values.nombre,
            "apellido": values.apellido,
            "usuario": values.email,
            "clave": values.password,
            "idRol": generarIdRol(),
            "edad": calcularEdad(),
            "ciudad": values.ciudad,
            "fechaNacimiento": values.fechaNacimiento
        };
        console.log(datos);
        const respuestaJson = await enviarDatos(URL_BUSCAR, datos);
        console.log(respuestaJson);
        if (respuestaJson.Existe === true) {
            mensaje = respuestaJson.Mensaje;
            a1 = "danger";
            a2 = "Danger:";
            setIsValid(true)
            console.log(respuestaJson.Mensaje);
            ejecutaAlerta();
        } else {
            const respuesta1Json = await enviarDatos(URL_REGISTRAR, datos);
            mensaje = respuesta1Json.Mensaje;
            a1 = "success";
            a2 = "Success:";
            p="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z";
            setIsValid(true)
            console.log(respuesta1Json.Mensaje);
            ejecutaAlerta();
        }

    }

    function ejecutaAlerta() {

        setTimeout(function () { setIsValid(false) }, 4000)
    }

    const [state, setstate] = useState(false);

    const login = () => {
        window.location.href = "/login";
    }
    const toggleBtn = () => {
        setstate(prevState => !prevState);
    }

    const { handleSubmit, resetForm, handleChange, values, touched, errors, handleBlur } = useFormik({

        initialValues: { nombre: "", apellido: "", email: "", password: "", password2: "", ciudad: "", fechaNacimiento: "" },
        onSubmit: (values, { setSubmitting, resetForm }) => {
            selecciona();
            Registrarse();
            setSubmitting(true);
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
                .required("Apellidos son requeridos")
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
                .required("La Fecha de Nacimiento es requerido"),
            ciudad: Yup.string()
                .required("La Ciudad es requerido")
        })

    })
    const calcularEdad = () => {
        let fechaNacimiento = document.getElementById("fechaNacimiento").value;
        const fechaActual = new Date();
        const anoActual = parseInt(fechaActual.getFullYear());
        const mesActual = parseInt(fechaActual.getMonth()) + 1;
        const diaActual = parseInt(fechaActual.getDate());

        // 2016-07-11
        const anoNacimiento = parseInt(String(fechaNacimiento).substring(0, 4));
        const mesNacimiento = parseInt(String(fechaNacimiento).substring(5, 7));
        const diaNacimiento = parseInt(String(fechaNacimiento).substring(8, 10));

        let edad = anoActual - anoNacimiento;
        if (mesActual < mesNacimiento) {
            edad--;
        } else if (mesActual === mesNacimiento) {
            if (diaActual < diaNacimiento) {
                edad--;
            }
        }
        return edad;

    };
    const selecciona = () => {
        var seleciona = document.getElementById("ciudad");
        if (seleciona.value == 0 || seleciona.value == "") {

            alert("selecciona una ciudad");
            seleciona.focus();
        }

    };

    const generarID = () => {
        var y = 1;
        y++;

        return y;

    };
    const generarIdRol = () => {
        if (calcularEdad() < 40) {
            var x = 2;
        } else
            var x = 1;
        return x;

    };

    return (
        <div className='RegisterPage' >
            <br />
            <Alert className="container d-flex justify-content-center align-items-center" show={isValid} variant={a1}>
                <Alert.Heading>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label={a2}>
                        <path d={p}/>
                    </svg>
                    {mensaje}
                </Alert.Heading>
            </Alert>
            <Container className="RegisterForm">
                <h3 class="textTitleForm d-flex flex-column align-items-center"> Registrarse</h3>
                <div className=" d-flex flex-row justify-content-left textForm mb-1">
                    <span >Los campos marcados * son obligatorios</span>
                </div>
                <Form noValidate onSubmit={handleSubmit}>
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
                        <Form.Label htmlFor="password" className="form-label textLabel d-flex flex-row justify-content-left" >Contraseña*</Form.Label>
                        <InputGroup>
                            <Form.Control
                                className={errors.password && touched.password && "error"}
                                id="password"
                                type={state ? "text" : "password"}
                                name="password"
                                placeholder="Ingrese la contraseña"
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
                                placeholder="Ingrese la contraseña"
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
                    <Row className="col-md-13 mb-3">
                        <Form.Group as={Col} md="7">
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

                        <Form.Group as={Col} md="5" >
                            <Form.Label className="form-label textLabel d-flex flex-row justify-content-left">Ciudad*</Form.Label>
                            <Form.Select
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="ciudad"
                                name="ciudad"
                                type="text"
                                value={values.ciudad} >
                                <option value="0">Seleccione una ciudad</option>
                                <option value="Cochabamba">Cochabamba</option>
                                <option value="La Paz">La Paz</option>
                                <option value="Santa Cruz">Santa Cruz</option>
                                <option value="Pando">Pando</option>
                                <option value="Beni">Beni</option>
                                <option value="Oruro">Oruro</option>
                                <option value="Potosi">Potosi</option>
                                <option value="Sucre">Sucre</option>
                                <option value="Tarija">Tarija</option>
                            </Form.Select>
                            <Form.Text className="errorMessModal d-flex flex-row col-11 justify-content-center" muted>
                                {errors.ciudad && touched.ciudad && (
                                    <div className="input-feedback">{errors.ciudad}</div>
                                )}
                            </Form.Text>
                        </Form.Group>
                    </Row>
                    <div className="d-flex flex-row align-items-center justify-content-center">

                        <Link to={"/"} type="button" className="btn btn-secondary col-4 m-1">Cancelar</Link>

                        <button
                            className="btn btn-success col-4 m-1"
                            as="Input"
                            onClick={handleSubmit} >
                            Registrarse
                        </button>
                    </div>
                </Form>
            </Container >
            <br />
        </div >
    )
}

export default Register;