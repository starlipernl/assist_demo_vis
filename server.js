var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser')
// var dataRouter = require('./routes/dataRoutes');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const appEnv = cfenv.getAppEnv();
    
app.set('views', './views');      
app.set('view engine', 'ejs');

//serve static file (index.html, images, css)
// app.use(express.static(__dirname + '/views'));
app.use('/dataDay', require('./routes/dataDay'));
app.use('/dataMin', require('./routes/dataMin'));

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Data Summary'
    });
});


var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
