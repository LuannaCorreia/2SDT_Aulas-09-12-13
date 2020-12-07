import React, { useEffect } from "react";
import Rodape from "../../components/rodape";
import Menu from "../../components/menu";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";

const Dashboard = () => {
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem("token-nyous");
        
        //O usuário só conseguirá ver essa página se ele estiver logado e for admin. Ou seja, mesmo se ele escrever essa rota no navegador ele não vai vim pra cá. Mas você teria que fazer isso em cada página, ppor isso tem uma forma melhor lá no index.js
        if(token === null || jwt_decode(token).role !== "Admin") {
            history.push("/login");
        }
    }, []);

    return (
        <div>
            <Menu/>
            <h1>Dashboard</h1>
            <Rodape/>
        </div>
    )
}

export default Dashboard;