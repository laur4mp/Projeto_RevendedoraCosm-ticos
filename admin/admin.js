

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
        }
    }
    class PordutoLiquido extends Produto {
        constructor(nome, valor, tamanho,quantidade, consistencia, descricao){
            super (nome, valor, tamanho, quantidade, consistencia, descricao)
        
        }
        mostrarDetalhes(){
            return 'Nome do produto: ' + this.getNome() + '\nPreço R$: ' + Number(this.getValor()).toFixed(2) + '\nQuantidade disponível: ' + this.getQuantidade() + '\nTamanho: ' +  Number(this.getTamanho()) + ' ml' + '\nDescrição do Produto: ' + this.getDescricao()
        }
    }

function aparecerAddproduto(){
    divNovoProduto.style.display = 'flex'
    divOpcoesIniciais.style.display = 'none'
}
function sairAddProdto(){
    divOpcoesIniciais.style.display = 'flex'
    divNovoProduto.style.display = 'none'
}

function addproduto() {
    let nomeInsirido = document.getElementById('nome').value;
    let precoInsirido = Number(document.getElementById('valor').value);
    let tamanhoInsirido = Number(document.getElementById('tamanho').value);
    let quantidadeInsirido = document.getElementById('quantidade').value;
    let consistenciaProduto = document.getElementById('consistencia').value;
    let descricaoProduto = document.getElementById('descricao').value;
    let produtoInsi = '';

    if (nomeInsirido && precoInsirido) { //funciona somente se estes campos estiverem preenchidos
        if (consistenciaProduto === 'solido') {
     produtoInsi = new PordutoSolido(nomeInsirido, precoInsirido, tamanhoInsirido, 
    quantidadeInsirido, consistenciaProduto, descricaoProduto);
        } else {
            produtoInsi = new PordutoLiquido(nomeInsirido, precoInsirido, tamanhoInsirido, 
    quantidadeInsirido, consistenciaProduto, descricaoProduto);
        }

        bd.collection('produtos').add({   //adiciona o produto ao Firestore
            nomeProduto: produtoInsi.getNome(),
            valor: produtoInsi.getValor(),
            tamanho: produtoInsi.getTamanho(),
            quantidade: produtoInsi.getQuantidade(),
            consistencia: produtoInsi.getConsistencia(),
            descricao: produtoInsi.getDescricao()
        }).then((docRef) => {
            console.log('Produto adicionado');
            produtoInsi.id = docRef.id; // id do Firestore no produto
            let li = document.createElement('li');
            li.textContent = produtoInsi.getNome();
            lista.appendChild(li);
            deletarProduto(li, produtoInsi);
            editarProduto(li, produtoInsi);
            exibirDetalhesProduto(li, produtoInsi);
        }).catch((error) => {
            console.error('Erro ao adicionar produto:', error);
        });
    } else {
        window.alert('Preencha ao menos os campos: Nome do produto e Preço de revenda para adicionar um novo produto!');
    }
}

function exibirDetalhesProduto(listali, produto){
    let detalhesBtn = document.createElement('button');
    detalhesBtn.classList.add('opcoesProdutoLi');
    detalhesBtn.textContent = 'Ver Detalhes';
    listali.appendChild(detalhesBtn);
    lista.appendChild(listali);
    detalhesBtn.addEventListener('click', () => {
    alert(produto.mostrarDetalhes());})
}

