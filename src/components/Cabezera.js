import React from "react";
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import './Cabezera.css';
import logo from '../imagenes/logo-comunidad.PNG'


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
                        <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>


    );
}
export default Cabezera;