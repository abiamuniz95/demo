//introduzir as rotas (/save /execute...)

const express = require("express");
const router = express.Router();
const verifyJwt = require("jwt.js"); // Importando a validação JWT

//Rota de Configuração (Obrigatória)
router.get("/config.json", (req, res) => {
    res.json({
        workflowApiVersion: "1.1",
        metaData: {
            icon: "https://example.com/icon.png",
            category: "message"
        },
        type: "REST",
        lang: {
            "en-US": {
                name: "Minha Custom Activity",
                description: "Descrição da atividade"
            }
        },
        arguments: {
            executionMode: "async",
            execute: {
                inArguments: [],
                outArguments: [],
                url: "https://seu-servidor.com/execute"
            }
        }
    });
});

//Rota de Validação (Chamado ao adicionar a atividade no Journey Builder)
router.post("/validate", verifyJwt, (req, res) => {
    console.log("Validando atividade:", req.body);
    res.status(200).json({ status: "Success", message: "Atividade validada com sucesso" });
});

//Rota de Salvamento (Chamado ao clicar em 'Salvar' na configuração)
router.post("/save", verifyJwt, (req, res) => {
    console.log("Salvando atividade:", req.body);
    res.status(200).json({ status: "Success", message: "Atividade salva com sucesso" });
});

//Rota de Publicação (Chamado ao ativar a jornada)
router.post("/publish", verifyJwt, (req, res) => {
    console.log("Publicando atividade:", req.body);
    res.status(200).json({ status: "Success", message: "Atividade publicada" });
});

//Rota de Execução (Chamado quando a atividade é executada no Journey Builder)
router.post("/execute", verifyJwt, (req, res) => {
    console.log("Executando atividade:", req.body);

    const inArguments = req.body?.arguments?.execute?.inArguments || [];
    /*const selectedOption = inArguments[0]?.selectedOption || "Nenhuma opção";
    const valorTeste = inArguments[0]?.valorTeste || "Nenhuma valor de teste foi devolvido";
    const contactKey = inArguments[0]?.contactKey || "Sem ContactKey";

    console.log("Opção escolhida:", selectedOption);
    console.log("valor teste: ", valorTeste);
    console.log("contactKey: ", contactKey);*/
    console.log("inArguments: " + inArguments);

    res.status(200).json({ status: "Success", message: "Custom Activity executada", selectedOption });
});

//Rota de Parada (Chamado ao pausar a jornada)
router.post("/stop", verifyJwt, (req, res) => {
    console.log("Parando atividade:", req.body);
    res.status(200).json({ status: "Success", message: "Atividade pausada" });
});

//Rota de Despublicação (Chamado ao desativar a jornada)
router.post("/unpublish", verifyJwt, (req, res) => {
    console.log("Despublicando atividade:", req.body);
    res.status(200).json({ status: "Success", message: "Atividade despublicada" });
});

module.exports = router;
