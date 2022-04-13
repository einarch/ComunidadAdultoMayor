import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './../apoyo/Apoyo.css';
import avatar from '../imagenes/avatar.jpg';
//import ApoyoList from './ApoyoList';
import NavegacionAp from '../components/NavegacionVol';

const Apoyo = ({ children }) => {
    const naveg = <NavegacionAp />;

    const baseUrl="http://localhost:80/apiCam/apo.php";
    const [data, setData]=useState([]);

    const peticionGet=async()=>{
        await axios.get(baseUrl)
        .then(response=>{
          setData(response.data);
        }).catch(error=>{
          console.log(error);
        })
      }

    useEffect(()=>{
        peticionGet();
    },[])


    return (
        <><div className='container' class="bg-ligth">
            <br />
            {naveg}
        </div><>
                <br />
                <br />
                <br />
                <br />
                <br />
                <h1 className="header"> Voluntarios de Apoyo</h1>
                <Container className="p-11 mb-4 bg-light rounded-3 div2">
                    <div class="row justify-content-center" className="div1">
                        <table class="table table-bordered" border="3">
                            <tbody>
                            {data.map(apoyo => {
                            return (
                                <tr>
                                <th scope="row" >
                                    <div class="media d-flex " >
                                    <br></br>
                                    <img src={avatar} alt="" class="rounded-circle" height="80" width="80"></img>
                                    <div class="media-body flex-grow-1 ms-3">
                                        <h5 class="mt-0 mb-1" ><b>{apoyo.nombre}</b></h5>
                                        <br></br>
                                        <h6 class="media-heading">{apoyo.ciudad} &emsp; &ensp; <b>Telefono:</b>{apoyo.telefono} </h6>
                                        <br></br>
                                        <h6 class="media-heading"><b>Dias Disponibles:</b> {apoyo.diasdisp}</h6>
                                        <br></br>
                                    </div>
                                    </div>
                                </th>
                                </tr>
                            )
                            }
                            )}
                        </tbody>
                        </table>
                    </div>
                </Container>
            </></>
    );
}

export default Apoyo;
