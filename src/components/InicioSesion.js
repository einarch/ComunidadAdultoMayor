import React from 'react';
import React from "react";
import { Navbar, Nav, Container, NavDropdown, NavLink } from 'react-bootstrap';
import logo from '../imagenes/logo-comunidad.PNG'
import "./navegacion.css";

function InicioSesion() {
    return (
        <Navbar bg="light" className="navbar-header">
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
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Container className="p-5 mb-4 bg-ligth rounded-3 justify-content-center header2" >
                            <ul className="nav nav-pills  nav-fill justify-content-center bg-ligth" >
                                <li className="nav-item">
                                    <NavLink className="nav-link btn-lg bg-secondary" aria-current="page" to="/Comunidad" >COMUNIDAD</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link btn-lg" aria-current="page" to="/Actividades" >ACTIVIDADES</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link btn-lg" aria-current="page" to="/Voluntarios" >APOYO</NavLink>
                                </li>
                                

                            </ul>
                            
                        </Container>


                    </Nav>

                </Navbar.Collapse>
                
            </Container>
        </Navbar>
    );
}
export default InicioSesion;