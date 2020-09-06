var keystone = require('keystone');
var Application = keystone.list('Application')
// var Storage = keystone.list('Storage')

exports = module.exports = function (req, res) {
	// console.log(Storage);

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'contact';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.applicationSubmitted = false;


	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'application';

	view.on('post', { action: 'application'}, function(next) {
		console.log(req.body);
		var newApplication = new Application.model();
		var updater = newApplication.getUpdateHandler(req);
		updater.process(req.body, {
			flashErrors: true,
			// fields: ['firstname', 'lastname', 'email', 'phone',
			// 	'role', 'hoursavailable', 'desiredpay', 'locationsapplied',
			// 	'startdate', 'coverletter'],
			fields: 'resume',
			errorMessage: 'Problem with your application, please check highlighted \
			fields for invalid responses'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.detail
			} else {
				
				locals.applicationSubmitted = true;
			}
			next(); 
		}) 
	})
	// Render the view
	view.render('employment'); 
};
       