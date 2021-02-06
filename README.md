NOTA: A aplicação utiliza como servidor o aplicativo nodeJS. Antes de tudo certifique-se de que o projeto Catalogo API feito 
em Net Core esteja publicado em um servidor web e funcionando na mesma porta configurada aqui(CatalogoWA). Ou se necessário, 
modifique a porta no arquivo configuracoes.json no atributo porta:

{
    "configuracoes_cadastros": {
        "url_base": "http://localhost",
        "porta": "57403"
    }
}


Para funcionamento em produção seguir os passos abaixo:
 1 - Copiar todo o conteúdo do app CatalogoWA e colocar em uma pasta/diretório de preferência;
 
 2 - Executar o arquivo .bat _INSTALAR_SERVICO.js dentro da pasta do projeto. O mesmo se encarrega de criar um serviço do windows chamado de CatalogoTesteCitel.exe;
 
 3 - Caso o serviço CatalogoTesteCitel.exe não esteja iniciado, inicialize. É possivel verificar o aplicativo rodando no endereço configurado conforme a nota;
