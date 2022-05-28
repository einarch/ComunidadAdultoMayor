import React from 'react';
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { Form, InputGroup, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import "./Login.css";
import logo from './../imagenes/logo-comunidad1.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import configData from "../config/config.json";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

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
let j = 0;
let err = "";

export const Login = () => {
    const [state, setstate] = useState(false);

    const navigate = useNavigate()
    // const {login} = useAuth()
    const login = (e) => {
        localStorage.setItem('user', e)
    }
    const rol = (e) => {
        localStorage.setItem('id', e)
    }

    const toggleBtn = () => {
        setstate(prevState => !prevState);
    }

    const { handleSubmit, handleChange, values, touched, errors, handleBlur } = useFormik({

        initialValues: { email: "", password: "" },
        onSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                console.log("Logging in", values);
                setSubmitting(false);
            }, 4000);
        },

        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email("Correo no válido")
                .min(6, "El Correo debe contener al menos 6 caracteres")
                .max(30, "El Correo debe contener máximo 30 caracteres")
                .required("El Correo es requerido")
                .matches(/^[a-z0-9.\s]+@[a-z0-9\s]+\.[a-z0-9.\s]/, "Caracteres no permitidos"),
            password: Yup.string()
                .required("La Contraseña es requerido")
                .min(6, "La Contraseña debe contener al menos 6 caracteres")
                .max(15, "La Contraseña debe contener máximo 15 caracteres")
                .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/, "Caracteres no permitidos")
        })

    })

    const [isValid, setIsValid] = useState(false);

    function ejecutaAlerta() {   

        setTimeout(function() {setIsValid(false)}, 4000)
    }

    const handleLogin = async () => {
        setIsValid(false)
        const datos = {
            "usuario": values.email,
            "clave": values.password
        };
        const respuestaJson = await enviarDatos(URL_LOGIN, datos);
        err = respuestaJson.error

        if (respuestaJson.conectado == true) {
            setIsValid(false)
            login(respuestaJson.IDUSUARIO)
            rol(respuestaJson.IDROL)
            navigate('/home/comunidad', { replace: true })
        } else {
            setIsValid(true)
            ejecutaAlerta();
            if (respuestaJson.Existe===true){
                i = i + 1;
                console.log(i);
            }
            if (respuestaJson.Existe===false){
                j = j + 1;
                console.log(j);
            }
            if (i > 3) {
                window.location.href = '/Restablecer';
                i = 0
            }else{
                if (j > 2) {
                    window.location.href = '*';
                    j = 0
                }
            }
        }
    };
    return (

        <div className='loginPage'>
            <br />
            <br />
            <Alert show={isValid} variant="danger" style={{ width: "35rem" }}>
                <Alert.Heading>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Danger:">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    {err}
                </Alert.Heading>
            </Alert>
            <br />

            <Container className="loginForm d-flex flex-column justify-content-center align-items-center">
                <div className='mb-4'>
                    <img src={logo} className="rounded-circle" height="120" width="120"></img>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="col-md-12">
                        <Form.Label htmlFor="email" className="form-label textLabel d-flex flex-row align-items-left">Correo</Form.Label>
                        <Form.Control
                            style={{ fontSize: "17px", color: "black" }}
                            className={errors.email && touched.email && "error"}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Ingresa tu correo"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Text className="errorMessModal d-flex flex-row justify-content-center" muted>
                        {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                        )}
                    </Form.Text>
                    <Form.Group className="col-md-12">
                        <Form.Label htmlFor="password" className="form-label textLabel d-flex flex-row align-items-left">Contraseña</Form.Label>
                        <InputGroup>
                            <Form.Control
                                style={{ fontSize: "17px", color: "black" }}
                                className={errors.password && touched.password && "error"}
                                id="password"
                                type={state ? "text" : "password"}
                                name="password"
                                placeholder="Ingresa tu contraseña"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            >
                            </Form.Control>
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
                    <Form.Text className="errorMessModal d-flex flex-row justify-content-center mb-3" muted>
                        {errors.password && touched.password && (
                            <div className="input-feedback">{errors.password}</div>
                        )}
                    </Form.Text>
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        <button
                            className="btn btn-success col-4 m-1"
                            onClick={handleLogin}
                            type="submit"
                        >
                            Ingresar
                        </button>
                    </div>
                </Form>
                <div className='color-de-olvide-contraseña'>
                <a href="/restablecer">¿Olvidaste tu contraseña?</a>
                </div>
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
