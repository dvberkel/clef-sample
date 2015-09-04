var express = require('express');

var app = require('./app.json');
var clef = require('clef').initialize({ 'appID': app.id, 'appSecret': app.secret });

var app = express();

app.use('/public', express.static('static'));
app.get('/', function(request, response){
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

var server = app.listen(80, function(){
    console.log('listening on http://localhost');
});
