import { useState, useContext} from 'react';
import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "./Login.css";
import "./Login.css";
import logo from './../imagenes/logo-comunidad.PNG'
import Image from "react-bootstrap/Image";
import { UserContext } from './context/UserContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";


const URL_LOGIN = "http://localhost:80/apiCam/login.php";

const enviarDatos = async (url, datos)=> {
    const resp = await fetch (url, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers:{
            'Content-Type':'application/json'
        }
    });
    console.log(resp);
    const rjson = await resp.json();
    console.log('hola');
    console.log(rjson);

    return rjson;
}

let i = 0;
function Login(props) {
    const { loginUser, wait, loggedInCheck } = useContext(UserContext);
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
            window.location.href = '/Home';
        }else{
            i= i+1;
            console.log(i);
            if(i>3){
                window.location.href = '*';
                i=0
            }
        }
        
    };

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
                <form onSubmit={submitForm} className="row g-3 ">
                    <div className="mb-2 d-flex flex-row align-items-center">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
                        <div class="col-sm-12 ">
                            <input className="form-control center-block" type="email" name="email" onChange={onChangeInput} id="email" value={formData.email} ref={refUsuario} required />
                        </div>
                    </div>
                    <div className="mb-2 d-flex flex-row align-items-center">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Contraseña:</label>
                        <div class="col-sm-12">
                            <input className="form-control center-block" type="password" name="password" onChange={onChangeInput} id="password" value={formData.password} ref={refContraseña} required />
                        </div>
                    </div>
                    <i class='fas fa-sign-in-alt'></i>
                    {errMsg && <div className="err-msg">{errMsg}</div>}
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        {redirect ? redirect : <button onClick={handleLogin} type="submit" disabled={wait}><FontAwesomeIcon icon={faSignInAlt}/> Ingresar</button>}
                    </div>
                </form>
            </Container>
        </div>
    );
}

export default Login;