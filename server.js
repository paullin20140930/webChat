/*const express = require('express')
const app = express()

app.set( 'view engine','ejs');

app.use( express.static('public'));
app.get('/',(req,res) =>{
	res.send('Hello world');
	
})

server = app.listen(3000);

const io = require('socket.io')(server);
io.on('connection', (socket)=>{
	console.log('New user connected');
})*/

var express = require('express');
var http = require('http');
var app = express();
var httpServer = http.createServer(app);
var bodyParser = require ( 'body-parser' );


var myLogStatement = function (req, res, next) {
	console .log( "Received" , req.method, "request for resource" , req.path,
	"from" , req.ip);
	next(); // callback to the middleware function
}
var messages = []

app.use(bodyParser.json());

app.use(myLogStatement);

app.post('/newMsg',function(req,res){
	messages.push(req.body.msg);
	res.send({
		newMessages: messages.slice(req.body.nextIdx),
		nextIdx: messages.length,
		isLastClient: true
	});
});


app.post('/',function(req,res){
	res.send({
		newMessages: messages.slice(req.body.nextIdx),
		nextIdx: messages.length,
		isLastClient: false
	});	
	
})

app.use( express.static('src'));


app.get('/newMsg',function(req,res){
	messages.push(req.body.msg);
	res.send({
		newMessages: messages.slice(req.body.nextIdx),
		nextIdx: messages.length,
		isLastClient: true
	});
});


/*app.use(bodyParser.json());
app.use( myLogStatement);
var messages = [];
app.post( '/newMsg' , function (req, res) {
	messages.push(req.body.msg);
	res.send({
	newMessages: messages.slice(req.body.nextIdx),
	nextIdx: messages.length,
	isLastClient: true
});*/


/*app.get('/', function(req, res){
	console.log("Recerved GET request for resource /");
	console.log('dirname:',__dirname);
	res.sendFile( 'index.html', {root: __dirname});	
});*/


httpServer.listen(3003, function(){
   console.log('Listening on port 3000');
});






