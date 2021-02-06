var request = require('../utils/ajax_helper');
var configHelper = require('../utils/config_helper');

var execute = async function(metodo, dados, url) {
    var url_completa = await configHelper.getUrl(url);
    var response = await request.execute(url_completa, metodo, dados);
    return response;
}

module.exports = {
    execute: execute
}