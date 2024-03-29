/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
const stripe = require('stripe')('sk_test_51HU2DcIVvXQ3iOrWvO8PjTeAWhpijw1vWTyMCJ6LyG8JKeSpfL2YpcJOaYOlA4M3zcV5TSGVUKfVTJZOUlAENbqR00p6L3k482')

 

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api'),
};  
  
// Setup Route Bindings  
exports = module.exports = function (app) {

	// Views 
	app.get('/', routes.views.homepage);
	app.get('/menu', routes.views.menu);
	app.get('/shop', routes.views.shop);
	app.get('/product/:product', routes.views.product)
	app.get('/blog', routes.views.blog);
	app.get('/blog/:post', routes.views.blogPosts);
	app.all('/employment', routes.views.employment);
	app.get('/checkout', routes.views.checkout);
	app.all('/charge', routes.views.charge);
	
	app.all('/contact', routes.views.contact);
	app.get('/order-now', routes.views.ordernow);
	app.get('/pick-up', routes.views.pickup);
	app.get('/delivery', routes.views.delivery); 
	app.get('/cart', routes.views.cart);
	app.get('/:year', routes.views.year);
	app.get('/:year/:month', routes.views.month); 
 
	// app.get('/blog/:category?', routes.views.blog);
	// app.get('/blog/post/:post', routes.views.post);
	// app.all('/contact', routes.views.contact); 

	// COPY THE CODE FROM HERE...
	//File Upload Route
	app.all('/api/fileupload/contactforward', keystone.middleware.api, routes.api.applicationAPI.contactforward);
	app.all('/api/fileupload/mailforward', keystone.middleware.api, routes.api.applicationAPI.mailforward);
	app.get('/api/fileupload/list', keystone.middleware.api, routes.api.applicationAPI.list);
	app.get('/api/fileupload/:id', keystone.middleware.api, routes.api.applicationAPI.get);
	app.all('/api/fileupload/:id/update', keystone.middleware.api, routes.api.applicationAPI.update);
	app.all('/api/fileupload/create', keystone.middleware.api, routes.api.applicationAPI.create);
	app.get('/api/fileupload/:id/remove', keystone.middleware.api, routes.api.applicationAPI.remove);
	
	// ...TO HERE.

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

	 
	  

};
 

 