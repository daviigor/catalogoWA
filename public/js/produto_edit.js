async function carregarForm(headers) {
    var url = "/api/categoria/";
    var todas_categorias = await buscarRegistros(url);

    var produto = {};

    if (headers.id) {
        produto = await getProduto(headers.id);
    }

    $("#ckAtivo").prop("checked", produto.ativo);
    $("#txtId").val(produto.idproduto);
    $("#txtNome").val(produto.nome);
    $("#txtEstoque").val(produto.estoque);
    $("#txtPreco").val(produto.preco);
    $("#txtImagemURL").val(produto.imagemurl);
    $("#txtDescricao").val(produto.descricao);

    var idCategoria = produto.idcategoria == null ? 0 : produto.idcategoria;
    carregarCategorias(idCategoria, todas_categorias);
}

async function carregarCategorias(id_categoria_produto, todas_categorias) {

    $('#optCategoria').append('<option value="0">Nenhuma</option>')

    todas_categorias.map(item => {
        $('#optCategoria').append('<option value="' + item.idcategoria + '">' + item.nome + '</option>')
    });

    $("#optCategoria").val(id_categoria_produto).change();

}

async function inserirProdutoEdicao() {

    var idCategoria = $('#optCategoria option:selected').val();
    idCategoria = (idCategoria == undefined ? 0 : idCategoria);

    var preco = $("#txtPreco").val();
    preco = parseFloat(String(preco).replace(",", "."));

    var produto = {
        ativo: $("#ckAtivo").is(":checked"),
        nome: $("#txtNome").val(),
        estoque: parseInt($("#txtEstoque").val()),
        preco: preco,
        imagemurl: $("#txtImagemURL").val(),
        descricao: $("#txtDescricao").val(),
    }

    if (idCategoria > 0) {
        produto.idcategoria = parseInt(idCategoria);
    }

    var url = "api/produto/";
    if ($("#txtId").val() != "") {

        produto.idproduto = parseInt($("#txtId").val());

        var retorno = await atualizarRegistro(produto, url);
        alert(JSON.stringify(retorno));

        window.location.href = "/produto";
        return;
    }


    var retorno = await inserirRegistro(produto, url);
    alert(JSON.stringify(retorno));

    // window.location.href = "/produto";
}