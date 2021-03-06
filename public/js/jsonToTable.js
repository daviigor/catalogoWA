window.json2table = function(json, classes, id_table) {
    // "table table-hover table-responsive", "tabela"
    var cols = Object.keys(json[0]);

    var headerRow = '';
    var bodyRows = '';

    classes = classes || '';

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    cols.map(function(col) {
        headerRow += '<th>' + capitalizeFirstLetter(col) + '</th>';
    });


    json.map(function(row) {
        bodyRows += '<tr>';

        cols.map(function(colName) {
            bodyRows += '<td>' + row[colName] + '</td>';
        })

        bodyRows += '</tr>';
    });

    return '<table id="' + id_table + '" class="' +
        classes +
        '"><thead><tr>' +
        headerRow +
        '</tr></thead><tbody>' +
        bodyRows +
        '</tbody></table>';
}