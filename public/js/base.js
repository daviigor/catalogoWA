// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
    if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
        overlayBg.style.display = "none";
    } else {
        mySidebar.style.display = 'block';
        overlayBg.style.display = "block";
    }
}

// Close the sidebar with the close button
function w3_close() {
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
}


//CARREGA AO INCIAR TODA PAGINA ESTÁ LINKADO A BASE JS
$(async function() {
    $("#partial-sidebar").load("../view_partials/sidebar.html");
    $("#partial-menu-topo").load("../view_partials/menu_topo.html");
    $("#container_tabela").hide().slideDown("slow");

    var pathName = window.location.pathname;
    var isEdicao = (pathName.indexOf("_edit") > -1);

    if (isEdicao) {
        // pathName = pathName.replace("_edit", "");
        var headers = getHeaders();
        carregarForm(headers);

        return;
    }

    var url = "api" + pathName;
    var dados = await buscarRegistros(url);

    var dados_formatados = await formatarDados(dados);
    await carregarTabelaPrincipal(dados_formatados);
});


//CARREGADO EM TODA PAGINA QUE NÃO SEJA DE EDIÇÃO PARA OBTER OS OBJETOS PREENCHIDOS DO BANCO
function carregarTabelaPrincipal(dados) {
    var html_tabela = json2table(dados, "table table-hover table-responsive", "tabela");
    $("#container_tabela").html(html_tabela);
}

//MODELA OS DADOS DO HEADER EM JSON
function getHeaders() {
    function parseHttpHeaders(httpHeaders) {
        return httpHeaders.split("\r\n")
            .map(x => x.split(/: */, 2))
            .filter(x => x[0])
            .reduce((ac, x) => { ac[x[0]] = x[1]; return ac; }, {});
    }

    var req = new XMLHttpRequest();
    req.open('GET', document.location, false);
    req.send(null);
    var headers = parseHttpHeaders(req.getAllResponseHeaders());
    return headers;
}

async function inserirRegistro(objeto, url) {

    var retorno = await $.ajax({
        method: "POST",
        url: url,
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(objeto)
    });

    return retorno;
}

async function atualizarRegistro(objeto, url) {
    var retorno = await $.ajax({
        method: "PUT",
        url: url,
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(objeto)
    });

    return retorno;
}

async function deletarRegistro(id, url) {
    var retorno = await $.ajax({
        method: "DELETE",
        url: url + id,
        contentType: "application/json;charset=utf-8"
    });

    return JSON.parse(JSON.stringify(retorno).toLowerCase());;
}

async function buscarRegistros(url) {
    var dados = await $.ajax({
        method: "GET",
        url: url
    });

    return JSON.parse(JSON.stringify(dados).toLowerCase());;
}

async function buscarRegistroPorID(id, url) {
    var retorno = await $.ajax({
        method: "GET",
        url: url + id
    });
    retorno = JSON.parse(JSON.stringify(retorno).toLowerCase());

    return retorno;
}