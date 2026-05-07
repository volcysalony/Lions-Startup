const prompt = require('prompt-sync')();

let estoqueTamanhos = [10, 20, 30] // tamanho P, M, G

let vendidasP = parseInt(prompt('Informe a quantidade de camisetas vendidas do tamanho P : '));

let tamanhoPatualizado = estoqueTamanhos[0] - vendidasP

if(tamanhoPatualizado < 5) {
    console.log('Alerta: Estoque de luvas tamanho P está crítico!.');
}
else{
    console.log(`Estoque atualizado. Quantidade restante do tamanho P: ${tamanhoPatualizado}`);
}