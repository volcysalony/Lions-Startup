import express from 'express';

const router = express();
const port = 3000;

router.get(("/"), (req, res) => {
    res.send("Hello! My name's Volcy, Lions Dev student.")
});

router.listen((port), () => {
    console.log("Servidor executando na porta: " + port);
})