import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './../comunidad/Publicacion.css';
import avatar from '../imagenes/avatar.jpg';
//import ListaPublicaciones from './ListaPublicaciones';
import Navegacion from '../components/Navegacion';

const Publicacion = ({ children }) => {
    const naveg = <Navegacion />;

    const baseUrl="http://localhost:80/apiCam/com.php";
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
        <><div className='container' class="bg-ligth" >
            <br />
            {naveg}
        </div><>
                <br />
                <br />
                <br />
                <br />
                <br />
                <h1 className="header">Publicaciones y Noticias</h1>
                <Container className="p-11 mb-4 bg-light rounded-3 div2" >
                    <div class="row justify-content-center" className="div1">
                        <table class="table table-bordered" border="0">
                            
                            <tbody>
                            {data.map(publicacion => {
                            return (
                                <tr >
                                <th scope="row">
                                    <div class="media d-flex ">
                                    <img src={avatar} alt="" class="rounded-circle" height="80" width="80"></img>
                                    <div class="media-body flex-grow-1 ms-3">
                                        <h5 class="mt-0 mb-1"><b>{publicacion.nombre}</b></h5>
                                        <h6 class="media-heading"><b>Publicado:</b> {publicacion.fechahora}</h6>
                                        <h6 class="media-heading"> {publicacion.descripcion}</h6>
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

export default Publicacion;
