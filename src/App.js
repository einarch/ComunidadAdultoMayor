import logo from './logo.svg';
import React, { useState } from 'react';

import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

import './App.css';

const ExampleToast = ({ children }) => {
  const [show, toggleShow] = useState(true);

  return (
    <>
      {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className="mr-auto">React-Bootstrap</strong>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </>
  );
};

const Activities = ({ children }) => {

  return (
    <>
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">Eventos & Actividades</h1>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8 col-sm-12">
              <div class="comment-wrapper">
                <br></br>
                <hr></hr>
                <ul class="media-list justify-content-center">
                  <li class="media d-flex ">
                    <img src="https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" alt="" class="rounded-circle" height="80" width="80"></img>
                    <div class="media-body flex-grow-1 ms-3">
                      <h5 class="mt-0 mb-1">Gabriel Mercado</h5>
                      <h6 class="media-heading">Actividad:</h6>
                      <p>Visita de museos en Cochabamba</p>
                      <h6 class="media-heading">Fecha y Hora:</h6>
                      <p>22/04/2022 09:00 a.m</p>
                      <h6 class="media-heading">Ubicacion:</h6>
                      <p>Plazuela Cobija</p>
                      <h6 class="media-heading">Descripción:</h6>
                      <p>En la plazuela habra un bus para transladarse, se ruega puntualidad.</p>
                    </div>
                  </li>
                  <li class="media d-flex ">
                    <img src="https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" alt="" class="rounded-circle" height="80" width="80"></img>
                    <div class="media-body flex-grow-1 ms-3">
                      <h5 class="mt-0 mb-1">Javier Fernandez</h5>
                      <h6 class="media-heading">Actividad:</h6>
                      <p>Taller de Teatro</p>
                      <h6 class="media-heading">Fecha y Hora:</h6>
                      <p>30/04/2022 19:00 p.m</p>
                      <h6 class="media-heading">Ubicacion:</h6>
                      <p>Teatro Capitol, Calle 25 de Mayo entre Ecuador y Venezuela</p>
                      <h6 class="media-heading">Descripción:</h6>
                      <p>El costo de entrada es gratuito, cupos limitados</p>
                    </div>
                  </li>
                </ul>
                <hr></hr>
              </div>
            </div>


          </div>
        </div>
      </Container>
    </>
  );
}

const App = () => (
  <Container className="p-3">
    <Activities>

    </Activities>

  </Container>
);

const MenuCam = () => (
  <Container className="p-5 mb-4 bg-light rounded-3">

    <Nav className="justify-content-center" variant="pills nav-justified rounded" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">Comunidad</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Actividades</Nav.Link>

      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Apoyo</Nav.Link>
      </Nav.Item>
    </Nav>
  </Container>
);


export default App;
