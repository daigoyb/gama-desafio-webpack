import spinner from '../../img/ball-triangle.svg'

let Loader = {
    render: async () => {
        let view = 
        `   
            <div class="">
                <img src="${spinner}" height=300 width=300 alt=""></img>
            </div>
        `
    },
    after_render: async () => {

    }
}

export default Loader