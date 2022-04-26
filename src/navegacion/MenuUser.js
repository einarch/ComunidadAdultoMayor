/*import './App.css';
import Listar from "./componentes/Listar";
import Crear from "./componentes/Crear";
import Editar from "./componentes/Editar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
/*
import { NavLink } from "react-router-dom";

function MainUser() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="nav navbar-nav">
          
              <NavLink className="linky nav-item nav-link" to={"/"} > Sistema </NavLink> 
              <NavLink className="linky nav-item nav-link" 
               style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "1rem 0",
                  backgroundColor: isActive ? "red" : "",
                };
              }}
              to={"/crear"} > About </NavLink> 
              
          
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route exact path="/" component={Listar} />
          <Route path="/crear" component={Crear} />
          <Route path="/editar/:id" component={Editar} />
        </Routes>

      </div>

    </Router>

  );
}

export default MainUser;*/
/*
import React from "react";
import "./navegacion.css";
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, NavLink, DropdownButton, Dropdown } from 'react-bootstrap';
import logo from '../imagenes/logo-comunidad.PNG';
import user from '../imagenes/avatar.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";

const MenuUser = () => {
  const tilde = <span style={{
    fontSize: 35,
    color: "black",
    borderRadius: "16"
  }}>
    <FontAwesomeIcon icon={faUserLarge} />
  </span>

  return (
    <Navbar collapseOnSelect expand="lg" variant="light" fixed="top"
      style={{
        backgroundColor: "#589674"
      }}
    >
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
                <NavLink className="nav-link btn-lg " 
                
               >COMUNIDAD</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link btn-lg "   >ACTIVIDADES</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link btn-lg " >APOYO</NavLink>
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
              <Dropdown.Item eventKey="1" disabled className="text-center"
                style={{
                  fontSize: "1rem", color: "black"
                }}
              >JOSE MIGUEL CASTILLO RIVERA</Dropdown.Item>

              <Dropdown.Item eventKey="2" disabled className="text-center"
                style={{
                  fontSize: "1rem", color: "black"
                }}
              >jose@gmail.com</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="3" className="text-center bg-secondary" style={{
                fontWeight: "bold",
                fontSize: "1rem",
                color: "white"
              }}>CERRAR SESION</Dropdown.Item>
            </DropdownButton>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default MenuUser;*/


import React, { useState } from "react";
import "./navegacion.css";
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, NavLink, DropdownButton, Dropdown } from 'react-bootstrap';
import logo from '../imagenes/logo-comunidad.PNG';
import user from '../imagenes/avatar.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";

const listOptions = [
  { text: "COMUNIDAD", route: "/Comunidad" },
  { text: "ACTIVIDADES", route: "/Actividades" },
  { text: "VOLUNTARIOS", route: "/Voluntarios" }
];

const tilde = <span style={{
  fontSize: 35,
  color: "black",
  borderRadius: "16"
}}>
  <FontAwesomeIcon icon={faUserLarge} />
</span>;

const MenuUser = () => {
  const [activeLink, setActiveLink] = useState(null);

  const renderList = () => {
    return listOptions.map((option, index) => {
      return (
        <li
          key={index}
          onClick={() => setActiveLink(index)}
          id={1}
          className={`nav-item ${activeLink === index ? "bg-secondary" : ""
            }`}
        >
          <NavLink href={option.route} className="nav-link btn-lg">

            <span className="ml-4">{option.text}</span>
          </NavLink>
        </li>
      );
    });
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="light" fixed="top"
      style={{
        backgroundColor: "#589674"
      }}
    >
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
            <ul className="nav nav-pills  nav-fill justify-content-center bg-ligth">
              {renderList()}
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
              <Dropdown.Item eventKey="1" disabled className="text-center"
                style={{
                  fontSize: "1rem", color: "black"
                }}
              >JOSE MIGUEL CASTILLO RIVERA</Dropdown.Item>

              <Dropdown.Item eventKey="2" disabled className="text-center"
                style={{
                  fontSize: "1rem", color: "black"
                }}
              >jose@gmail.com</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="3" className="text-center bg-secondary" style={{
                fontWeight: "bold",
                fontSize: "1rem",
                color: "white"
              }}>CERRAR SESION</Dropdown.Item>
            </DropdownButton>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MenuUser;
