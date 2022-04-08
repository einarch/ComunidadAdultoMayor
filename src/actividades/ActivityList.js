import React from 'react';

import axios from 'axios';

import datos from './datos';

export default class ActivityList extends React.Component {
  state = {
    actividades: []
  }

  ActivityList() {
    this.setState({ datos });
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
        {datos.map(actividad => {
          return (
            <tr>
              <th scope="row">
                <div class="media d-flex ">
                  <img src="https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" alt="" class="rounded-circle" height="80" width="80"></img>
                  <div class="media-body flex-grow-1 ms-3">
                    <h5 class="mt-0 mb-1">{actividad.nombre}</h5>
                    <h6 class="media-heading">Actividad:</h6>
                    <p>{actividad.actividad}</p>
                    <h6 class="media-heading">Fecha y Hora:</h6>
                    <p>{actividad.fecha}</p>
                    <h6 class="media-heading">Ubicacion:</h6>
                    <p>{actividad.ubicacion}</p>
                    <h6 class="media-heading">Descripción:</h6>
                    <p>{actividad.descripcion}</p>
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
