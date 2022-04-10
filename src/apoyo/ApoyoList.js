import React from 'react';

import axios from 'axios';

import datos from './datos';
import Avatar from './../imagenes/avatar.jpg'

export default class ApoyoList extends React.Component {
  state = {
    apoyo: []
  }

  ApoyoList() {
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
        {datos.map(apoyo => {
          return (
            <tr>
              <th scope="row" >
                <div class="media d-flex " >
                  <br></br>
                  <img src={Avatar} alt="" class="rounded-circle" height="80" width="80"></img>
                  <div class="media-body flex-grow-1 ms-3">
                    <h5 class="mt-0 mb-1" ><b>{apoyo.nombre}</b></h5>
                    <br></br>
                    <h6 class="media-heading">{apoyo.ciudad} &emsp; &ensp; Teléfono:{apoyo.telefono} </h6>
                    <br></br>
                    <h6 class="media-heading">Días disponibles: {apoyo.dias}</h6>
                    <br></br>
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
