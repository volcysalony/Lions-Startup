import estudantes from "../dados/estudantes.js";

let proximoId = 1;

// CRIAR ESTUDANTE
export function criarEstudante(req, res) {

    const { nome, matricula, curso, ano } = req.body;

    // validação
    if (!nome || !matricula || !curso || !ano) {
        return res.status(400).send({
            message: "Todos os campos são obrigatórios."
        });
    }

    const novoEstudante = {
        id: proximoId,
        nome,
        matricula,
        curso,
        ano
    };

    proximoId++;

    estudantes.push(novoEstudante);

    res.status(201).send(novoEstudante);

}

// LISTAR TODOS
export function listarEstudantes(req, res) {

    res.status(200).send(estudantes);

}

// ATUALIZAR ESTUDANTE
export function atualizarEstudante(req, res) {

    const id = parseInt(req.params.id);

    const { nome, matricula, curso, ano } = req.body;

    const estudante = estudantes.find(
        (estudante) => estudante.id === id
    );

    // verificar se existe
    if (!estudante) {
        return res.status(404).send({
            message: "Estudante não encontrado."
        });
    }

    // atualizar apenas campos enviados
    estudante.nome = nome || estudante.nome;

    estudante.matricula = matricula || estudante.matricula;

    estudante.curso = curso || estudante.curso;

    estudante.ano = ano || estudante.ano;

    res.status(200).send({
        message: "Estudante atualizado com sucesso!",
        estudante
    });

}

// DELETAR ESTUDANTE
export function deletarEstudante(req, res) {

    const id = parseInt(req.params.id);

    const indiceEstudante = estudantes.findIndex(
        (estudante) => estudante.id === id
    );

    // verificar se existe
    if (indiceEstudante === -1) {
        return res.status(404).send({
            message: "Estudante não encontrado."
        });
    }

    // remover do array
    estudantes.splice(indiceEstudante, 1);

    res.status(200).send({
        message: "Estudante removido com sucesso!"
    });

}

// BUSCAR ESTUDANTES
export function buscarEstudantes(req, res) {

    const { nome, matricula, curso } = req.query;

    let resultados = estudantes;

    // filtro por nome
    if (nome) {
        resultados = resultados.filter((estudante) =>
            estudante.nome
                .toLowerCase()
                .includes(nome.toLowerCase())
        );
    }

    // filtro por matrícula
    if (matricula) {
        resultados = resultados.filter((estudante) =>
            estudante.matricula.includes(matricula)
        );
    }

    // filtro por curso
    if (curso) {
        resultados = resultados.filter((estudante) =>
            estudante.curso
                .toLowerCase()
                .includes(curso.toLowerCase())
        );
    }

    res.status(200).send(resultados);

}