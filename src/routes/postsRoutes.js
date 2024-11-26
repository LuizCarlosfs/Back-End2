import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000", 
    optionsSuccessStatus: 200
}

// **Configuração do armazenamento de arquivos:**
// Essa configuração é específica para o Windows. No Mac, o multer se encarrega de criar a pasta automaticamente.
// A função `diskStorage` define onde os arquivos serão salvos e como serão nomeados.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Salva os arquivos na pasta 'uploads/'
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Mantém o nome original do arquivo
        cb(null, file.originalname);
    }
});

// **Criação do objeto de upload:**
// Essa configuração é para o Windows. Para Linux ou Mac, a configuração mais simples pode ser utilizada.
const upload = multer({ dest: "./uploads", storage });
// **Para Linux ou Mac:**
// const upload = multer({dest: "./uploads"})

// **Função para configurar as rotas:**
const routes = (app) => {
    // **Habilita o parsing de JSON:**
    // Permite que o Express entenda requisições com corpo em formato JSON.
    app.use(express.json()); 
    app.use(cors(corsOptions))

    // **Rota para listar todos os posts:**
    // Utiliza a função `listarPosts` do controlador para buscar e retornar todos os posts.
    app.get("/posts", listarPosts);

    // **Rota para criar um novo post:**
    // Utiliza a função `postarNovoPost` do controlador para criar um novo post.
    app.post("/posts", postarNovoPost);

    // **Rota para fazer upload de uma imagem:**
    // Utiliza o middleware `upload.single('imagem')` para processar o arquivo de imagem e o salva na pasta 'uploads'.
    // Em seguida, chama a função `uploadImagem` do controlador para realizar o processamento da imagem (salvar no banco de dados, gerar thumbnails, etc.).
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost)
};

export default routes;