var keystone = require('keystone');
var Product = keystone.list('Product')

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'product';

    // Product.model.find({slug: req.params.product}).exec(function(err, result){
    //     if (err || result.length === 0){
    //         view.render('404')
    //     } else {
    //         locals.product = result[0]._doc
    //         view.render('product')
    //     }
       
        
    // })
     
    view.query('product', Product.model.findOne({slug: req.params.product}, function(err, result){
        
        if (result === null || err){
            view.render('404')
        } else {
            view.render('product')
        }

    }))
    
	// view.render('product');
};
      