import React from "react";
import "./navegacion.css";
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, NavLink, DropdownButton, Dropdown } from 'react-bootstrap';
import logo from '../imagenes/logo-comunidad.PNG';
import user from '../images/user.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonCane } from "@fortawesome/free-solid-svg-icons";

const Navegacion = () => {
  const tilde =<span style={{
    fontSize: 35,
    color: "black"
}}>
    <FontAwesomeIcon icon={faPersonCane} />
  </span>

  return (
    <Navbar collapseOnSelect expand="lg" bg="transparent" variant="light" position="static">
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
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
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
          </Nav>
          <Nav>
            <DropdownButton align="end" title={tilde} id="dropdown-menu-align-end" variant="warning" icon={user}><i className="icon icon-user-tie"></i>
              <span>
                        <div className="logo-user text-center" >
                            <img 
                                src={user}
                            />
                        </div>
              </span>
              <Dropdown.Item eventKey="1" disabled>JOSE MIGUEL CASTILLO RIVERA</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4" >CERRAR SESION</Dropdown.Item>
            </DropdownButton>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default Navegacion;