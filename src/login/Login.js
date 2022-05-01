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