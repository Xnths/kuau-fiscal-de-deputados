fetch("http://www.camara.leg.br/cotas/Ano-{2020}.{json}[.zip]", {
    method: 'GET',
    mode: 'no-cors',
    headers:{
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => console.log(data));