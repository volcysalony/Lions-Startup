const prompt = require('prompt-sync')();

let estacao = {
    id : "Sensor01",
    local : "Laboratório",
    temperaturas : []
}
let temp1 = parseFloat(prompt("Digite a primeira temperatura: "));
estacao.temperaturas.push(temp1);

let temp2 = parseFloat(prompt("Digite a segunda temperatura: "));
estacao.temperaturas.push(temp2)

let temp3 = parseFloat(prompt("Digite a terceira temperatura: "));
estacao.temperaturas.push(temp3)

//Calculando a média
let media = estacao.temperaturas[0] + estacao.temperaturas[1] + estacao.temperaturas[2] / 3;

if (media > 35){
    estacao.alerta = true;
    console.log(`PERIGO: Média de temperatura extrema ${media} graus detetada no ${estacao.local}!`);
}

if(media <= 35){
    estacao.alerta = false;
    console.log("Temperaturas dentro da normalidade.");
}

console.log(estacao);