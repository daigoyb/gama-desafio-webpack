import logo from '../../img/logo.png';


let Nav = {
    render: async () => {
        let nav = 
            `
            <header>
                <nav class="default-nav">
                    <a class="nav-a" href="#/"><img src="${logo}" width=291 height=65 alt=""></img></a>
                    <a class="nav-a" href="#/">Home</a>
                    <a class="nav-a" href="#/Login">Login</a>
                </nav>
            </header>
            `
        return nav
    },

    after_render: async () => {
        
    }
}

export default Nav;