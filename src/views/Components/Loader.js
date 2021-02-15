import spinner from '../../img/ball-triangle.svg';

let Loader = {
    render: async () => {
        let view = 
        `   
            <div class="container-loader">
                <img src="${spinner}" height=100 width=100 alt=""></img>
                <h4> Carregando... </h4>
            </div>
        `
        return view
    },
    after_render: async () => {

    }
}

export default Loader