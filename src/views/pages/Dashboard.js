import api from '../../service/api';
import { getCredentials } from '../../service/credentialService';
import {
    createDepositForm,
    createFailureCard,
    createPlanoContaCards,
    createSuccessCard,
    createTransferForm,
} from '../../service/dashboardService';
import { completeDateGreet } from '../../service/dateService';
import defaultHeader from '../../service/headerDefault';
import createLoaderDiv from '../../service/loaderService';
import Footer from '../Components/Footer';
import Nav from '../Components/Nav';


let Dashboard = {
    render: async () => {
        const {usuario, contaCredito:conta, conta:contaCred} = getCredentials()
        let nav = await Nav.render();
        let footer = await Footer.render();
        let today = completeDateGreet();
        let view =
        `
            ${nav}
            <main>
                <div class="content-default content-dashboard">
                    <div class="main-content">
                        <div class="greeting-container">
                            <div class="user-greeting">
                                <h1> Olá ${(usuario.nome).charAt(0).toUpperCase() + (usuario.nome).slice(1)}, seja bem-vindo! </h1>
                                <h3>${today}</h3>
                            </div>
                            <div class="user-service">
                                <button type="button" class="btn-user-service" id="btn-refresh"> <i class="fas fa-redo-alt"></i> </button>
                                <button type="button" class="btn-user-service" id="btn-logout"> <i class="fas fa-sign-out-alt"></i> </button>
                            </div>
                        </div>
                        <div id="function-content">
                            O que podemos fazer por você hoje?
                        </div>
                        <div id="contas" class="conta-data">
                            <div class="content-conta" id="conta-credito">
                                <h4>${contaCred.descricao}</h4>
                                <h4>${new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(contaCred.saldo)}</h4>
                            </div>                            
                            <div class="content-conta" id="conta-banco">
                                <h4>${conta.descricao}</h4>
                                <h4>${new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(conta.saldo)}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <aside>
                    <button type=buttom id="btn-depositar">
                        <i class="fas fa-money-bill-wave"></i>
                        Depositar
                    </button>
                    <button id="btn-transferir">
                        <i class="fas fa-hand-holding-usd"></i>
                        Transferir
                    </button>
                    <button id="btn-contas">
                        <i class="fas fa-book"></i>
                        Plano de Contas
                    </button>
                </aside>
            </main>
            ${footer}
        `
        return view
    },

    after_render: async () => {
        window.onload = getPlanosConta();

        let btnDeposit = document.getElementById('btn-depositar');
        btnDeposit.addEventListener('click', createDepositForm);
        let btnTransfer = document.getElementById('btn-transferir')
        btnTransfer.addEventListener('click', createTransferForm)
        let btnPlanoconta = document.getElementById('btn-contas')
        btnPlanoconta.addEventListener('click', createPlanoContaCards)

        let btnReload = document.getElementById('btn-refresh');
        btnReload.addEventListener('click', e => {
            location.reload();
        });
        
        
        let btnLogout = document.getElementById('btn-logout');
        btnLogout.addEventListener('click', e => {
            localStorage.clear();
            observer.disconnect();
            location.replace('#/');
        })

        // observador das mudanças da div function-content
        const divContent = document.getElementById('function-content');
        const config = {attributes: false, childList: true, subtree:true}
        const observer = new MutationObserver(() => {
            const formDeposit = document.getElementById('depositSubmit');
            const formTransfer = document.getElementById('transferSubmit');
            if(document.contains(formDeposit)){
                formDeposit.addEventListener('submit', realizarDeposito);
            }
            else if(document.contains(formTransfer)){
                formTransfer.addEventListener('submit', realizarTransferencia)
            }
        })
        observer.observe(divContent, config)

        async function realizarDeposito(event){
            event.preventDefault(); 
            const {usuario:user} = getCredentials();
            const login = user.login;
            const tipoConta = document.getElementById('deposit-tipo-conta').value;
            const date = document.getElementById('deposit-date').value;
            const planoConta = document.getElementById('deposit-planos-conta').value;
            const descricao = document.getElementById('deposit-descricao').value;
            const valor = document.getElementById('deposit-valor').value;
            console.log(tipoConta, login, date, descricao, planoConta, valor);
            await realizarLancamento(tipoConta, login, date, descricao, planoConta, valor);
        }

        async function realizarTransferencia(event){
            event.preventDefault();
            const tipoConta = document.getElementById('transfer-tipo-conta').value;
            const date = document.getElementById('transfer-date').value;
            const outraConta = document.getElementById('transfer-outra-conta').value;
            const planoConta = document.getElementById('transfer-planos-conta').value;
            const descricao = document.getElementById('transfer-descricao').value;
            const valor = document.getElementById('transfer-valor').value;
            await realizarLancamento(tipoConta, outraConta, date, descricao, planoConta, valor)
        }

        async function getPlanosConta(){
            const {token, usuario:user} = getCredentials();
            await api.get(`lancamentos/planos-conta?login=${user.login}`, {
                headers: defaultHeader(token)
            })
            .then( res => {
                if(res.status === 200){
                    window.localStorage.setItem('userPlanoConta', JSON.stringify(res.data))
                }
            })
            .catch( err => {
                console.log(err)
            })
        }

        async function realizarLancamento(option, contaDestino, date, description, planoConta, valor){
            createLoaderDiv('function-content');
            console.log('entrou no realizarLancamento')
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
                    createSuccessCard();
                }
            })
            .catch(error => {
                console.log(error);
                createFailureCard();
            })
        }

    }

}

export default Dashboard

