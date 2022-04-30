import React from "react";
import "./navegacion.css";
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, NavLink, DropdownButton, Dropdown } from 'react-bootstrap';
import logo from '../imagenes/logo-comunidad.PNG';
import user from '../imagenes/avatar.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";

const Navegacion = () => {
  const tilde = <span style={{
    fontSize: 35,
    color: "black",
    borderRadius: "16"
  }}>
    <FontAwesomeIcon icon={faUserLarge} />
  </span>

  return (
   
    <Navbar collapseOnSelect expand="lg"  variant="light" fixed="top"
    style={{
      backgroundColor: "#589674"
      
    }}
    >
      <Container fluid>
        <Navbar.Brand href="/Comunidad">
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
                <NavLink className="nav-link btn-lg bg-secondary" aria-current="page" href="/Comunidad" >COMUNIDAD</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link btn-lg" aria-current="page" href="/Actividades" >ACTIVIDADES</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link btn-lg" aria-current="page" href="/Voluntarios" >APOYO</NavLink>
              </li>


            </ul>
          </Nav>
          <Nav>
            <DropdownButton align="end" title={tilde} id="dropdown-menu-align-end" variant="warning"

            >
              <span>
                <div className="logo-user text-center" >
                  <img
                    src={user}
                  />
                </div>
              </span>
              <Dropdown.Item eventKey="1" disabled  className="text-center"
                style={{
                  fontSize: "1rem", color:"black"
                }}
              >JOSE MIGUEL CASTILLO RIVERA</Dropdown.Item>

              <Dropdown.Item eventKey="2" disabled className="text-center"
                style={{
                  fontSize: "1rem", color:"black"
                }}
              >jose@gmail.com</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="3" className="text-center bg-secondary" style={{
                fontWeight: "bold",
                fontSize: "1rem",
                color:"white"
              }}>CERRAR SESION</Dropdown.Item>
            </DropdownButton>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
  )
}

export default Navegacion;