import { useState, useContext } from 'react';
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
const Login = () => {
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
        })
    }

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
    }

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
                            <input className="form-control center-block" type="email" name="email" onChange={onChangeInput} id="email" value={formData.email} required />
                        </div>
                    </div>
                    <div className="mb-2 d-flex flex-row align-items-center">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Contraseña:</label>
                        <div class="col-sm-12">
                            <input className="form-control center-block" type="password" name="password" onChange={onChangeInput} id="password" value={formData.password} required />
                        </div>
                    </div>
                    <i class='fas fa-sign-in-alt'></i>
                    {errMsg && <div className="err-msg">{errMsg}</div>}
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        {redirect ? redirect : <button type="submit" disabled={wait}><FontAwesomeIcon icon={faSignInAlt}/> Ingresar</button>}
                    </div>
                </form>
            </Container >
        </div >
    );
}

export default Login;