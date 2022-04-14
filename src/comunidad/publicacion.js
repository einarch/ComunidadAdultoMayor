import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
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
            <br />
            {naveg}
        </div><>
                <br />
                <br />
                <br />
                <h1 className="header">Publicaciones y Noticias</h1>
                <br />
                <br />
                <Container id="containerSection" className="p-4 mb-4">
                    {data.map(publicacion => {
                        return (
                            <div id="itemSectionCard" className="card shadow-0 border rounded-3 p-3 mb-2">
                                <div className="card-body">
                                    <div className="media d-flex">
                                        <img src={avatar} alt="" class="rounded-circle" height="80" width="80"></img>
                                        <div className="media-body flex-grow-1 ms-3">
                                            <h5 className="publicacionUserName mt-0 mb-1"><b>{publicacion.nombre}</b></h5>
                                            <h6 className="media-heading"><b>Publicado:</b> {dateFormat(publicacion.fechahora, "dd/mm/yyyy h:MM TT")}</h6>
                                            <h6 className="media-heading"> {publicacion.descripcion}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}
                </Container>
            </></>
    );
}

export default Publicacion;
