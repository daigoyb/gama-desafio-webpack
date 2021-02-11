import Nav from '../Components/Nav'
import Footer from '../Components/Footer'

let EsqueciSenha = {
    render: async () => {
        let navBar = await Nav.render();
        let foot = await Footer.render();
        let view = `
            ${navBar}
            <h1> Esqueci a senha </h1>
            ${foot}
        `
    },

    after_render: async () => {

    }
}

export default EsqueciSenha