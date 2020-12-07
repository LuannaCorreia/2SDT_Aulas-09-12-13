import React from "react";
import {Jumbotron} from "react-bootstrap";

const Titulo = ({titulo, descricao}) => {
    return (
        <Jumbotron>
            <h1>{titulo}</h1>
            <p>{descricao}</p>
        </Jumbotron>
    )
}

export default Titulo;