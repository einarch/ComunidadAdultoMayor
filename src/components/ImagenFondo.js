import React from "react";
import imagefondo from '../imagenes/imagenFondo.jpg'
import './Cabezera.css';

function ImagenFondo() {
    return (
        <div className="title text-center font-weight-bold">
            <h1>
                Comunidad Para Adultos Mayores 
            </h1>
            <img className="imagenFondo" src={imagefondo} alt="" width={1100} height={400}/>
            <h2 className="texto-segundo">
               Podra : 
            </h2>        
        </div>

    );
}
export default ImagenFondo;