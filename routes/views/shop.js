var keystone = require('keystone');
var Product = keystone.list('Product')


exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'products';
	
	// Product.model.find().exec(function(err, products){
	// 		if(err){
	// 			console.log('error');
	// 		}
	// 		locals.products = products
	// 		next(err)
	// 	})

	view.query('products', Product.model.find())
	

	// Render the view
	view.render('shop');
};
         