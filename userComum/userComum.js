const firebaseConfig = {
    apiKey: "AIzaSyDakfOgFCtkRgLmirEJOkE9f6iIx8y82vU",
    authDomain: "controleestoque-13c2c.firebaseapp.com",
    projectId: "controleestoque-13c2c",
    storageBucket: "controleestoque-13c2c.appspot.com",
    messagingSenderId: "349534800522",
    appId: "1:349534800522:web:7e1d28ecc508d59417bb73",
    measurementId: "G-Y9QJZ1BDB4"
};
const app = firebase.initializeApp(firebaseConfig);
const bd = app.firestore();
class Produto {
    constructor(nome, valor, tamanho, quantidade, consistencia, descricao){
        this.valor = valor
        this.nome= nome
        this.quantidade= quantidade
        this.consistencia = consistencia
        this.tamanho= tamanho
        this.descricao = descricao
    }
    getConsistencia(){
        return this.consistencia
    }
    getDescricao(){
        return this.descricao
    }
    getTamanho(){
        return this.tamanho
    }
    getQuantidade(){
        return this.quantidade
    }
    getNome(){
        return this.nome
    }
    getValor(){
        return this.valor
    }
    setValor(novoValor){
        this.valor= novoValor
    }
    setNome(novoNome){
        this.nome=novoNome
    }
    setQuantidade(novaQuantidade){
        this.quantidade = novaQuantidade
    }
    setTamanho(novoTamanho){
        this.tamanho= novoTamanho
    }
    setDescricao(novaDescricao){
        this.descricao= novaDescricao
    }
    mostrarDetalhes(){
       return 'Nome do produto: ' + this.getNome() + '\nPreço R$: ' + Number(this.getValor()).toFixed(2) + '\nQuantidade disponível: ' + this.getQuantidade() + '\nTamanho: ' +  Number(this.getTamanho()) + '\nDescrição: ' + this.getDescricao()
    }}
    class PordutoSolido extends Produto {
        constructor(nome, valor, tamanho, quantidade, consistencia, descricao){
            super (nome, valor, tamanho, quantidade, consistencia, descricao)
        }

    mostrarDetalhes(){
            return 'Nome do produto: ' + this.getNome() + '\nPreço R$: ' + Number(this.getValor()).toFixed(2) + '\nQuantidade disponível: ' + this.getQuantidade() + '\nTamanho: ' +  Number(this.getTamanho()) + ' g' + '\nDescrição: ' + this.getDescricao()
    }}

    class PordutoLiquido extends Produto {
        constructor(nome, valor, tamanho,quantidade, consistencia, descricao){
            super (nome, valor, tamanho, quantidade, consistencia, descricao)
        
        }
        mostrarDetalhes(){
            return 'Nome do produto: ' + this.getNome() + '\nPreço R$: ' + Number(this.getValor()).toFixed(2) + '\nQuantidade disponível: ' + this.getQuantidade() + '\nTamanho: ' +  Number(this.getTamanho()) + ' ml' + '\nDescrição do Produto: ' + this.getDescricao()
        }}
    function criarDivBotoes(){
        let divBotoes = document.createElement('div');
        divBotoes.classList.add('divBotoes');
        return divBotoes;
    }
    function mostrarDetalhesProduto(div, produto){
        let btdetalhes = document.createElement('button');
        btdetalhes.textContent = 'Detalhes do produto';
        btdetalhes.classList.add('btDetalhes');
        div.appendChild(btdetalhes);
        document.getElementById('produtosDisponiveis').appendChild(div);
        btdetalhes.addEventListener( 'click', ()=>{
            window.alert(produto.mostrarDetalhes())
        })}
        function redirecionar(div){
            let btCtt = document.createElement('button')
            btCtt.classList.add('ctt');
            div.appendChild(btCtt);
            document.getElementById('produtosDisponiveis').appendChild(div);
            btCtt.addEventListener( 'click', ()=>{
           window.location.href = 'https://w.app/YHxGV5'
        })}
    
    window.onload = function() { 
    bd.collection('produtos').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const dados = doc.data();
            let produto;
            if (dados.consistencia === 'solido') {
                produto = new PordutoSolido(dados.nomeProduto, dados.valor, dados.tamanho, dados.quantidade, dados.consistencia, dados.descricao);
            } else {
                produto = new PordutoLiquido(dados.nomeProduto, dados.valor, dados.tamanho, dados.quantidade, dados.consistencia, dados.descricao);
            }
            let divBotoes = criarDivBotoes()
            mostrarDetalhesProduto(divBotoes, produto);
            redirecionar(divBotoes);
            produto.id = doc.id;
            let divProduto = document.createElement('div');
            divProduto.textContent = produto.getNome();
            divProduto.classList.add('produtoItem');
            divProduto.appendChild(divBotoes)
            document.getElementById('produtosDisponiveis').appendChild(divProduto);
            
        });
    }).catch((error) => {
        window.alert('Não foi possível carregar os produtos diponivéis' + error);
    });
};
