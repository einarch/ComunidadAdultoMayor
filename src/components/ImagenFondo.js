import React from "react";
import imagefondo from '../imagenes/imagenFondo.jpg'
import './Cabezera.css';
import "bootstrap/dist/css/bootstrap.css";

import { Container } from 'react-bootstrap';
import Image from "react-bootstrap/Image";

function ImagenFondo() {
    return (
        <Container >
            <div className="text-center">
                <h1 className="title" style={{
                    position: "absolute",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "black",
                    left: 0, right: 0, alignItems: "center",
                    display: "inline-block",
                    textShadow: "1px 2px 3px rgba(246, 250, 31, 0.856)"

                }}>
                    COMUNIDAD PARA ADULTOS MAYORES
                </h1>

                <Image className="imagenFondo"
                    src={imagefondo} fluid style={{
                        width: 1400,
                        height: 350
                    }}
                />
            </div>
           
            <div className="text-left">
                <h2 style={{
                    color: "black" ,
                    fontWeight: "bold",
                    fontSize: "1.688rem"   
                }}>
                 <p></p>
                 PODRA :
                </h2>
            </div>

        </Container >

    );
}
export default ImagenFondo;