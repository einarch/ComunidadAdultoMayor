import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import dateFormat, { masks } from "dateformat";
import './../comunidad/Publicacion.css';
import avatar from '../imagenes/avatar.jpg';
import Navegacion from '../components/Navegacion';
import configData from "../config/config.json";

const Publicacion = ({ children }) => {
    const naveg = <Navegacion />;

    const baseUrl = configData.PUBLICATIONS_API_URL;
    const [data, setData] = useState([]);

    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        peticionGet();
    }, [])

    return (
        <><div>
            {naveg}
            <br />
            <br />
            <br />
        </div><>
                <br />
                <br />
                <h2 className="title">Publicaciones y Noticias</h2>
                <br />
                <div align="center" >
        <button type="button" class=" btn btn-success m-2"  data-bs-toggle="modal" data-bs-target="#miModal"  >Publicar</button>
        <div class="modal fade" id="miModal" tabindex="-1" aria-hidden="true" aria-labelledby="modalTitle" data-bs-backdrop="static"> 
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header" className='color'>
              <h2 class="modal-title" id="modalTitle"><b>CREAR PUBLICACION</b></h2>
              
            </div>
            <div class="modal-body" className='color'>
              <p align="left"> &nbsp; Escribe la publicacion:</p>
              
              <textarea name="textarea" className='text' id="descri" rows="10" cols="35"></textarea>
              
            </div>
            
            <div class="model-footer" align="right" className='color'>
             <button type="button" class="btn btn-secondary m-2 " data-bs-dismiss="modal" > Cancelar </button>
             <button type="button" class="btn btn-success m-2 "  data-bs-dismiss="modal" > Publicar </button> 
            </div>
          </div>
         </div>
         </div>
        </div> 
                <br />
                <br />
                <Container id="containerSection" className="p-4 mb-4">
                    {data.map(publicacion => {
                        return (
                            <div id="itemSectionCard" className="card shadow-0 border rounded-3 p-3">
                                <Container className="card-body">
                                    <Container id="divItem" className="media d-flex centerPub">
                                        <img src={avatar} alt="" className="rounded-circle" height="120" width="120"></img>
                                        <div id="divBodyItem" className="media-body flex-grow-1">
                                            <h3 className="cardItemUserName mt-0 mb-1"><b>{publicacion.nombre}</b></h3>
                                            <h4 className="cardItemTitle"><b>Publicado:</b> {dateFormat(publicacion.fechahora, "dd/mm/yyyy h:MM TT")}</h4>
                                            <h4 className="cardItemTitle"> {publicacion.descripcion}</h4>
                                        </div>
                                    </Container>
                                </Container>
                            </div>
                        )
                    }
                    )}
                </Container>
            </></>
    );
}

export default Publicacion;
