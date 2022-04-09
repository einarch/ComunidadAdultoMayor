import React from 'react';
import "../App.css";
import Cards from "./Cards.js";
import Cabezera from "./Cabezera.js";
import ImagenFondo from "./ImagenFondo.js";



function PaginaInicio() {
  return (
    <div className="App">
      <Cabezera/>
      <ImagenFondo/>
      <Cards />
    </div>
  );
}
export default PaginaInicio;