
fs = require 'fs'
closure_compiler = require 'closure-compiler'
coffee_script = require 'coffee-script'


read = (path) ->
  fs.readFileSync("#{__dirname}/#{path}").toString()


task 'build', () ->
  js = [
    read "src/vendor/moof.js"
    coffee_script.compile read("src/calendar.coffee"), bare:true
    coffee_script.compile read("src/widgets.coffee"), bare:true
  ].join "\n\n"
  js = "(function(){\n#{js}\n})();"
  opt = {compilation_level: 'SIMPLE_OPTIMIZATIONS'}
  closure_compiler.compile js, opt, (e, js) ->
    throw e if e
    fs.writeFileSync "#{__dirname}/lib/js-chart-widgets.min.js", js


task 'test', () ->
  throw new Error "TODO"
