
function planosConta(){
    try {
        const planos = window.localStorage.getItem('userPlanoConta')
        return JSON.parse(planos);
    } catch (error) {
        console.log(error)
    }
}

function getCredentials(){
    try {
        const creds = window.localStorage.getItem('userData');
        return JSON.parse(creds);
    } catch (error) {
        console.log(error);
        location.replace('#/Login');
    }
}

function getIdCredentials({login: login}){
    try {
        return login
    } catch (error) {
        console.log(error);
        location.replace('#/Login');
    }
}

export {getCredentials, getIdCredentials, planosConta}