process.stdin.setEncoding('utf8');

let notas = [];

console.log('Digite a nota da primeira prova: ');

process.stdin.once('data', function(data) {
    let prova1 = parseFloat(data.toString().trim())
    notas.push(prova1);

    console.log('Digite a nota da segunda prova: ');

    process.stdin.once('data', function(data) {
        let prova2 = parseFloat(data.toString().trim())
        notas.push(prova2);

        let media = (notas[0] + notas[1]) / 2;

        console.log(`A média das notas é: ${media}`);

        process.exit();
    });
});