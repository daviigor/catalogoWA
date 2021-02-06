//https = require('https');
const path = require('path');
var fs = require('fs');
var axios = require('axios');

var execute = async function(url, metodo, data) {
    try {
        // var data = JSON.stringify(JSON.parse(JSON.stringify(data).replace(/[\\]/g, '')));
        console.log(JSON.stringify('DATA-------------->' + JSON.stringify(data)))
        console.log('Metodo: ' + metodo)
        console.log('URL AJAX: ' + url)


        var config = {
            method: metodo,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        var retornoRequest = await axios(config);

        if (retornoRequest.data) {
            return await retornoRequest.data;
        }

        return await retornoRequest.error;
    } catch (err) {
        console.log("ERRO: " + err)
    }

}

module.exports = {
    execute: execute
}