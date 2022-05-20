import React from "react";
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import './Cabezera.css';
import logo from '../imagenes/logo-comunidad.PNG'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";


function Cabezera() {
    return (
        <div className="container">

            <Navbar bg="transparent" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <div className="logo-empresa" >
                            <img
                                src={logo}
                                className="d-inline-block align-top"
                                alt="logo de la aplicacion"
                            />
                        </div>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 "
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >

                        </Nav>
                        <Form className="d-flex">

                            <Button className="btnInicioSesion" variant="transparent"  href="/login" style={{
                                background:"linear-gradient(to left, rgb(12, 76, 140) 50%, rgb(0, 6, 20) 50%) no-repeat left / 200%",
                                transition: "background-position 0s ease",  
                                color: "#4fbec9",
                                fontWeight: "bold",
                                fontSize: "1.125rem",
                                border: "2px solid white",
                                padding: "0.4rem 1rem",
                                margin: "0.3rem",
                            }}
                            >INICIAR SESION</Button>

                        </Form>
                     
                        <Form className="d-flex">

                            <Button className="btnRegistro" variant="transparent"  href="/registro" style={{
                                
                                background:"linear-gradient(to left, rgb(12, 76, 140) 50%, rgb(0, 6, 20) 50%) no-repeat left / 200%",
                                transition: "background-position 0s ease",  
                                color: "#4fbec9",
                                fontWeight: "bold",
                                fontSize: "1.125rem",
                                border: "2px solid white",
                                padding: "0.4rem 1rem",
                                margin: "0rem",
                                
                            }}
                            >REGISTRARSE</Button>

                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>


    );
}
export default Cabezera;