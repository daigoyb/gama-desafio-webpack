import Utils from '../src/service/Utils'
import './styles/style.scss';

// Imports
import Home from './views/pages/Home'
import Error404 from './views/pages/Error'
import Login from './views/pages/Login'
import Dashboard from './views/pages/Dashboard'
import EsqueciSenha from './views/pages/EsqueciSenha'

// routes
let routes = {
    '/': Home,
    '/login': Login,
    '/dashboard': Dashboard,
    '/esqueciSenha': EsqueciSenha,
    '/error': Error404
}

const router = async () => {
    const root = null || document.getElementById('root')

    // Obtrer URL do Navegador
    let request = Utils.parseRequestURL();

    // Analisar a URL
    let parseURL = ( request.resource ? '/' + request.resource: '/' ) + ( request.id ? '/:id' + request.id: '' ) + ( request.verb ? '/' + request.verb: '' )

    // Renderiza páginanconforme URL
    let page = routes[parseURL] ? routes[parseURL] : Error404
    root.innerHTML = await page.render()
    await page.after_render();
}

// Observa as mudanças na hash
window.addEventListener('hashchange', router);

// observar o carregamento da página
window.addEventListener('load', router)
