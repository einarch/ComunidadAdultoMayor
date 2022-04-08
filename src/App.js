import logo from './logo.svg';
import React, { useState } from 'react';

import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Actividades from '../src/actividades/Actividad';
import './App.css';
import ActivityList from '../src/actividades/ActivityList';


const App = () => (
  <Container className="p-3">

  <Actividades>
    
  </Actividades>

  </Container>
);




export default App;
