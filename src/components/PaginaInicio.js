import React from 'react';
import "../App.css";
import Cards from "./Cards.js";
import Cabezera from "./Cabezera.js";
import ImagenFondo from "./ImagenFondo.js";

import ParticleBackground from "../ParticleBackground";
import Footer from './Footer';


function PaginaInicio() {
  return (
    <div className="Applicacion">
      <ParticleBackground />
      <Cabezera />
      <ImagenFondo />
      <Cards />
      <Footer></Footer>
    </div>
  );
}
export default PaginaInicio;