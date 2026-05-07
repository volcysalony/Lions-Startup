const prompt = require('prompt-sync')();

let nomeCachorro = prompt('Digite o nome do cachorro: ');

let racaCachorro = prompt('Qual é a raça do cachorro: ');

let idadeCachorro = parseInt(prompt('Qual é a idade do cachorro: '));

let paciente = {
    nome : nomeCachorro,
    raca : racaCachorro,
    idade : idadeCachorro
}
if (idadeCachorro >= 8){
    console.log(`\nO paciente ${nomeCachorro} já é sênior e precisa de exames de rotina.\n`);
}
else {
    console.log('Paciente na faixa de idade regular.\n');
}
console.log('***** INFORMAÇÕES DO PACIENTE *****');
console.log(`Nome: ${nomeCachorro}` );
console.log(`Raça: ${racaCachorro}` );
console.log(`Idade: ${idadeCachorro}` );