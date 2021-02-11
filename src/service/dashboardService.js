import {curday} from './dateService'
import api from './api'


function createDepositForm(){
    let content = document.getElementById('function-content');
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

export {createDepositForm}