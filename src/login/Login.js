import React from 'react';
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import swal from 'sweetalert';
import "./Login.css";
import logo from './../imagenes/logo-comunidad.PNG'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import configData from "../config/config.json";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './auth'

const URL_LOGIN = configData.LOGIN_API_URL;


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


let i = 0;
let err = "";

export const Login = () => {

    const navigate = useNavigate()
    // const {login} = useAuth()
    const login = (e) => {
        localStorage.setItem('user',e )
    }

    const { handleSubmit, handleChange, values, touched, errors, handleBlur } = useFormik({

        initialValues: { email: "", password: "" },
        onSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                console.log("Logging in", values);
                setSubmitting(false);
            }, 500);
        },

        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email("Correo no válido")
                .min(6, "Correo no válido")
                .max(30, "Correo no válido")
                .required("Introduzca su correo")
                .matches(/^[a-z0-9.\s]+@[a-z0-9\s]+\.[a-z0-9.\s]/, "Caracteres no permitidos"),
            password: Yup.string()
                .required("Introduzca su contraseña")
                .min(6, "Contraseña no válida")
                .max(15, "Contraseña no válida")
                .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/, "Caracteres no permitidos")
        })

    })

    const mostrarAlerta = (e) => {
        swal({
            title: "Datos Incorrectos",
            text: e,
            icon: "error",
            button: "Aceptar"
        });
    }

    const [isValid, setIsValid] = useState(false);
    const handleLogin = async () => {
        setIsValid(false)
        const datos = {
            "usuario": values.email,
            "clave": values.password
        };
        console.log(datos);
        const respuestaJson = await enviarDatos(URL_LOGIN, datos);
        console.log(respuestaJson.conectado);
        console.log(respuestaJson.error);
        err = respuestaJson.error

        if (respuestaJson.conectado == true) {
            setIsValid(false)
            login(respuestaJson.IDUSUARIO)         
            navigate('/home/comunidad', { replace: true })
        } else {
            setIsValid(true)
            i = i + 1;
            console.log(i);
            //mostrarAlerta(err);
            if (i > 3) {
                window.location.href = '*';
                i = 0
            }
        }

    };
    return (

        <div className='loginPage'>
            <br />
            <br />
            <Alert show={isValid} variant="danger" style={{ width: "35rem" }}>
                <Alert.Heading>
                    {err}
                    <button type="button" class="btn-close derecha" data-bs-dismiss="alert" aria-label="Close"></button>
                </Alert.Heading>
            </Alert>
            <br />
            <br />
            <Container className="loginForm d-flex flex-column justify-content-center align-items-center">
                <div className='mb-5'>
                    <img src={logo} className="rounded-circle" height="120" width="120"></img>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <label htmlFor="email" className="col-sm-2 col-form-label d-flex flex-row justify-content-center">Email</label>
                        <div className="col-sm-10 d-flex flex-row justify-content-center">
                            <input
                                className={errors.email && touched.email && "error"}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Ingresa tu correo"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                        </div>
                    </div>
                    <div className="errorMessg mb-3 d-flex flex-row">
                        {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                        )}
                    </div>
                    <div className="row">
                        <label htmlFor="password" className="col-sm-2 col-form-label d-flex flex-row justify-content-center">Contraseña</label>
                        <div className="col-sm-10 d-flex flex-row justify-content-center">
                            <input
                                className={errors.password && touched.password && "error"}
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Ingresa tu password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />

                        </div>
                    </div>
                    <div className="errorMessg mb-3 d-flex flex-row">
                        {errors.password && touched.password && (
                            <div className="input-feedback">{errors.password}</div>
                        )}
                    </div>
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        <button
                            onClick={handleLogin}
                            type="submit"
                        >
                            <FontAwesomeIcon icon={faSignInAlt} /> Ingresar
                        </button>
                    </div>
                </form>
            </Container >
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div >
    );
};

export default Login;
