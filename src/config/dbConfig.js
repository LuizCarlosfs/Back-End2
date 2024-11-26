import { MongoClient} from 'mongodb';

export default async function conectarAoBanco(stringConexao) {
    let client;  

    try {
        client = new MongoClient(stringConexao);
        console.log('Conectando ao cluster do banco de dados...');
        await client.connect();
        console.log('Conectando ao MongoDB Atlas com sucesso!');
        //console.log("client=",client)
        return client;
    } catch(erro) {
        console.log('Falha na conexão com o banco!', erro);
        process.exit();
    }
}