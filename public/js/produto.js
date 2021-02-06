async function formatarDados(dados) {
    dados = JSON.parse(JSON.stringify(dados).toLowerCase());
    $("#qtdeProdutos").text(dados.length);

    var categorias = await getCategorias();
    categorias = JSON.parse(JSON.stringify(categorias).toLowerCase());

    var botao_editar = '<a href="/produto_edit/?id={?}"><span class="btn btn-outline-primary"><i class="fa fa-pencil"></i></span></a>'
    var botao_deletar = '<span class="btn btn-outline-danger" onclick="deletarProduto({?})"><i class="fa fa-times"></i></span>'
    var botao_ativo = '<span class="btn btn-outline-success" onclick="alterarProduto({?}, 0, false)"><i class="fa fa-toggle-on"></i></span>'
    var botao_inativo = '<span class="btn btn-outline-danger" onclick="alterarProduto({?}, 0, true)"><i class="fa fa-toggle-off"></i></span>'

    var itens_formatados = new Array();
    dados.map(function(row) {
        var item = {};
        var categoria = categorias.find(element => element["idcategoria"] == row["idcategoria"]);

        if (categoria == undefined) {
            categoria = { nome: "" };
        }

        item.ID = row["idproduto"];
        item.Nome = row["nome"];
        item.Categoria = categoria["nome"];
        item.Ativo = row["ativo"] ? botao_ativo.replace("{?}", row["idproduto"]) : botao_inativo.replace("{?}", row["idproduto"]);

        item.Ações = botao_editar.replace("{?}", row["idproduto"]) + botao_deletar.replace("{?}", row["idproduto"]);

        itens_formatados.push(item);

    });

    return itens_formatados;
}

async function getCategorias() {
    var url = "/api/categoria/";
    var todas_categorias = await buscarRegistros(url);

    return todas_categorias;
}

async function getProduto(id) {
    var url = "api/produto/Find/";
    var produto = await buscarRegistroPorID(id, url);
    return produto;
}

async function alterarProduto(id = 0, produto_alterar, status) {

    if (produto_alterar == 0) {
        produto_alterar = {};
    }

    if (id != 0) {
        produto_alterar = await getProduto(id);
        produto_alterar.idproduto = id;
        produto_alterar.ativo = status;
    }

    var url = "api/produto/";
    var retorno = await atualizarRegistro(produto_alterar, url);

    location.reload();
}

async function deletarProduto(id) {
    var url = "api/produto/Delete/";
    await deletarRegistro(id, url)
    location.reload();
}