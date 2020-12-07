import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';

//Páginas
import Home from './pages/home';
import Login from "./pages/login";
import Cadastrar from "./pages/cadastrar";
import NaoEncontrada from "./pages/404";
import Eventos from './pages/eventos';
import Dashboard from "./pages/admin";
import CrudCategorias from "./pages/admin/crudCategorias";
import CrudEventos from "./pages/admin/crudEventos";

//Estilo bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Para trabalhar com rotas
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import jwt_decode from "jwt-decode";

//Forma melhor de privar usuários sem permissão de ver algumas páginas. Tem outra forma (que não é boa) em eventos e na dashboard do admin.
//Recebe um componente como parâmetro
const RotaPrivada = ({component : Component, ...rest}) => (
  <Route
    {...rest} /*Pega todos os atributos do elemento (path.. component, exact, etc.*/
    render= {
      props => 
      //Se a pessoa não estiver logada
      localStorage.getItem("token-nyous") === null ?
        //É redirecionada para o login
        <Redirect to={{pathname: "/login", state: {from: props.location}}}/> :
        //Se não, vai para a página colocada no parâmetro
        <Component {...props}/>
    }
  />
);

const RotaPrivadaAdmin = ({component : Component, ...rest}) => (
  <Route
    {...rest}
    render= {
      props => 
      //Se a pessoa estiver logada E for admin
      localStorage.getItem("token-nyous") !== null && jwt_decode(localStorage.getItem("token-nyous")).role === "Admin" ?
        //Vai pra página que quer
        <Component {...props}/> :
        //Se não estiver logada, ou mesmo se tiver e for comum, vai pra página de login
        <Redirect to={{pathname: "/login", state: {from: props.location}}}/>
    }
  />
);

const routing = (
  <Router>
    <Switch> {/*Vai escolher.. quando o caminho for /, renderiza a home, quando for /login, renderiza o component login, etc.*/}
      <Route exact path="/" component={Home}/> {/*Tem que por exact por que como todos tem / se não tiver esse exact ele sempre vai pra home*/}
      <Route path="/login" component={Login}/>
      <Route path="/cadastrar" component={Cadastrar}/>
      <RotaPrivada path="/eventos" component={Eventos}/>
      <RotaPrivadaAdmin path="/admin/dashboard" component={Dashboard}/>
      <RotaPrivadaAdmin path="/admin/categorias" component={CrudCategorias}/>
      <RotaPrivadaAdmin path="/admin/eventos" component={CrudEventos}/>
      {/*Se não encontrar, renderiza essa padrão. ELA TEM QUE FICAR POR ÚLTIMO*/}
      <Route component={NaoEncontrada}/>
    </Switch>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

serviceWorker.unregister();