function deletarProduto(listali, produto) {
        let deletarBtn = document.createElement('button');
        deletarBtn.classList.add('opcoesProdutoLi');
        deletarBtn.id = 'deletar';
        deletarBtn.textContent = 'Deletar';
        listali.appendChild(deletarBtn);
        lista.appendChild(listali);
        deletarBtn.addEventListener('click', () => {
            if (confirm('Deseja remover ' + produto.getNome() + ' da lista de produtos disponíveis?')) {
                bd.collection('produtos').doc(produto.id).delete().then(() => { //deleta produto do banco de dados
                    lista.removeChild(listali);
                    alert('Produto removido com sucesso');
                }).catch((error) => {
                    console.error('Erro ao remover produto:', error);
                });
            }
        });
    }
 function editarProduto(listali, produto) {
    let editar = document.createElement('button');
    editar.classList.add('opcoesProdutoLi');
    editar.textContent = 'Editar';
    listali.appendChild(editar);
    lista.appendChild(listali);
    editar.addEventListener('click', () => {
    let detalhesDiv = document.createElement('div');
    detalhesDiv.innerHTML = `
        <p>Nome do produto: <input type="text" value="${produto.getNome()}"></p>
        <p>Preço R$: <input type="number" value="${produto.getValor()}"></p>
        <p>Quantidade disponível: <input type="number" value="${produto.getQuantidade()}"></p>
        <p>Tamanho: <input type="number" value="${produto.getTamanho()}"> ${produto.getConsistencia() === 'solido' ? 'g' : 'ml'}</p>
        <p>Descrição: <input type="text" value="${produto.getDescricao()}"></p>`;
    listali.appendChild(detalhesDiv);
    let editarBtn = document.createElement('button');      
    editarBtn.textContent = 'Confirmar Alterações';  
    editarBtn.classList.add('opcoesEditar');  
    listali.appendChild(editarBtn);
    let cancelarBtn = document.createElement('button');
    cancelarBtn.textContent = 'Cancelar';
    cancelarBtn.classList.add('opcoesEditar');
    listali.appendChild(cancelarBtn);
    cancelarBtn.addEventListener('click', () => {
        detalhesDiv.remove();
        editarBtn.remove();
        cancelarBtn.remove(); });

    editarBtn.addEventListener('click', () => { //editar produto
    let inputs = detalhesDiv.querySelectorAll('input');
    produto.setNome(inputs[0].value);
    produto.setValor(Number(inputs[1].value));
    produto.setQuantidade(Number(inputs[2].value));
    produto.setTamanho(Number(inputs[3].value));
    produto.setDescricao(inputs[4].value);
    bd.collection('produtos').doc(produto.id).update({ //editar no firestore
    nomeProduto: produto.getNome(),
    valor: produto.getValor(),
    tamanho: produto.getTamanho(),
    quantidade: produto.getQuantidade(),
    consistencia: produto.getConsistencia(),
    descricao: produto.getDescricao(),
    }).then(() => {
        listali.childNodes[0].textContent = produto.getNome();
        detalhesDiv.remove();//remove oq foi para o usuário insirir o produto
        editarBtn.remove();
        cancelarBtn.remove();
        alert('Produto atualizado com sucesso');
    }).catch((error) => {
        console.error('Erro ao atualizar produto:', error);
    });
    });
    });
}

function recuperarProdutos () { //carregar produtos dísponiveis 
    bd.collection('produtos').get().then((querySnapshot) => { //receber atualização em tempo real do banco de dados
    querySnapshot.forEach((doc) => {
    const dados = doc.data();
    let produto;
    if (dados.consistencia === 'solido') {
        produto = new PordutoSolido(dados.nomeProduto, dados.valor, dados.tamanho, dados.quantidade, dados.consistencia, dados.descricao);}
        
    else {
        produto = new PordutoLiquido(dados.nomeProduto, dados.valor, dados.tamanho, dados.quantidade, dados.consistencia, dados.descricao);
        }
        produto.id = doc.id;
        let li = document.createElement('li');
        li.textContent = produto.getNome();
        lista.appendChild(li);
        deletarProduto(li, produto);
        editarProduto(li, produto);
        exibirDetalhesProduto(li, produto);
    });
    }).catch((error) => {
        window.alert('Não foi possível carregar os produtos diponivéis');
    });};

let lista = document.getElementById('listaProdutos')  
let divOpcoesIniciais = document.getElementById('opcoes')
let divNovoProduto = document.getElementById('novoProduto')
window.onload = () => {
    recuperarProdutos();
};