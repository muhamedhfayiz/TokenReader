
var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var app = express();
var edge = require('edge-js');

var a;


var helloWorld = edge.func(function () {/*
    async (input) => { 
        return ".NET Welcomes " + input.ToString(); 
    }
*/});

helloWorld('JavaScript', function (error, result) {
    if (error) throw error;
    console.log(result);
});


var sayHello = edge.func({
    assemblyFile: path.join(__dirname, './TokenReaderLib.dll'),
    typeName: 'TokenReaderLib.TokenReader',
    methodName: 'GetToken'
})

sayHello('', function (err, result) {
    if (err) throw err
    this.a = result;
    console.log(result)
})

const port = process.env.PORT || 4100;


app.use(cors({ origin: '*' }));

//body-parser
app.use(bodyparser.json());

//static file
app.use(express.static(path.join(__dirname, 'public')));


//testing server
app.get('/v1', (req, res) => {

    var sayHello = edge.func({
        assemblyFile: path.join(__dirname, './TokenReaderLib.dll'),
        typeName: 'TokenReaderLib.TokenReader',
        methodName: 'GetToken'
    })

    sayHello('', function (err, result) {
        if (err) throw err
        this.a = result;
        res.send('hello api working perfect' + result);
    })

});

app.listen(port, () => {
    console.log('server start at port:' + port);
});

