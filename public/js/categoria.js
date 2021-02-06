async function formatarDados(dados) {
    dados = JSON.parse(JSON.stringify(dados).toLowerCase());

    $("#qtdeCategorias").text(dados.length);

    var botao_editar = '<a href="/categoria_edit/?id={?}"><span class="btn btn-outline-primary"><i class="fa fa-pencil"></i></span></a>'
    var botao_deletar = '<span class="btn btn-outline-danger" onclick="deletarCategoria({?})"><i class="fa fa-times"></i></span>'
    var botao_ativo = '<span class="btn btn-outline-success" onclick="alterarCategoria({?}, 0, false)"><i class="fa fa-toggle-on"></i></span>'
    var botao_inativo = '<span class="btn btn-outline-danger" onclick="alterarCategoria({?}, 0, true)"><i class="fa fa-toggle-off"></i></span>'

    var itens_formatados = new Array();
    dados.map(function(row) {
        var item = {};

        var categoria_pai = { "nome": "" };

        if (row["idcategoriapai"] != 0) {
            categoria_pai = dados.find(element => element["idcategoria"] == row["idcategoriapai"]);
        }

        item.ID = row["idcategoria"];
        item.Nome = row["nome"];
        item["Categoria Superior"] = categoria_pai ? categoria_pai["nome"] : "";
        item.Ativo = row["ativo"] ? botao_ativo.replace("{?}", row["idcategoria"]) : botao_inativo.replace("{?}", row["idcategoria"]);
        item.Ações = botao_editar.replace("{?}", row["idcategoria"]) + botao_deletar.replace("{?}", row["idcategoria"]);

        itens_formatados.push(item);
    });

    return itens_formatados;
}

async function getCategoria(id) {
    var url = "api/categoria/Find/";
    var categoria = await buscarRegistroPorID(id, url)
    return categoria;
}

async function alterarCategoria(id = 0, categoria_alterar, status) {
    if (id != 0) {
        categoria_alterar = await getCategoria(id);
        categoria_alterar.ativo = status;
    }

    var url = "api/categoria/";
    var retorno = await atualizarRegistro(categoria_alterar, url);


    location.reload();
}

async function deletarCategoria(id) {
    var url = "api/categoria/Delete/";
    await deletarRegistro(id, url)
    location.reload();
}