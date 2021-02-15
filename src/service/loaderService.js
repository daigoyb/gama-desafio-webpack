import Loader from '../views/Components/Loader';

export default async function createLoaderDiv(targetId){
    let loader = await Loader.render()
    let content = document.getElementById(targetId)
    content.innerHTML = 
    `
        ${loader}
    `
}
