const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
const dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quita-feira", "Sexta-feira", "Sábado"]

const curday = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();

    if (dd<10) dd = '0'+dd;
    if (mm<10) mm = '0'+mm;

    return (yyyy + '-' + mm + '-' + dd)
}

const completeDateGreet = () => {
    const today = new Date();
    const dayName = dias[today.getDay()];
    const dd = today.getDate();
    const mm = meses[today.getMonth()];
    const yyyy = today.getFullYear();

    if (dd < 10) dd = '0'+dd;

    return `Hoje é ${dayName}, ${dd} de ${mm} de ${yyyy}`;
}


export {curday, completeDateGreet}