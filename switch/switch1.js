const prompt = require("prompt-sync")();

let generoFilme = prompt("Digite o genero do filme escolhido: ")

switch (generoFilme) {
    case 'Ação':
        console.log("Sala 1");
        break;
    case 'Comédia':
        console.log("Sala 2");
        break;
    case 'Terror':
        console.log("Sala 3");
        break;
    case 'Animação':
        console.log("Sala 4")
    default:
        console.log("Gênero não encontrado. Verifique as opções válidas.");
}