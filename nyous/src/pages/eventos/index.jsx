import React, { useEffect, useState } from "react";
import Rodape from "../../components/rodape";
import Menu from "../../components/menu";
import Titulo from "../../components/titulo";
import {Container, Row, Col, Card} from "react-bootstrap";
import {url} from "../../utils/constants";

const Eventos = () => {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        listar();
    }, []);

    const listar = () => {
        fetch(url+"/eventos")
        .then(response => response.json())
        .then(dados => {
            setEventos(dados.data);
        })
        .catch(err => alert(err + ". Mande um email para a nossa equipe de suporte: eventos.suport@gmail.com"));
    }

    return (
        <div>
            <Menu/>
            <Container> 
                <Titulo titulo="Eventos" descricao="Saiba de tudo o que acontece nos eventos do SENAI"/>
                <Row>
                    {
                        eventos.map((item, index) => {
                            return (
                                <Col xs="4">
                                    <Card>
                                        <Card.Img variant="top" src={item.urlImagem} />
                                        <Card.Body>
                                            <Card.Title>{item.nome}</Card.Title>
                                            <Card.Text>
                                                {item.descricao}
                                                <a href={item.link}>Ir!</a>
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small className="text-muted">{item.categoria.nome}</small>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
            <Rodape/>
        </div>
    )
}

export default Eventos;
