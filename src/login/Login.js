import { useState, useContext } from 'react';
import Container from "react-bootstrap/Container";
import "./Login.css";
import "./Login.css";
import logo from './../imagenes/logo-comunidad.PNG'
import { UserContext } from './context/UserContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";

const Login = () => (

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
                handleSubmit
            } = props;

            return (

                <div className='loginPage'>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Container className="loginForm d-flex flex-column justify-content-center align-items-center">
                        <div className='mb-5'>
                            <img src={logo} className="rounded-circle" height="120" width="120"></img>
                        </div>
                        <form onSubmit={handleSubmit} className="row g-3">
                            <div className="mb-2 d-flex flex-row align-items-center">
                                <label htmlFor="email" className="col-sm-3 col-form-label center-block">Email:</label>
                                <div class="center-block">
                                    <input
                                        className={errors.email && touched.email && "error"}
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="Ingresa tu correo"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email} required

                                    />
                                    {errors.email && touched.email && (
                                        <div className="input-feedback">{errors.email}</div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-2 d-flex flex-row align-items-center">
                                <label htmlFor="password" className="col-sm-3 col-form-label center-block">Contraseña:</label>
                                <div className="center-block">
                                    <input
                                        className={errors.password && touched.password && "error"}
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="Ingresa tu password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password} required />

                                    {errors.password && touched.password && (
                                        <div className="input-feedback">{errors.password}</div>
                                    )}
                                </div>
                            </div>
                            <i class='fas fa-sign-in-alt'></i>
                            <div className="d-flex flex-row align-items-center justify-content-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}>
                                    <FontAwesomeIcon icon={faSignInAlt} /> Ingresar
                                </button>
                            </div>
                        </form>
                    </Container >
                </div >
            );
        }
        }
    </Formik>
);

export default Login;