const express = require('express');
const app = express();
const path = require('path');
// const router = express.Router();
var bodyParser = require('body-parser');
var apiBLL = require('./src/api/apiBLL')

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(ignoreFavicon);

app.use(async function(req, res, next) {
    // console.log("RECEBIDO: " + JSON.stringify(req.query) + " em " + new Date().toLocaleString())
    // console.log("URL: " + req.originalUrl)

    var original_url = (req.originalUrl);
    var isEdicao = (original_url.indexOf("_edit") > -1);
    var isAPI = (req.originalUrl.indexOf("/api/") > -1);
    var isComParametros = (original_url.indexOf("/?") > -1);
    var isRotaInicial = (req.originalUrl == "/");

    if (isAPI) {
        if (isEdicao) {
            var strRotaReplace = ("/" + original_url.split("/")[1]);
            original_url = original_url.replace(strRotaReplace, "");
        }

        var retorno = await apiBLL.execute(req.method, req.body, original_url);

        res.send(retorno);
        return;
    }

    if (isRotaInicial) {
        res.redirect("/categoria");
        return;
    }

    if (isComParametros) {
        original_url = req.originalUrl.split("/?")[0];
        res.set(req.query);
    }

    var rota = path.join(__dirname + '/public/view' + original_url + ".html");

    try {
        res.sendFile(rota);
    } catch (erro) {
        console.log("ERRO: " + erro)
    }
});

function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).json({ nope: true });
    } else {
        next();
    }
}

//add the router
// app.use('/', router);
app.listen(process.env.port || 3001);

console.log('Running at Port 3001');

/*
app.use(express.staticProvider(__dirname + '/public'));

*/