import express from "express";
import routes from "./src/routes/postsRoutes.js";


// Cria uma instância do Express
const app = express();
app.use(express.static("uploads"))
routes(app);

// Inicia o servidor na porta 3001
app.listen(3001, () => {
    console.log("Servidor escutando...");
}); 