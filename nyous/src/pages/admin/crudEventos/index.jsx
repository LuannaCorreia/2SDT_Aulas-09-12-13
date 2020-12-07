import React, {useEffect, useState} from "react";
import Menu from "../../../components/menu";
import Rodape from "../../../components/rodape";
import Titulo from "../../../components/titulo";
import {Container, Button, Card, Form, Table} from "react-bootstrap";
import {url} from "../../../utils/constants"

const CrudEventos = () => {
    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [urlImagem, setUrlImagem] = useState("");
    const [link, setLink] = useState("");
    const [categoriaId, setCategoriaId] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        preencherSelect();
        listar();
    }, []);

    const preencherSelect = (event) => {
        fetch(url+"/categorias")
        .then(response => response.json())
        .then(dados => {
            setCategorias(dados.data);
        })
        .catch(err => alert(err + ". Mande um email para a nossa equipe de suporte: eventos.suport@gmail.com"));
    }

    //Como esta função é usada em mais de um lugar, poderia ser um util.
    const uploadFile = (event) => {
        event.preventDefault();

        let formData = new FormData();
        formData.append("arquivo", event.target.files[0]);

        fetch(`${url}/upload`, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            setUrlImagem(data.url); 
        })
        .catch(err => alert(err + ". Mande um email para a nossa equipe de suporte: event.suport@gmail.com"));
    }

    const listar = () => {
        fetch(url+"/eventos")
        .then(response => response.json())
        .then(dados => {
            setEventos(dados.data);
            limparCampos();
        })
        .catch(err => alert(err + ". Mande um email para a nossa equipe de suporte: eventos.suport@gmail.com"));
    }

    const salvar = (event) => {
        event.preventDefault();

        let evento = {
            nome: nome,
            link: link,
            categoriaId: categoriaId,
            urlImagem: urlImagem,
            descricao: descricao
        }

        let metodo = (id === 0 ? "POST" : "PUT");
        let urlPostOuPut = (id === 0 ? `${url}/eventos` : `${url}/eventos/${id}`);
    
        fetch(urlPostOuPut, {
            method: metodo,
            body: JSON.stringify(evento),
            headers: {
                "content-type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token-nyous") 
            } 
        })
        .then(response => response.json())
        .then(response => {
            if(metodo==="POST")
                alert("Evento cadastrado com sucesso.");
            else 
                alert("Evento editado com sucesso.");
            listar();
        })
        .catch(err => alert(err + ". Mande um email para a nossa equipe de suporte: event.suport@gmail.com"));
    }

    const editar = (event) => {
        event.preventDefault();

        fetch(url + "/eventos/" + event.target.value)
        .then(response => response.json())
        .then(dados => {
            setId(dados.data.id);
            setNome(dados.data.nome);
            setUrlImagem(dados.data.urlImagem);
            setCategoriaId(dados.data.categoriaId);
            setDescricao(dados.data.descricao);
            setLink(dados.data.link);
        })
        .catch(err => alert(err + ". Mande um email para a nossa equipe de suporte: eventos.suport@gmail.com"));
    }

    const remover = (event) => {
        event.preventDefault();

        fetch(url + "/eventos/" + event.target.value, { 
            method: "DELETE",
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token-nyous")
            }
        })
        .then(response => response.json())
        .then(response => {
            alert("Evento deletado com sucesso.");
            listar(); 
        })
        .catch(err => alert(err + ". Mande um email para a nossa equipe de suporte: eventos.suport@gmail.com"));
    }

    const limparCampos = () => {
        setId(0);
        setNome("");
        setUrlImagem("");
        setLink("");
        setDescricao("");
        setCategoriaId("");
    }

    return(
        <div>
            <Menu/>
            <Container>
                <Titulo titulo="Eventos" descricao="Gerencie seus eventos"/>
                <Card>
                    <Card.Body>
                        <Form onSubmit={event => salvar(event)}>
                            <Form.Group>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Link</Form.Label>
                                <Form.Control type="text" placeholder="http://" value={link} onChange={event => setLink(event.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control as="textarea" rows={3} value={descricao} onChange={event => setDescricao(event.target.value)}/>
                            </Form.Group>

                            <Form.Group controlId="formCategoria">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control as="select" custom value={categoriaId} onChange={event => setCategoriaId(event.target.value)}>
                                    <option value={0}>Selecione</option>
                                    {
                                        categorias.map((item, index) => {
                                            return (
                                                <option key={item.id} value={item.id}>{item.nome}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>

                            <Form.File 
                                label="Imagem da categoria"
                                custom
                                onChange={event => uploadFile(event)}
                            />
                            {urlImagem && <img src={urlImagem} style={{width: "150px"}}/>}
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
                        <th>Link</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Ações</th>
                    </thead>
                    <tbody>
                        {
                            eventos.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td><img src={item.urlImagem} style={{width: "150px"}}/></td>
                                        <td>{item.nome}</td>
                                        <td><a href={item.link} target="_blank">Ir para o evento</a></td>
                                        <td>{item.descricao}</td>
                                        <td>{item.categoria.nome}</td>
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

export default CrudEventos;