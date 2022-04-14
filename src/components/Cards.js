import React from "react";
import Card from "./Card";

import image1 from "../imagenes/image1.jpg";
import image2 from '../imagenes/image2.jpg'
import image3 from '../imagenes/image3.jpg'

const cards = [
  {
    id: 1,
    title: "COMUNIDAD",
    image: image1,
    text:"REALIZAR CONSULTAS, CONTAR TUS EXPERIENCIAS",
  },
  {
    id: 2,
    title: "ACTIVIDADES",
    image: image2,
    text:"ENCONTRAR INVITACIONES A ACTIVIDADES SOCIALES",
  },
  {
    id: 3,
    title: "APOYO",
    image: image3,
    text:"ENCONTRAR COMPAÑIA POR PARTE DE VOLUNTARIOS ",
  },
];

function Cards() {
  return (
    <div className="container d-flex justify-content-center align-items-center h-50">
      <div className="row">
        {cards.map(({ title, image, text, id }) => (
          <div className="col-md-4" key={id}>
            <Card imageSource={image} title={title} text={text} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;