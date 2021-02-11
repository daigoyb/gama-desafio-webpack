
const defaultHeader = (token) => {

    const header = { 
        'Content-type': 'application/json',
        'Authorization': token
    }

    return header;

}

export default defaultHeader