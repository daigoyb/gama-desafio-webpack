import Nav from '../Components/Nav'
import api from '../../service/api'
import {getCredentials} from '../../service/credentialService'
import defaultHeader from '../../service/headerDefault'

let Login = {
    render: async () => {
        let nav = await Nav.render()
        let view = 
        `
            ${nav}
            <h1>Login page</h1>
            <form id="loginForm">
                <input type="text" id="login" placeholder="usuário" required>
                <input type="password" id="passwd" placeholder="senha" required>
                <input type="submit" value="Login">
            </form>
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