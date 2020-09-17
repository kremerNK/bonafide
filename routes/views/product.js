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
        
        Product.model.find({category: result._doc.category})
        .limit(4)
        .exec()
        .then(function(results) {
            for (i=0; i < results.length; i++){
                // console.log(results[i]._doc.title, '*****');
                if (results[i]._doc.title == result._doc.title){
                    results.splice(i, 1)
                    
                } else {
                    // if (results.length > 3){
                    //     results.splice(Math.floor(Math.random() * 7), 1)
                    // }
                }
            }
            locals.related = results

        })
        if (result === null || err){
            view.render('404')
        } else {
            view.render('product')
        }

    }))
    
	// view.render('product');
};
      