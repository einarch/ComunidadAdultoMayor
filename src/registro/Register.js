import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import { useFormik } from "formik";
import { Form, InputGroup, Button, FormGroup, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import logo from './../imagenes/logo-comunidad.PNG'
import Container from "react-bootstrap/Container";
import configData from "../config/config.json";
import { useNavigate } from 'react-router-dom'
import Alert from "react-bootstrap/Alert";
import { UserContext } from '../login/context/UserContext';
import "./Register.css";
import * as Yup from "yup";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const Register = () => {
    const [state, setstate] = useState(false);

    const paginaI = () => {
        window.location.href = '/';
    }
    const toggleBtn = () => {
        setstate(prevState => !prevState);
    }

    const { handleSubmit, handleChange, values, touched, errors, handleBlur } = useFormik({

        initialValues: { email: "", password: "", password2: "" },
        onSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                console.log("Logging in", values);
                setSubmitting(false);
            }, 500);
        },

        validationSchema: Yup.object().shape({
            nombre: Yup.string()
                .min(3, "Nombre no válido")
                .max(30, "Nombre no válido")
                .required("Introduzca su Nombre")
                .matches(/^[a-zA-Z]+$/, "Caracteres no permitidos"),
            apellido: Yup.string()
                .min(3, "Apellido no válido")
                .max(30, "Apellido no válido")
                .required("Introduzca su Apellido")
                .matches(/^[a-zA-Z]+$/, "Caracteres no permitidos"),
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
                .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/, "Caracteres no permitidos"),
            password2: Yup.string()
                .required("Introduzca su contraseña")
                .min(6, "Contraseña no válida")
                .max(15, "Contraseña no válida")
                .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/, "Caracteres no permitidos")

                .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')

        })

    })

    return (
        <div className='RegisterPage' >
            <br />

            <Container className="RegisterForm d-flex flex-column justify-content-center align-items-center">
                <h3 class="form-title"><i class="fa fa-user"></i> Registrarse</h3>

                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor="text" className="form-label d-flex flex-row justify-content-left">Nombre</Form.Label>
                        <Form.Control className={errors.nombre && touched.nombre && "error"}
                            id="nombre"
                            type="text"
                            name="nombre"
                            placeholder="Ingresa su nombre"
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
                        <Form.Label htmlFor="text" className="form-label d-flex flex-row justify-content-left"  >Apellidos</Form.Label>
                        <Form.Control
                            className={errors.apellido && touched.apellido && "error"}
                            id="apellido"
                            type="text"
                            name="apellido"
                            placeholder="Ingresa tus apellidos"
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
                        <Form.Label htmlFor="email" className="form-label d-flex flex-row justify-content-left"  >Email</Form.Label>
                        <Form.Control
                            className={errors.email && touched.email && "error"}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Ingresa tu correo"
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
                        <Form.Label htmlFor="password" className="form-label d-flex flex-row justify-content-left" >Contraseña</Form.Label>
                        <InputGroup>
                            <Form.Control
                                className={errors.password && touched.password && "error"}
                                id="password"
                                type={state ? "text" : "password"}
                                name="password"
                                placeholder="Ingresa su contraseña"
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
                        <Form.Label htmlFor="password" className="form-label d-flex flex-row justify-content-left">Confirmar Contraseña</Form.Label>
                        <InputGroup>
                            <Form.Control
                                className={errors.password2 && touched.password2 && "error"}
                                id="password2"
                                type={state ? "text" : "password"}
                                name="password2"
                                placeholder="Ingresa su contraseña"
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
                    <Row className="col-md-12 mb-3">
                        <Form.Group as={Col} md="5" >
                            <Form.Label id="ciudad" className="form-label d-flex flex-row justify-content-left">Ciudad</Form.Label>
                            <Form.Select name="color" id="color">
                                <option value="p">Pando</option>
                                <option value="l">La paz</option>
                                <option value="b">Beni</option>
                                <option value="c">Cochabamba</option>
                                <option value="s">Santa Cruz</option>
                                <option value="o">Oruro</option>
                                <option value="p">Potosi</option>
                                <option value="s">Sucre</option>
                                <option value="t">Tarija</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="7">
                            <Form.Label htmlFor="password" id="ciudad" className="form-label d-flex flex-row justify-content-left" >Fecha de Nacimiento</Form.Label>
                            <Form.Control type="date" id="fechaNacimiento" min="1950-01-01" max="2004-12-31" />
                        </Form.Group>
                    </Row>
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        <button
                            className="btn btn-success col-4 m-1"
                            type="submit"
                            as="Input">
                            Registrarse
                        </button>
                        <button
                            className="btn btn-secondary col-4 m-1"
                            onClick={paginaI}
                            href="../components/PaginaInicio"
                        >Cancelar
                        </button>
                    </div>
                </Form>
            </Container >
            <br />

        </div >
    )
}

export default Register;