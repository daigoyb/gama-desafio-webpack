import Inputmask from 'inputmask';

import api from '../../service/api';
import createLoaderDiv from '../../service/loaderService';
import Nav from '../Components/Nav';

let Home = {
    render: async () => {
        let nav = await Nav.render();
        let view = 
        `
        ${nav}
        <main>
            <div class="default-container landing-page1">
                <section>
                    <h2>Fake Bank criado para o desafio da Gama Academy!</h2>
                </section>
                <section>
                    <form id="submitSignIn">
                        <input type="text" placeholder="CPF" id="form-cpf" required>
                        <input type="text" placeholder="Nome Completo" id="form-name" required>
                        <input type="text" placeholder="Username" id="form-user" required>
                        <input type="password" placeholder="Senha" id="form-passwd" required>
                        <input type="password" placeholder="senha" id="form-passwd-again" required>
                        <button type="submit"> Continuar </button>
                    </form>
                </section>
            </div>
        </main>
        `
        return view
    },
    after_render: async () => {
        maskCpf('form-cpf')
        document.getElementById('submitSignIn').addEventListener('submit', (e) => {
            e.preventDefault();
            const cpf = document.getElementById('form-cpf').value;
            const name = document.getElementById('form-name').value;
            const user = document.getElementById('form-user').value;
            const passwd = document.getElementById('form-passwd').value;
            const passwdAgain = document.getElementById('form-passwd-again').value;
            if (validateForm(cpf, name, user, passwd, passwdAgain)){
                postFormLogin(cpf, user, name, passwd);
            }
        })

        function maskCpf(inputId){
            Inputmask({ 
                mask: "999.999.999-99",
                placeholder: '1',
                allowMinus: false
            }
                ).mask(document.getElementById(inputId))
        }
        function validateForm(cpf, name, user, passwd, passwdAgain){
            if(passwd === passwdAgain && passwd.length > 0){
                return true
            }
        }

        async function postFormLogin(cpf, login, nome, senha){
            createLoaderDiv('submitSignIn')
            await api.post('usuarios', {
                cpf: cpf,
                login: login,
                nome: nome,
                senha: senha,
            }, {
                'Content-type': 'application/json'
            }).then( res => {
                if(res.status === 200){
                    console.log(res.data)
                    window.location.replace('#/Login')
                }
            }).catch (err => {
                window.location.replace('#/Error.html')
                console.log(err)
            })
        }
    }
}

export default Home