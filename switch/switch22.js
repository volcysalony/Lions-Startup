let nota;

console.log("Digite um número de 0 a 100: ");
process.stdin.once('data', function(data) {
    nota = data.toString().trim();
    processamento(nota);
    process.exit();
})
function processamento (nota){
    switch (true){
        case (nota >= 90 && nota <= 100):
            console.log("Nota: A");
            break;
        case (nota >= 80 && nota <= 89):
            console.log("Nota: B");
            break;
        case (nota >= 70 && nota <= 79):
            console.log("Nota: C");
            break;
        case (nota >= 60 && nota <= 69):
            console.log("Nota: D");
            break;
        case (nota >= 0 && nota <= 59):
            console.log("Nota: F");
            break;
        default:
            console.log("Nota inválida!")
}}