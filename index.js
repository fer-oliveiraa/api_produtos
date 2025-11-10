const express = require('express');
const app = express();
const port = 3000; 


app.use(express.json());


let produtos = [
    { id: 1, nome: "Notebook Gamer", preco: 5999.90 },
    { id: 2, nome: "Mouse Óptico", preco: 89.99 }
];


let proximoId = 3;


//Cadastrar um novo produto

app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body;

    
    if (!nome || preco === undefined) {
        return res.status(400).json({ message: "Nome e preço são obrigatórios." });
    }

    const novoProduto = {
        id: proximoId++,
        nome: nome,
        preco: preco
    };

    produtos.push(novoProduto);

  
    res.status(201).json(novoProduto);
});


//Listar todos os produtos

app.get('/produtos', (req, res) => {
    res.json(produtos);
});


//Buscar um produto específico

app.get('/produtos/:id', (req, res) => {
   
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        
        return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    res.json(produto);
});


//Atualizar todos os dados de um produto
 
app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, preco } = req.body;


    if (!nome || preco === undefined) {
        return res.status(400).json({ message: "Nome e preço são obrigatórios para atualização." });
    }

    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
    }

 
    const produtoAtualizado = {
        id: id,
        nome: nome,
        preco: preco
    };
    
    produtos[index] = produtoAtualizado;

    res.json(produtoAtualizado);
});


 //Atualizar parcialmente um produto

app.patch('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, preco } = req.body;

    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    
    if (nome !== undefined) {
        produto.nome = nome;
    }
    if (preco !== undefined) {
        produto.preco = preco;
    }

    res.json(produto);
});


//Excluir um produto

app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    
    produtos.splice(index, 1);

   
    res.status(204).send();
});



app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});