const prompt = require('prompt-sync')()

let listaAlunos = ['Joao', 'Pedro']

let novo = prompt('Escreve o nome do Aluno: ')

listaAlunos.push(novo)

if(listaAlunos.length == 3){
    console.log(`Turma formada com sucesso! Alunos: ${listaAlunos}`)
}