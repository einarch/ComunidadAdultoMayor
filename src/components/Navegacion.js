import React from "react";
import "./navegacion.css";

const Navegacion = () => {
  return (

    <container className="p-5 mb-4 bg-ligth rounded-3 justify-content-center" >
      <ul class="nav nav-pills  nav-fill justify-content-center bg-ligth" >
        <li class="nav-item">
          <a class="nav-link active btn-lg bg-secondary" aria-current="page" href="/Comunidad">COMUNIDAD</a>
        </li>
        <li class="nav-item">
          <a class="nav-link btn-lg" aria-current="page" href="/Actividades">ACTIVIDADES</a>
        </li>
        <li class="nav-item">
          <a class="nav-link  btn-lg" aria-current="page" href="/Voluntarios">APOYO</a>
        </li>
      </ul>
    </container>
  )
}

export default Navegacion;