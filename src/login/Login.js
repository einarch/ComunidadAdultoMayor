import { useState, useContext } from 'react';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import "./Login.css";
import logo from './../imagenes/logo-comunidad.PNG'
import { UserContext } from './context/UserContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import configData from "../config/config.json";

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

const Login = () => (


    //Login with tokens 
    /**
        const {loginUser, wait, loggedInCheck} = useContext(UserContext);
        const [redirect, setRedirect] = useState(false);
        const [errMsg, setErrMsg] = useState(false);
        const [formData, setFormData] = useState({
            email: '',
            password: ''
        });
    
        const onChangeInput = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        };
    
        const submitForm = async (e) => {
            e.preventDefault();
    
            if (!Object.values(formData).every(val => val.trim() !== '')) {
                setErrMsg('Please Fill in all Required Fields!');
                return;
            }
    
            const data = await loginUser(formData);
            if (data.success) {
                e.target.reset();
                setRedirect('Redirecting...');
                await loggedInCheck();
                return;
            }
            setErrMsg(data.message);
        };
    */

    // Handle login using refs
    /**
     * 
    const refUsuario = useRef(null);
    const refContraseña = useRef(null);
    

    const handleLogin = async () => {

        const datos = {
            "usuario": refUsuario.current.value,
            "clave": refContraseña.current.value
        };

        console.log(datos);
        const respuestaJson = await enviarDatos (URL_LOGIN, datos);
        console.log(respuestaJson.conectado);
        console.log(i);

        if(respuestaJson.conectado == true){
            window.location.href = '/Comunidad';
        }else{
            i= i+1;
            console.log(i);
            if(i>3){
                window.location.href = '*';
                i=0
            }
        }
        
    };
     */

<Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
            console.log("Logging in", values);
            setSubmitting(false);
        }, 500);
    }}

    validationSchema={Yup.object().shape({
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
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]$/, "Caracteres no permitidos")
    })}

>
    {props => {
        const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleLogin
        } = props;

        return (

            <div className='loginPage'>
                <br />
                <br />
                <br />
                <br />
                <Container className="loginForm d-flex flex-column justify-content-center align-items-center">
                    <div className='mb-5'>
                        <img src={logo} className="rounded-circle" height="120" width="120"></img>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <label htmlFor="email" className="col-sm-2 col-form-label d-flex flex-row justify-content-center">Email</label>
                            <div class="col-sm-10 d-flex flex-row justify-content-center">
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
                                disabled={isSubmitting}>
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
    }
    }
</Formik>
);

export default Login;