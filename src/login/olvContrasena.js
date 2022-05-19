import React  from 'react';
import {useState } from 'react';
import { useFormik } from "formik";
import { Form, InputGroup, Button } from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import configData from "../config/config.json";
import Alert from "react-bootstrap/Alert";
import "./olvContrasena.css";
import * as Yup from "yup";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

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
    console.log(resp);
    const rjson = await resp.json();
    console.log('hola');
    console.log(rjson);

    return rjson;
}



let mensaje=" ";
let idUs=0;
let i=0;
const OlvContrasena = ({children}) => {
    
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
        console.log(datos);
        console.log(datos.usuario);
        console.log(datos.clave);
        console.log(datos.nombre); 
        console.log(datos.apellido);
        console.log(datos.fechaNacimiento);
        console.log(datos.idUsuario);
        return datos;
    }

    const Actualizar = async () =>{
        const respuestaJson = await enviarDatos(URL_BUSCAR, CrearDatos());
        console.log(respuestaJson);
        idUs=respuestaJson.IDUSUARIO;
        console.log(values.nombre);
        console.log(respuestaJson.NOMBRE);
        console.log(values.apellido);
        console.log(respuestaJson.APELLIDOS);
        console.log(values.fechaNacimiento);
        console.log(respuestaJson.FECHANACIMIENTO);
        if(respuestaJson.Existe===true && values.nombre===respuestaJson.NOMBRE && values.apellido===respuestaJson.APELLIDOS && values.fechaNacimiento===respuestaJson.FECHANACIMIENTO){   
            console.log(values.nombre);
            console.log(respuestaJson.NOMBRE);
            console.log(values.apellido);
            console.log(respuestaJson.APELLIDOS);
            console.log(values.fechaNacimiento);
            console.log(respuestaJson.FECHANACIMIENTO);
            console.log(idUs, "aqui llegue");
            const respuesta1Json = await enviarDatos(URL_ACTUALIZAR, CrearDatos());
            setIsValid(false)
            window.location.href = '/Login';
        }else{
            if(respuestaJson.Existe===false){
                mensaje=respuestaJson.Mensaje;
                console.log(respuestaJson);
                setIsValid(true)
                i = i + 1;
                console.log(i);
                idUs=0;
            }else{
                mensaje="Los datos introducidos no pertenecen a una cuenta";
                setIsValid(true)
                i = i + 1;
                console.log(i);
            }
            //mostrarAlerta(err);
            if (i > 3) {
                window.location.href = '*';
                i = 0
            }
        }
        
    }
    const [state,setstate]=useState(false);
    
    const paginaI=()=>{
        window.location.href = '/';
      }
      const login=()=>{
        window.location.href = "/login";
      }
    const toggleBtn=()=>{
        setstate(prevState=> !prevState);
    }
   
    const { handleSubmit, handleChange, values, touched, errors, handleBlur } = useFormik({

        initialValues: { nombre:"",apellido:"",email: "", password: "", password2: "",fechaNacimiento:"" },
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
                .required("Introduzca sus Apellidos")
                .matches(/^[a-zA-Z ]+$/, "Caracteres no permitidos"),
            email: Yup.string()
                .email("Correo no válido")
                .min(6, "Correo no válido")
                .max(30, "Correo no válido")
                .required("Introduzca su Correo")
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

                .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir'),
                fechaNacimiento: Yup.string()
                .required("Introduzca su Fecha de Nacimiento")  
        })

    })                                                                                                                                         
    

    return (
        <div className='OlvPage' >
            <br />
            <Alert show={isValid} variant="danger" style={{ width: "35rem" }}>
                <Alert.Heading>
                    {mensaje}
                </Alert.Heading>
            </Alert>
            <br /><br />
           
            <Container className="OlvForm d-flex flex-column justify-content-center align-items-center">
                <h3 class="form-title"><i class="fa fa-user"></i> Restablecer Contraseña </h3>
                <br />
                <Form noValidate onSubmit={handleSubmit}>

                <Form.Group>
                        <Form.Label htmlFor="email" className="form-label d-flex flex-row justify-content-left"  >Email</Form.Label>
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
                        <Form.Label htmlFor="text" className="form-label d-flex flex-row justify-content-left">Nombre</Form.Label>
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
                        <Form.Label htmlFor="text" className="form-label d-flex flex-row justify-content-left"  >Apellidos</Form.Label>
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
                            <Form.Label htmlFor="password" id="ciudad" className="form-label d-flex flex-row justify-content-left" >Fecha de Nacimiento</Form.Label>
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
                        <Form.Label htmlFor="password" className="form-label d-flex flex-row justify-content-left" >Contraseña</Form.Label>
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
                        <Form.Label htmlFor="password" className="form-label d-flex flex-row justify-content-left">Confirmar Contraseña</Form.Label>
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
                            className="btn btn-success col-4 m-1"
                            type="submit"
                            as="Input"
                            onClick={Actualizar} >
                            Aceptar
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

export default OlvContrasena;