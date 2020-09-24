var keystone = require('keystone');
const stripe = require('stripe')('sk_test_51HU2DcIVvXQ3iOrWvO8PjTeAWhpijw1vWTyMCJ6LyG8JKeSpfL2YpcJOaYOlA4M3zcV5TSGVUKfVTJZOUlAENbqR00p6L3k482')


exports = module.exports = async function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'charge';


	console.log('charge');
	const token = await stripe.tokens.create({
		card: {
		  number: '4242424242424242',
		  exp_month: 9,
		  exp_year: 2021,
		  cvc: '314',
		},
	  });
	console.log(token);
	req.body.stripeToken = token.id
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
		view.render('cart')
	  }

	// view.render('charge');


	// Render the view

};
