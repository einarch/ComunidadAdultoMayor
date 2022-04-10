import React from 'react';

import axios from 'axios';

import datosP from './datosP';
import avatar from '../imagenes/avatar.jpg';

export default class ListaPublicaciones extends React.Component {
  state = {
    publicaciones: []
  }

  ListaPublicaciones() {
    this.setState({ datosP });
  };

  /* componentDidMount() {
      axios.get(`https://jsonplaceholder.typicode.com/activities`)
        .then(res => {
          const activities = res.data;
          this.setState({ activities });
        })
    }
  */

  render() {
    return (
      <tbody>
        {datosP.map(publicacion => {
          return (
            <tr >
              <th scope="row">
                <div class="media d-flex ">
                  <img src={avatar} alt="" class="rounded-circle" height="80" width="80"></img>
                  <div class="media-body flex-grow-1 ms-3">
                    <h5 class="mt-0 mb-1"><b>{publicacion.nombre}</b></h5>
                    <h6 class="media-heading"><b>Publicacion:</b> {publicacion.publicacion}</h6>
                    <h6 class="media-heading"><b>Fecha y Hora publicacion:</b> {publicacion.fecha}</h6>
                    <h6 class="media-heading"><b>Descripción:</b> {publicacion.descripcion}</h6>
                  </div>
                </div>
              </th>
            </tr>
          )
        }
        )}
      </tbody>
    )
  }
}
