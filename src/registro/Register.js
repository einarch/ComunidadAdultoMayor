import {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import swal from 'sweetalert';
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import logo from './../imagenes/logo-comunidad.PNG'
import Container from "react-bootstrap/Container";
import configData from "../config/config.json";
import { useNavigate } from 'react-router-dom'
import Alert from "react-bootstrap/Alert";
import {UserContext} from '../login/context/UserContext';
import "./Register.css";
import * as Yup from "yup";
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai';

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



let mensaje=" ";

const Register = ({children}) => {
    
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
        console.log(datos.usuario);
        console.log(datos.clave);
        console.log(datos.nombre); 
        console.log(datos.apellido);
        console.log(generarIdRol()); 
        console.log(datos.fechaNacimiento);
        console.log(calcularEdad());               
        console.log(datos.ciudad);  
        const respuestaJson = await enviarDatos(URL_BUSCAR, datos);
        console.log(respuestaJson);
        if(respuestaJson.Existe===true){   
            mensaje = respuestaJson.Mensaje;
            setIsValid(true)
            console.log(respuestaJson.Mensaje);
        }else{
            const respuesta1Json = await enviarDatos(URL_REGISTRAR, datos);
            console.log(respuesta1Json);
            setIsValid(false)
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

        initialValues: { email: "", password: "",password2: ""},
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
                .matches(/^[a-zA-Z ]+$/, "Caracteres no permitidos"),
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
    
    const generarID = () => {
        var y = 1;
        y++;
        
        return y;
        
    };
    const generarIdRol = () => {
        if(calcularEdad()<40){
        var x = 2;
       }else
        var x=1;
        return x;
        
    };
    

    return (
        <div className='RegisterPage' >
            <br />
            <Alert show={isValid} variant="danger" style={{ width: "35rem" }}>
                <Alert.Heading>
                    {mensaje}
                    <button type="button" class="btn-close derecha" data-bs-dismiss="alert" aria-label="Close"></button>
                </Alert.Heading>
            </Alert>
            <br /><br />
           
            <Container className="RegisterForm d-flex flex-column justify-content-center align-items-center">
            <h3 class="form-title"><i class="fa fa-user"></i> Registrarse</h3>
                   
                <form onSubmit={handleSubmit}>                

                <div className="form-group">
                        <label htmlFor="text" className="col-sm-2 col-form-label d-flex flex-row justify-content-center"  >Nombre</label>
                        <div className="col-sm-8 d-flex flex-row justify-content-center">
                        <input  className={errors.nombre && touched.nombre && "error"}
                        id="nombre"
                        type="text"
                        name="nombre"
                        placeholder="Ingresa su nombre"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        
                         />
                        </div>
                    </div>
                    <div className="errorMessg mb-3 d-flex flex-row">
                        {errors.nombre && touched.nombre && (
                            <div className="input-feedback">{errors.nombre}</div>
                        )}
                        </div>
                <div className="form-group">
                        <label htmlFor="text" className="col-sm-2 col-form-label d-flex flex-row justify-content-center"  >Apellidos</label>
                        <div className="col-sm-8 d-flex flex-row justify-content-center">
                        <input  
                        className={errors.apellido && touched.apellido && "error"}
                        id="apellido"
                        type="text"
                        name="apellido"
                        placeholder="Ingresa tus apellidos"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.apellido}
                         />
                        </div>
                    </div>
                    <div className="errorMessg mb-3 d-flex flex-row">
                        {errors.apellido && touched.apellido && (
                            <div className="input-feedback">{errors.apellido}</div>
                        )}
                        </div>
                    <div className="form-group">
                        <label htmlFor="email" className="col-sm-1 col-form-label d-flex flex-row justify-content-center"  >Email</label>
                        <div className="col-sm-8 d-flex flex-row justify-content-center">
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
                    
                    <div className="form-group">
                        <label htmlFor="password" className="col-sm-2 col-form-label d-flex flex-row justify-content-center" >Contraseña</label>
                        
                            <input 
                                
                                className={errors.password && touched.password && "error"}
                                id="password"
                                type={state ? "text":"password"}
                                name="password"
                                placeholder="Ingresa su contraseña"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            
                            <button className="btn" onClick={toggleBtn}>
                                {state ? 
                                <AiOutlineEye/>:<AiOutlineEyeInvisible/>
                        } </button>
                        
                    </div>
                    <div className="errorMessg mb-3 d-flex flex-row">
                        {errors.password && touched.password && (
                            <div className="input-feedback">{errors.password}</div>
                        )}
                    </div>
                    <div className="form-group">
                        
                        <label htmlFor="password" className="col-sm-4 col-form-label d-flex flex-row justify-content-center">ConfirmarContrasena</label>

                            <input 
                                
                                className={errors.password2 && touched.password2 && "error"}
                                id="password2"
                                type={state ? "text":"password"}
                                name="password2"
                                placeholder="Ingresa su contraseña"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password2}
                            />
                            <button className="btn" onClick={toggleBtn}>
                                {state ? 
                                <AiOutlineEye/>:<AiOutlineEyeInvisible/>
                        } </button>
                        </div>
                    
                    
                    
                    
                    <div className="errorMessg mb-3 d-flex flex-row">
                        {errors.password2 && touched.password2 && (
                            <div className="input-feedback">{errors.password2}</div>
                        )}
                    </div>

                    
                    <div className="row">
                    <div className="col-sm">
                        <label htmlFor="text" className="col-sm-3 col-form-label d-flex flex-row justify-content-center"  >Ciudad</label>
                                
                           <div class="input-group-addon"  ><span class="glyphicon glyphicon-lock"  ></span></div>
                           <select  onChange={handleChange}
                                onBlur={handleBlur} id="ciudad"
                                type="text"
                                name="ciudad" value={values.ciudad} >
                            <option value=" " >Seleccione una Ciudad</option>
                            <option value="Pando" >Pando</option>
                            <option value="La Paz">La paz</option>
                            <option value="Beni">Beni</option>
                            <option value="Cochabamba">Cochabamba</option>
                            <option value="Santa Cruz">Santa Cruz</option>
                            <option value="Oruro">Oruro</option>
                            <option value="Potosi">Potosi</option>
                            <option value="Sucre">Sucre</option>
                            <option value="Tarija">Tarija</option>
                          </select>
                        
                    </div>  

                    <div class="col-sm">
                     <label  className="col-sm-6 col-form-label d-flex flex-row "  >FechaDeNacimiento</label>
                
                       <div class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></div>
                      <input type="date" min="1950-01-01" max= "2004-12-31" onChange={handleChange}
                                onBlur={handleBlur} id="fechaNacimiento"
                                name="fechaNacimiento" value={values.fechaNacimiento}  />
                     </div>
                     </div>
                
                <div className="row">
                    <div  class="col-sm-7 col text-center">
                <button 
                data-bs-dismiss="modal" type="button" onClick={Registrarse} 
                style={{
                    
                    backgroundColor: "#597a48",
                    color: "black",
                    width:"100px",
                    height:"40px",
                   
                    
                    
                    
                    
                }}>

                  Registrarse
                 </button>
                 </div>
                 <div class="col btn-center">
                <button  onClick={paginaI}
                    href= "../components/PaginaInicio"
                    style={{
                    backgroundColor: "#ff0000",
                    color: "black",
                    width:"100px",
                    height:"40px",
                   
                    
                    
                }}
                >Cancelar</button>
                 
            </div>
            </div>

                </form>
            </Container >
            <br/>
            
        </div >
        
    )
}

export default Register;