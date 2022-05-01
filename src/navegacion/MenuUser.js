/*
import React from "react";
import "./navegacion.css";
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, NavLink, DropdownButton, Dropdown } from 'react-bootstrap';
import logo from '../imagenes/logo-comunidad.PNG';
import user from '../imagenes/avatar.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";

function MenuUser() {
  return (

    <nav className="navbar ">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">Brand</a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li className="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
            <li><a href="#">Link</a></li>
            <li className="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">Separated link</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
          </ul>
          <form className="navbar-form navbar-left">
            <div className="form-group">

            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Link</a></li>
            <li className="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="#">Separated link</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>



  );
}

export default MenuUser;

*/

import React from "react";
import "./navegacion.css";
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, DropdownButton, Dropdown } from 'react-bootstrap';
import {NavLink
} from "react-router-dom";
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
                <NavLink className={({ isActive }) => "nav-link btn-lg" + (isActive ? " bg-secondary" : "")} to='/Header/Comunidad'
                >COMUNIDAD</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => "nav-link btn-lg" + (isActive ? " bg-secondary" : "")} to='/Header/Actividades'
                >ACTIVIDADES</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => "nav-link btn-lg" + (isActive ? " bg-secondary" : "")} to='/Header/Voluntarios'
                >APOYO</NavLink>
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

export default MenuUser;

/*

import React, { useState } from "react";
import "./navegacion.css";
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, NavLink, DropdownButton, Dropdown } from 'react-bootstrap';
import logo from '../imagenes/logo-comunidad.PNG';
import user from '../imagenes/avatar.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";

const listOptions = [
  { text: "COMUNIDAD", route: "/Header/Comunidad" },
  { text: "ACTIVIDADES", route: "/Header/Actividades" },
  { text: "VOLUNTARIOS", route: "/Header/Voluntarios" }
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
          <NavLink exact="true"  
                 to={option.route} className="nav-link btn-lg" >{option.text}
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
          <nav className="me-auto">
            <ul className="nav nav-pills  nav-fill justify-content-center bg-ligth">
              {renderList()}
            </ul>
          </nav>
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

*/
