import Inputmask from 'inputmask';

import { planosConta } from './credentialService';
import { curday } from './dateService';


function createDepositForm(){
    let content = document.getElementById('function-content');
    let plc = planosConta();
    let currentDay = curday();
    content.innerHTML=
    `
        <h2>Realize seu Deposito</h2>
        <form id='depositSubmit' class="dashboard-form scale-up-ver-top">
            <select name="tipo-conta" id="deposit-tipo-conta" required>
                <option value="CONTA CREDITO">Conta Crédito</option>
                <option value="CONTA BANCO">Conta Banco</option>
            </select>
            <input type="date" name="deposit-data" id="deposit-date" placeholder="dd/mm/yyyy" value=${currentDay} required>
            <select name="planos-conta" id="deposit-planos-conta" required>
                ${plc.map(plano => createOptionPlanoConta("deposit-planos-conta", plano.descricao, plano.id))}
            </select>
            <input type="text" name="descricao" id="deposit-descricao" placeholder="Descrição" required>
            <input type="text" name="valor" id="deposit-valor" placeholder="Qual o valor da transferência?" required>
            <button type="submit">
                Transferir agora
                <span class="btn-label">
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                </span>
            </button>
        </form>
    `
    maskValor('deposit-valor')
    content.scrollIntoView()
}

function createPlanoContaCards(){
    let plc = planosConta();
    let content = document.getElementById('function-content');
    content.innerHTML = 
    `
        <div class="planos-conta-container" id="planos-conta">
            ${plc.map(plano => createPlanoContaCard(plano.id, plano.descricao, plano.login))}
        </div>
    `
    content.scrollIntoView()
}

function createPlanoContaCard(id, descricao, login){
    setTimeout(() => {
        let planoContaContainer = document.getElementById('planos-conta')

        let card = document.createElement('div')
        card.className = 'plano-conta-card flip-in-hor-bottom'

        let title = document.createElement('h3')
        title.innerText = descricao

        let tipo = document.createElement('p')
        tipo.innerText = "id: " + id

        let dono = document.createElement('p')
        dono.innerText = "login: " + login

        card.appendChild(title)
        card.appendChild(tipo)
        card.appendChild(dono)
        planoContaContainer.appendChild(card)
    }, 200)
}

function createTransferForm(){
    let content = document.getElementById('function-content');
    let plc = planosConta();
    let currentDay = curday()
    content.innerHTML=
    `
        <h2>Realize sua Transferência</h2>
        <form id='transferSubmit' class="dashboard-form scale-up-ver-top">
            <select name="tipo-conta" id="transfer-tipo-conta" required>
                <option value="CONTA CREDITO">Conta Crédito</option>
                <option value="CONTA BANCO">Conta Banco</option>
            </select>
            <input type="date" name="transfer-data" id="transfer-date" placeholder="dd/mm/yyyy" value=${currentDay} required>
            <select name="planos-conta" id="transfer-planos-conta" required>
                ${plc.map(plano => createOptionPlanoConta("transfer-planos-conta", plano.descricao, plano.id))}
            </select>
            <input type="text" name="outraConta" id="transfer-outra-conta" placeholder="Login da outra conta" required>
            <input type="text" name="descricao" id="transfer-descricao" placeholder="Descrição" required>
            <input type="text" name="valor" id="transfer-valor" placeholder="Qual o valor da transferência?" required>
            <button type="submit">
                Transferir agora
                <span class="btn-label">
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                </span>
            </button>
        </form>
    `
    maskValor('transfer-valor')
    content.scrollIntoView()
}

function createSuccessCard(){
    let content = document.getElementById('function-content');
    content.innerHTML = 
    `
    <div class='default-container feedback-card'>
        <i class="fas fa-check-circle sucess"></i>
        <h2> Transação realizada com sucesso ! </h2>
    </div>
    `
}

function createFailureCard(){
    let content = document.getElementById('function-content');
    content.innerHTML = 
    `
    <div class='default-container feedback-card'>
        <i class="fas fa-times-circle fail"></i>
        <h2> Algo deu errado durante a transação! Tente de novo... </h2>
    </div>
    `
}

function createOptionPlanoConta(elemId, nomePlanoConta, valuePlanoConta){
    setTimeout(() => {
        let select = document.getElementById(elemId)
        let option = document.createElement('option')
        option.text = nomePlanoConta;
        option.value = valuePlanoConta;
        select.add(option)
    }, 100)
}

function maskValor(inputId){
    Inputmask('currency', {
        autoUnmask: true,
        alias: 'numeric',
        groupSeparator: ',',
        autoGroup: true,
        digits: 2,
        radixPoint: '.',
        digitsOptional: false,
        allowMinus: false,
        prefix: 'R$ ',
        rightAlign: false
    }).mask(document.getElementById(inputId))
}

export {createDepositForm, createTransferForm, createSuccessCard, createFailureCard, createPlanoContaCards}