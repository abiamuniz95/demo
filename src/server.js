//inicializar o servidor

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors()); // Permitir requisições de qualquer origem
app.use(bodyParser.json()); // Permitir envio de JSON
app.use(express.static("public")); // Servir arquivos estáticos

app.use("/", routes); // Importar e usar as rotas

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
