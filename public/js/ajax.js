async function request(metodo = "GET", pathName = window.location.pathname) {
    var retorno = await $.ajax({
        method: metodo,
        url: "api" + pathName
    });

    // .done(async function(dados) {
    //     var dados_formatados = await formatarDados(dados);
    //     carregarTabelaPrincipal(dados_formatados);
    // });
}