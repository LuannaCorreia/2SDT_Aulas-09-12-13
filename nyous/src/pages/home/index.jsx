import React from "react";
import {Carousel, Jumbotron, Button, Container, Row, Col, Card} from "react-bootstrap";
import Menu from "../../components/menu";
import Rodape from "../../components/rodape";

const Home = () => {
    return (
        <div>
            <Menu/>

            <Carousel>
                <Carousel.Item>
                    <img src="https://vaipromundo.com.br/blog/wp-content/uploads/2019/01/destaque-vpm-dubai.jpg" alt="" className="d-block w/100"/>
                </Carousel.Item>
            </Carousel>

            <Jumbotron className="text-center">
                <h1>Diversos eventos em um único local.</h1>
                <p>Encontre eventos nos mais diversos segmentos de forma rápida</p>
                <p><Button variant="primary" href="/login">Login</Button><Button variant="primary" href="/cadastrar" style={{marginLeft: "10px"}}>Cadastrar-se</Button></p>
            </Jumbotron>

            <Container>
                <Row>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://veja.abril.com.br/wp-content/uploads/2020/08/GettyImages-1227564232.jpg.jpg?quality=70&strip=info&resize=680,453" />
                            <Card.Body>
                                <Card.Title>Tecnologia</Card.Title>
                                <Card.Text>
                                    Fascinado por tecnologia? Confira os eventos de tecnologia mais queridos!
                                </Card.Text>
                                <Button variant="primary">Ir!</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://diariodorio.com/wp-content/uploads/2019/08/Dia17_fogos_WesleyAllen_IHateFlash-11.jpg" />
                            <Card.Body>
                                <Card.Title>Música</Card.Title>
                                <Card.Text>
                                    Gosta de shows musicais? Confira os eventos musicais mais queridos!
                                </Card.Text>
                                <Button variant="primary">Ir!</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://s2.glbimg.com/JAEbtSmnbJwpCB26ItvWXTkibcI=/e.glbimg.com/og/ed/f/original/2018/08/21/restaurante.jpg" />
                            <Card.Body>
                                <Card.Title>Restaurantes</Card.Title>
                                <Card.Text>
                                    Gosta de comer fora? Confira os restaurantes mais queridos!
                                </Card.Text>
                                <Button variant="primary">Ir!</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Rodape/>
        </div>
    )
}

export default Home;