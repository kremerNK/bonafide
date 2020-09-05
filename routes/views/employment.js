var keystone = require('keystone');
var Application = keystone.list('Application')

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'contact';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.applicationSubmitted = false;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'contact';
	view.on('post', { action: 'contact'}, function(next) {
		var newApplication = new Application.model();
		var updater = newApplication.getUpdateHandler(req);
		console.log(req.body.locationsapplied);
		updater.process(req.body, {
			flashErrors: true,
			fields: 'namefirst, namelast, email, phone, \
			hoursavailable, role, locationsapplied, desiredpay, \
			startdate, skills',
			errorMessage: 'Problem with your application'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.detail

			} else {
				locals.applicationSubmitted = true;
			}
			next(); 
		}) 
		// console.log(updater);
	})
	// Render the view
	view.render('employment');
};
       