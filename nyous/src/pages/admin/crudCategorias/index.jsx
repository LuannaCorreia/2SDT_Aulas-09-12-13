import React, {useEffect, useState} from "react";
import Menu from "../../../components/menu";
import Rodape from "../../../components/rodape";
import Titulo from "../../../components/titulo";
import {Container, Form, Button, Card, Table} from "react-bootstrap";
import {url} from "../../../utils/constants";

const CrudCategorias = () => {
    const [id, setId] = useState(0); //O id será 0 por padrão
    const [nome, setNome] = useState("");
    const [urlImagem, setUrlImagem] = useState("");
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        listar();
    }, []); //COLOQUE ESTES COLCHETES PQ SE NÃO A PÁGINA FICARÁ SEMPRE ATUALIZANDO

    const listar = () => {
        fetch(url+"/categorias")
        .then(response => response.json())
        .then(dados => {
            setCategorias(dados.data); //Pegamos os dados e colcoamos no array de categorias.
            limparCampos();
        })
        .catch(err => alert(err + ". Mande um email para a nossa equipe de suporte: eventos.suport@gmail.com"));
    }

    const editar = (event) => {
        event.preventDefault();

        fetch(url + "/categorias/" + event.target.value)
        .then(response => response.json())
        .then(dados => {
            setId(dados.data.id);
            setNome(dados.data.nome);
            setUrlImagem(dados.data.urlImagem);
        })
        .catch(err => alert(err + ". Mande um email para a nossa equipe de suporte: eventos.suport@gmail.com"));
    }

    const remover = (event) => {
        event.preventDefault();

        fetch(url + "/categorias/" + event.target.value, { 
            method: "DELETE",
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token-nyous")
            }
        })
        .then(response => response.json())
        .then(response => {
            alert("Categoria deletado com sucesso.");
            listar(); 
        })
        .catch(err => alert(err + ". Mande um email para a nossa equipe de suporte: eventos.suport@gmail.com"));
    }

    const limparCampos = () => {
        setId(0);
        setNome("");
        setUrlImagem("");
    }

    const salvar = (event) => {
        event.preventDefault();

        let categoria = {
            nome: nome,
            urlImagem: urlImagem
        }

        let metodo = (id === 0 ? "POST" : "PUT");
        let urlPostOuPut = (id === 0 ? `${url}/categorias` : `${url}/categorias/${id}`);
    
        fetch(urlPostOuPut, {
            method: metodo,
            body: JSON.stringify(categoria),
            headers: {
                "content-type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token-nyous") //Em endpoints que precisam de autorização na api, precisamos inserir no cabeçalho essa autorization e passar o token. NÃO SE ESQUEÇA DE COLOCAR O ESPAÇO APÓS O BEARER.
            } 
        })
        .then(response => response.json())
        .then(response => {
            if(metodo==="POST")
                alert("Categoria cadastrada com sucesso.");
            else 
                alert("Categoria editada com sucesso.");
            listar();
        })
        .catch(err => alert(err + ". Mande um email para a nossa equipe de suporte: event.suport@gmail.com"));
    }

    const uploadFile = (event) => {
        event.preventDefault();

        //Formulário para envio de arquivos.
        let formData = new FormData();
        formData.append("arquivo", event.target.files[0]); //Na chave arquivo, armazena a imagem

        fetch(`${url}/upload`, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            setUrlImagem(data.url); //Salvamos a url da imagem na API
        })
        .catch(err => alert(err + ". Mande um email para a nossa equipe de suporte: event.suport@gmail.com"));
    }

    return (
        <div>
            <Menu/>
            <Container>
                <Titulo titulo="Categorias" descricao="Gerencie as categorias do sistema para todos os usuários."/>

                <Card>
                    <Card.Body>
                        <Form onSubmit={event => salvar(event)}>
                            <Form.Group controlId="formNome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.File 
                                id="fileCategoria"
                                label="Imagem da categoria"
                                custom
                                onChange={event => uploadFile(event)}
                            />
                            {urlImagem && <img src={urlImagem} style={{width: "150px"}}/> /*Se o usuário tiver selecionado uma imagem, ela aparecerá ali do lado.*/}
                        </Form>

                        <Button variant="success" type="submit" style={{marginTop: "15px"}}>
                            Salvar
                        </Button>
                    </Card.Body>
                </Card>
                <Table>
                    <thead>
                        <th>Imagem</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </thead>
                    <tbody>
                        {
                            categorias.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td><img src={item.urlImagem} style={{width: "150px"}}/></td>
                                        <td>{item.nome}</td>
                                        <td><Button variant="primary" type="button" value={item.id} onClick={event => editar(event)}>Editar</Button><Button variant="danger" type="button" value={item.id} onClick={event => remover(event)} style={{marginLeft: "15px"}}>Remover</Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
            <Rodape/>
        </div>
    )
}

export default CrudCategorias;