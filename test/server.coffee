
fs = require 'fs'
express = require 'express'

app = express.createServer express.logger()
app.set 'views', "#{__dirname}/views"
app.set 'view engine', 'jade'
app.use app.router
app.use express.errorHandler {dumpExceptions:true}
app.use require('connect-assets') src:"#{__dirname}/assets"


app.get '/widgets.js', (req, res, next) ->
  res.writeHead 200, {'Content-Type': 'text/javascript'}
  res.end fs.readFileSync "#{__dirname}/../lib/js-chart-widgets.min.js"


app.get '/', (req, res, next) ->
  res.render 'index'

app.listen process.env.PORT or 3000
