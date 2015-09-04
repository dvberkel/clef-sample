var express = require('express');

var app = require('./app.json');
var clef = require('clef').initialize({ 'appID': app.id, 'appSecret': app.secret });

var app = express();


var default_user = {}
var user = default_user;

app.use(function(request, response, next){
    console.log('%s', request.url);
    next();
});
app.use('/', express.static('static'));
app.get('/user', function(request, response){
    response.json(user);
});
app.get('/login', function(request, response){
    clef.getLoginInformation({ code: request.query.code }, function(error, info){
        if (error) {
            user = default_user;
            response.redirect('/');
            return;
        }

        console.log(info);
        user = info;
        response.redirect('/');
    });
});

var server = app.listen(80, function(){
    console.log('listening on http://localhost');
});
