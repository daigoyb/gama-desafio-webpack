
const defaultHeader = (token) => {

    const header = { 
        'Content-Type': 'application/json',
        'Authorization': token
    }

    return header;

}

export default defaultHeader