
if (typeof window === 'undefined') {
  global.window = {}
}
var webpackIsomorphic = require('webpack-isomorphic');

// The base directory of your built files
webpackIsomorphic.install(__dirname + '/dist', {
	cache: process.env['NODE_ENV'] !== 'development'
});

//var server = require('./dist/server')

var path = require('path')
var Express = require('express')

const app = Express()
const port = process.env.PORT || 3000;

var staticRouter = Express.static( path.join(__dirname,'dist'));


const route = require('./src/common/route').getRouteConfig();

route.forEach((routeConfig)=>{
  app.use(routeConfig.path,staticRouter)
})

// This is fired every time the server side receives a request
// app.use(handleRender)

// // We are going to fill these out in the sections to follow
// function handleRender(req, res) {
//     var render = server.App.default;
//     render(req,res);
// }

app.listen(port)