var keystone = require('keystone');
const { mailforward } = require('../api/applicationAPI');
const { contactforward } = require('../api/applicationAPI')
var Inquiry = keystone.list('Inquiry')
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'contact';
	locals.fileSubmitted = false
	locals.formData = req.body || {}
	locals.validationErrors = {};
	locals.inquirySubmitted = false;

	view.on('post', { action: 'submit'}, function(next){
		console.log(locals.formData);
		var newInquiry = new Inquiry.model()
		var updater = newInquiry.getUpdateHandler(req)

		updater.process(req.body, {
			flashErrors: true,
			fields: 'firstname, lastname, email, phone, message', 
			errorMessage: 'There was a problem submitting your enquiry',
		}, function(err){
			if (err) {
				console.log(err);

				locals.validationErrors = err.detail
			} else {
				console.log('success');
				locals.inquirySubmitted = true
				contactforward(newInquiry)
			}
			next()
		})
		
	})
	
	// Render the view
	view.render('contact');
};
	
  


// //original contact.js file below///

// var keystone = require('keystone');
// var Enquiry = keystone.list('Enquiry');

// exports = module.exports = function (req, res) {

// 	var view = new keystone.View(req, res);
// 	var locals = res.locals;

// 	// Set locals
// 	locals.section = 'contact';
// 	locals.formData = req.body || {};
// 	locals.validationErrors = {};
// 	locals.enquirySubmitted = false;

// 	// On POST requests, add the Enquiry item to the database
// 	view.on('post', { action: 'contact' }, function (next) {

// 		var newEnquiry = new Enquiry.model();
// 		var updater = newEnquiry.getUpdateHandler(req);

// 		updater.process(req.body, {
// 			flashErrors: true,
// 			fields: 'name, email, phone, enquiryType, message',
// 			errorMessage: 'There was a problem submitting your enquiry:',
// 		}, function (err) {
// 			if (err) {
// 				locals.validationErrors = err.errors;
// 			} else {
// 				locals.enquirySubmitted = true;
// 			}
// 			next(); 
// 		});
// 	});

// 	view.render('contact');
// };
