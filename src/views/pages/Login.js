import api from '../../service/api';
import createLoaderDiv from '../../service/loaderService';
import Footer from '../Components/Footer';
import Nav from '../Components/Nav';

let Login = {
    render: async () => {
        let nav = await Nav.render()
        let footer = await Footer.render()
        let view = 
        `
            ${nav}
            <main id="login-main-content" class='login-content'>
                <h1>Login</h1>
                <form id="loginForm">
                    <input type="text" id="login" placeholder="usuário" required>
                    <input type="password" id="passwd" placeholder="senha" required>
                    <button type=submit> Logar </button>
                </form>
            </main>
            ${footer}
        `
        return view
    },
    after_render: async () => {

        document.getElementById('loginForm').addEventListener('submit', e => {
            e.preventDefault()

            const login = document.getElementById('login').value;
            const passwd = document.getElementById('passwd').value;

            postFormLogin(login, passwd)
        })
        
        async function postFormLogin(login, senha){
            createLoaderDiv('login-main-content')
            await api.post('login', {
                senha: senha,
                usuario: login,
            }, 
            { headers: {
                'Content-type': 'application/json'
            }})
            .then( res => {
                if(res.status === 200){
                    localStorage.setItem('userData', JSON.stringify(res.data))
                    window.location.replace('#/Dashboard')
                }
            }).catch (err => {
                // window.location.replace('#/Error') 
                console.log(err)
            }) 
        }
    }
}

export default Login