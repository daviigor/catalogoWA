async function carregarForm(headers) {

    var url = "/api/categoria/";
    var todas_categorias = await buscarRegistros(url);
    $("#qtdeCategorias").text(1);


    var categoria = {};

    if (headers.id) {
        categoria = await getCategoria(headers.id);
    }

    $("#ckAtivo").prop("checked", categoria.ativo);
    $("#txtIdCategoria").val(categoria.idcategoria)
    $("#txtNome").val(categoria.nome)

    carregarCategoriasPai(categoria);
}

async function carregarCategoriasPai(categoria) {

    var url = "/api/categoria/";
    var todas_categorias = await buscarRegistros(url);

    $('#optCategoriaPai').append('<option value="0">Nenhuma</option>')

    todas_categorias.map(item => {
        $('#optCategoriaPai').append('<option value="' + item.idcategoria + '">' + item.nome + '</option>')
    });

    $("#optCategoriaPai").val(categoria.idcategoriapai).change();
}

async function inserirCategoriaEdicao() {

    var idCategoriaPai = $('#optCategoriaPai option:selected').val();
    idCategoriaPai = idCategoriaPai == undefined ? 0 : idCategoriaPai;

    var categoria = {
        nome: $("#txtNome").val(),
        idcategoriapai: parseInt(idCategoriaPai),
        ativo: $("#ckAtivo").is(":checked")
    }

    var url = "api/categoria/";


    if ($("#txtIdCategoria").val() != "") {
        categoria.idcategoria = parseInt($("#txtIdCategoria").val());

        var url = "api/categoria/";
        var retorno = await atualizarRegistro(categoria, url);
        alert(JSON.stringify(retorno));

        return retorno;
    }

    var retorno = await inserirRegistro(categoria, url);
    alert(JSON.stringify(retorno));

    return retorno;
}