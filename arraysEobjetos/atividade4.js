const prompt = require('prompt-sync')()

let filaProjeto = [];

let nomeEmpresa = prompt('Digite o nome de uma empresa cliente: ');

let valorProjeto = parseFloat(prompt('Digite o valor estimado do projeto (em reais): '));

let dadosProjeto = {
    cliente : nomeEmpresa,
    valorEstimado: valorProjeto
}
filaProjeto.push(dadosProjeto)

let verificaPrazo = prompt('O projeto possui prazo de entrega urgente? (sim/não): ');

if (verificaPrazo == 'sim' && filaProjeto[0].valorEstimado > 3000){
    filaProjeto[0].valorEstimado = filaProjeto[0].valorEstimado * 1.15
}

console.log(filaProjeto)