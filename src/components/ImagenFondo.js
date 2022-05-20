import React from "react";
import imagefondo from '../imagenes/imagenFondo.jpg'
import './Cabezera.css';
import "bootstrap/dist/css/bootstrap.css";
import DescripcionApp from "./DescripcionApp";

import { Container } from 'react-bootstrap';
import Image from "react-bootstrap/Image";

function ImagenFondo() {
    return (
        <Container >
            <div className="text-center">
                <h1 className="title" style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "white",
                    left: 0, right: 0, alignItems: "center",
                    display: "inline-block"

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
            <DescripcionApp></DescripcionApp>
        </Container >

    );
}
export default ImagenFondo;