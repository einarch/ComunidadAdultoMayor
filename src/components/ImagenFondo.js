import React from "react";
import imagefondo from '../imagenes/imagenFondo.jpg'
import './Cabezera.css';

function ImagenFondo() {
    return (
        <div className="title text-center font-weight-bold">
            <h1>
                COMUNIDAD PARA ADULTOS MAYORES 
            </h1>
            <h2 className="texto-segundo">
               PODRÁS : 
            </h2>  
            <img className="imagenFondo" src={imagefondo} alt="" />      
        </div>

    );
}
export default ImagenFondo;