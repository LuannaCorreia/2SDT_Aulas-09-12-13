import React from "react";
//Importando componentes
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import jwt_decode from "jwt-decode";
import {useHistory} from "react-router-dom";

//Antes para retornar uma view simples usávamos function e interativas class, agora utilizaremos só pure functions.
const Menu = () => {
    const history = useHistory();

    //Destrói o token de logado
    const sair = (event) => {
        event.preventDefault();

        localStorage.removeItem("token-nyous");

        history.push("/home");
    }

    const renderMenu = () => {
        //Armazena o token do usuário, que está ou não logado.
        const token = localStorage.getItem("token-nyous");

        //Se o usuário não tiver logado...
        if(token===null) {
            return (
                <Nav>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/cadastrar">Cadastrar-se</Nav.Link>
                </Nav>
            )
        }
        else if(jwt_decode(token).role === "Admin") {
            return (
                <Nav>
                    <Nav.Link href="/admin/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/admin/eventos">Eventos</Nav.Link>
                    <Nav.Link href="/admin/categorias">Categorias</Nav.Link>
                    
                    {/*Pega o nome do usuário*/}
                    <NavDropdown title={jwt_decode(token).family} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={event => sair(event)}>Sair</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )
        }
        else {
            return (
                <Nav>
                    <Nav.Link href="/admin/eventos">Eventos</Nav.Link>
                    <Nav.Link href="/sair">Sair</Nav.Link>
                    <NavDropdown title={jwt_decode(token).family} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={event => sair(event)}>Sair</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )
        }
    }

    return (
        <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
            <Navbar.Brand href="/">NYOUS</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>

                {renderMenu()}

            </Navbar.Collapse>
        </Navbar>
    )
}

export default Menu;