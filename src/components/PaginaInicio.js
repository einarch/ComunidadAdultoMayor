import React from 'react';
import "../App.css";
import Cards from "./Cards.js";
import Cabezera from "./Cabezera.js";
import ImagenFondo from "./ImagenFondo.js";

import ParticleBackground from "../ParticleBackground";


function PaginaInicio() {
  return (
    <div className="App">
      <ParticleBackground />
      <Cabezera/>
      <ImagenFondo/>
      <Cards />
    </div>
  );
}
export default PaginaInicio;