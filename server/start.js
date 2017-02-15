var chalk = require('chalk')
var express = require('express')
var path = require('path')

var app = express()
var port = (process.env.PORT || 3000)

app.use(express.static(path.join(__dirname, './dist')));

var startServer = function() {
	app.listen(port, function() {
		console.log(chalk.green('Server locked in at port ' + port.toString()))
	  app.get('/*', function(req, res){
	  	res.sendFile('index.html', { root: __dirname })
	  })
	})
}

startServer()