import React from 'react';

import Avatar from './../imagenes/avatar.jpg'
import datos from './datos';
import './../actividades/Actividad.css';

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
                  <img src={Avatar} alt="" class="rounded-circle" height="80" width="80"></img>
                  <div class="media-body flex-grow-1 ms-3">
                    <h5 class="mt-0 mb-1"><b>{actividad.nombre}</b></h5>
                    <h6 class="media-heading"><b>Actividad:</b> {actividad.actividad}</h6>
                    <h6 class="media-heading"><b>Fecha y Hora:</b> {actividad.fecha}</h6>
                    <h6 class="media-heading"><b>Ubicación:</b> {actividad.ubicacion}</h6>
                    <h6 class="media-heading"><b>Descripción:</b> {actividad.descripcion}</h6>
                    <h6 class="media-heading"><b>{actividad.numero_asistentes}</b> personas asistirán a la actividad.</h6>
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
