import {curday} from './dateService'
import {planosConta} from './credentialService'


function createOptionPlanoConta(nomePlanoConta, valuePlanoConta){
    setTimeout(() => {
        let select = document.getElementById('deposit-planos-conta')
        let option = document.createElement('option')
        option.text = nomePlanoConta;
        option.value = valuePlanoConta;
        select.add(option)
    }, 300)
}

function createDepositForm(){
    let content = document.getElementById('function-content');
    let plc = planosConta();
    let currentDay = curday()
    content.innerHTML=
    `
        <h1>Realize seu Deposito</h1>
        <form id='depositSubmit'>
            <select name="tipo-conta" id="deposit-tipo-conta" required>
                <option value="CONTA CREDITO">Conta Crédito</option>
                <option value="CONTA BANCO">Conta Banco</option>
            </select>
            <input type="date" name="deposit-data" id="deposit-date" placeholder="dd/mm/yyyy" value=${currentDay} required>
            <select name="planos-conta" id="deposit-planos-conta" required>
                ${plc.map(plano => createOptionPlanoConta(plano.descricao, plano.id))}
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
}

function createSuccessCard(){
    let content = document.getElementById('function-content');
    content.innerHTML = 
    `
    <div class='default-container success-card'>
        <h2> Transação realizada com sucesso ! </h2>
    </div>
    `
}

export {createDepositForm, createSuccessCard}