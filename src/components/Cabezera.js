import React from "react";
import { Navbar, Nav, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import './Cabezera.css';
import logo from './imagen/logo-comunidad.png'


function Cabezera() {
    return (
        <div className="container">

            <Navbar bg="transparent" variant="dark"expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <img
                            src={logo}
                            width="100"
                            height="100"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />TECNOVA
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
                            
                            <Link className='btn btn-success' 
                                 to={"/Comunidad"} 
                                 >Iniciar Sesion</Link>

                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>


    );
}
export default Cabezera;