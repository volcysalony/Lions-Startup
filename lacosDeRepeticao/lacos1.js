const prompt = require('prompt-sync')()

let escolhaTabuada = parseInt(prompt('Qual tabuada deseja saber? '));

for (let i = 0;  i<=10; i++) {
    console.log(`${escolhaTabuada} * ${i} = ${escolhaTabuada * i}`)
}
