import React from "react";
import Card from "./Card";

import image1 from "../imagenes/image1.jpg";
import image2 from '../imagenes/image2.jpg'
import image3 from '../imagenes/image3.jpg'

const cards = [
  {
    id: 1,
    title: "Comunidad",
    image: image1,
    text:"Publica tus historias o eventos de tu vida diaria, reacciona a las publicaciones de los abuelonautas de la comunidad",
  },
  {
    id: 2,
    title: "Actividades",
    image: image2,
    text:"Participa en la actividades posteadas cerca de tu barrio o crea una pequeña actividad para divertirte y conocer a tus vecinos",
  },
  {
    id: 3,
    title: "Apoyo",
    image: image3,
    text:"Contactate con los voluntarios solidarios para dar un paseo, acompañarte a una consulta o simplemente hablar con alguien",
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