import React, {useState} from "react";

//Para redirecionar para eventos
import {useHistory} from "react-router-dom";
import Menu from "../../components/menu";
import Rodape from "../../components/rodape";
import {Container, Form, Button} from "react-bootstrap";

//Para decodificar o token e verificar o tipo de usuário
import jwt_decode from "jwt-decode";
import {url} from "../../utils/constants";

const Login = () => {
    
    //Ao invés de definir um constructor e um setState fazemos assim, utilizando HOOKS.
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const history = useHistory();

    //Se na startup da api não tiver cors não vai funcionar
    const logar = (event) => {
        event.preventDefault();

        fetch(`${url}/account/login`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                senha: senha
            }),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(response => {
            if(response.ok)
                return response.json();
            alert("Dados inválidos.")
        })
        .then(data => {
            //Armazena o token no armazenamento do navegador.
            localStorage.setItem("token-nyous", data.token);

            let decoded = jwt_decode(data.token);

            //Se o usuário for comum é redirecionado para eventos
            if(decoded==="Comum")
                history.push("/eventos");
            else if (decoded==="Admin")
                history.push("/admin");
        })
        .catch(err => {
            alert(err + ". Envie um email para nyous.suport@email.com.");
        });
    }

    return (
        <div>
            <Menu/>
            <Container className="form-height">
                <Form style={{marginTop: "20px", height: "50vh"}} onSubmit={event => logar(event)}>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Endereço de email</Form.Label>
                        <Form.Control type="email" placeholder="usuario@email.com" value={email} onChange={event => setEmail(event.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Senha" value={senha} onChange={event => setSenha(event.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">Enviar</Button>
                </Form>
            </Container>
            <Rodape/>
        </div>
    )
}

export default Login;