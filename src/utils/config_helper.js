var fs = require("fs");

var get = async function(filtro) {
    var jsonData = "";

    try {
        jsonData = fs.readFileSync("././configuracoes.json", "utf8");

        if (filtro) {
            return jsonData[filtro];
        }
    } catch (erro) {
        console.log("ERRO: " + JSON.stringify(erro))

    }

    return JSON.parse(jsonData);
}

var getUrl = async function(path) {
    var config = await get();
    var base_url = config.configuracoes_cadastros.url_base;
    var porta = config.configuracoes_cadastros.porta;
    var url_completa = base_url + ":" + porta + path;

    return url_completa;
}

var getConfiguracoesAmbiente = async function(path) {
    var config = await get();
    return config.configuracoes_ambiente;
}

module.exports = {
    get: get,
    getUrl: getUrl,
    getConfiguracoesAmbiente: getConfiguracoesAmbiente
}