const prompt = require('prompt-sync')();

 let codigoProduto = prompt("Digite o código do produto: ");

 switch (codigoProduto) {
    case 'A1':
        console.log("Você escolheu: Batata Chips.");
        break;
    case 'B2':
         console.log("Você escolheu: Amendoim.");
        break;
    case 'C3':
        console.log("Você escolheu: Biscoito de Chocolate.");
        break;
    default:
        console.log("Código inválido. Tente novamente.")
 }