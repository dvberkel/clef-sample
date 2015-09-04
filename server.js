var http = require('http');
var url = require('url');
var qs = require('querystring');

var app = require('./app.json');
var clef = require('clef').initialize({ 'appID': app.id, 'appSecret': app.secret });

var server = http.createServer(function(request, response){
    var url_data = url.parse(request.url);
    var query_data = qs.parse(url_data.query);
    console.log(query_data);

    clef.getLoginInformation({ code: query_data.code }, function(error, info){
        if (error) {
            response.statusCode = 500;
            response.end();
        }

        console.log(info);
        response.statusCode = 200;
        response.end();
    });
});

server.listen(80);
