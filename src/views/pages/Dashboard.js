import Nav from '../Components/Nav'
import api from '../../service/api'
import defaultHeader from '../../service/headerDefault'
import { getCredentials, getIdCredentials } from '../../service/credentialService'
import {completeDateGreet} from '../../service/dateService'
import {createDepositForm} from '../../service/dashboardService'

let Dashboard = {
    render: async () => {
        const {usuario, contaCredito:conta, conta:contaCred} = getCredentials()
        let nav = await Nav.render();
        let today = completeDateGreet();
        let view =
        `
            ${nav}
            <h1> Dashboard </h1>
             <h1> Olá ${usuario.nome}, seja bem-vindo! </h1>
            <h3>${today}<h3>
            <div id="function-content">
                O que podemos fazer por você hoje?
            </div>
            <div id='contas'>
                <div id="conta-banco>
                    <h4>${conta.descricao}</h4>
                    <h4>$${new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(conta.saldo)}</h4>
                </div>
                <div id="conta-credito">
                    <h4>${contaCred.descricao}</h4>
                    <h4>${new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(contaCred.saldo)}</h4>
                </div>
            </div>
            <aside>
                <button type=buttom id="btn-depositar">Depositar</button>
                <button id="btn-transferir">Transferir</button>
                <button id="btn-contas">Plano de Contas</button>
            </aside>

        `
        return view
    },

    after_render: async () => {
        document.getElementById('btn-depositar').addEventListener('click', createDepositForm);
        
        async function realizarDeposito(){ 
            const {usuario:user} = getCredentials();
            const login = getIdCredentials(user);
            const tipoConta = document.getElementById('deposit-tipo-conta').value;
            const date = document.getElementById('deposit-date').value;
            const descricao = document.getElementById('deposit-descricao').value;
            const valor = document.getElementById('deposit-valor').value;
            // realizarLancamento(tipoConta, login, date, descricao, valor)
        }

        async function getPlanosConta(){
            const {usuario:user} = getCredentials();
            const login = getIdCredentials(user);
            await api.get(`lancamentos/planos-conta?login=${login}`, {
                headers: defaultHeader()
            })
            .then( res => {
                return res;
            })
            .catch( err => {
                console.log(err)
            })
        }

        async function realizarLancamento(option, contaDestino, date, description, planoConta, valor){
            const {token, usuario:user, conta:contaCred, contaCredito:conta} = getCredentials()
            let idConta;
            if(option === "CONTA CREDITO"){
                idConta = contaCred.id
            } 
            else {
                idConta = conta.id
            }
            await api.post('lancamentos', {
                conta: idConta,
                contaDestino: contaDestino,
                data: date,
                descricao: description,
                login: user.login,
                planoConta: planoConta,
                valor: valor
            },{
                headers: defaultHeader(token)
            })
            .then(res => {
                if (res.status === 200){
                    return true;
                }
            })
            .catch(error => {
                console.log(error);
            })
        }

    }

}

export default Dashboard

