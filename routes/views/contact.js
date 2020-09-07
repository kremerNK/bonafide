var keystone = require('keystone');
var FileUpload = keystone.list('FileUpload')
var mime = require('mime')

exports = module.exports = function async (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'contact';
	locals.fileSubmitted = false
	locals.validationErrors = {};

	const filename = 'peppermint-eo.jpg';
    const file = '/public/uploads/files/${filename}';
    const mimetype = mime.getType(file); // yarn add mime // installed already with keystonejs
    const createReadStream = () => fs.createReadStream(file);
    const encoding = 'utf-8'
	const image = { createReadStream, filename, mimetype, encoding };



	// view.on('post', { action: 'submit'}, function(next){
	// 	console.log(req.body);

	// 	var newFile = new FileUpload.model();
	// 	var updater = newFile.getUpdateHandler(req);

	// 	updater.process(req.body, {
	// 		flashErrors: true,
	// 		fields: 'file', 
	// 		errorMessage: 'Upload failed'
	// 	}, function(err){
	// 		if (err){
	// 			locals.validationErrors = err.detail
	// 			console.log('upload fail');
	// 			console.log(err);
	// 		} else {
	// 			console.log('upload success');
	// 			locals.fileSubmitted = true
	// 		}
	// 	})

	// 	next()
	// })

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
