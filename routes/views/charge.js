var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'charge';
	
	view.on('post', function(next){
		console.log('charge post hit');
		try {
			stripe.customers
			  .create({
				name: 'test',
				email: 'test@yahoo.com',
				source: req.body.stripeToken
			  })
			  .then(customer =>
				stripe.charges.create({
				  amount: 10000,
				  currency: "usd",
				  customer: customer.id
				}) 
			  )
			  .then(() => view.render('charge'))
			  .catch(err => console.log(err));
		  } catch (err) {
			// res.send(err);
			view.render('charge')
		  }
		  next()
		  view.render('charge');
	})
    
	// Render the view
	
};
       