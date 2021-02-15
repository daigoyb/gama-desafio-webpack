import { planosConta } from './credentialService';
import { curday } from './dateService';


function createOptionPlanoConta(elemId, nomePlanoConta, valuePlanoConta){
    setTimeout(() => {
        let select = document.getElementById(elemId)
        let option = document.createElement('option')
        option.text = nomePlanoConta;
        option.value = valuePlanoConta;
        select.add(option)
    }, 100)
}

function createDepositForm(){
    let content = document.getElementById('function-content');
    let plc = planosConta();
    let currentDay = curday()
    content.innerHTML=
    `
        <h2>Realize seu Deposito</h2>
        <form id='depositSubmit' class="dashboard-form">
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
    content.scrollIntoView()
}

function createTransferForm(){
    let content = document.getElementById('function-content');
    let plc = planosConta();
    let currentDay = curday()
    content.innerHTML=
    `
        <h2>Realize sua Transferência</h2>
        <form id='transferSubmit' class="dashboard-form">
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

export {createDepositForm, createTransferForm, createSuccessCard, createFailureCard}