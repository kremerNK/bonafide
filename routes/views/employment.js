var keystone = require('keystone');
var Application = keystone.list('Application')
var Upload = keystone.list('FileUpload')
var formidable = require('formidable')

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
	

	// console.log(testFile);
	

	view.on('post', { action: 'application'}, function(next) {
		var form = new formidable.IncomingForm()
		form.type = 'multipart'
		
		form.uploadDir = 'tmp'
		form.on('file', function(name, file) {
			console.log(name);
		})
		form.parse(req, function(err, fields, files) {
			if (err){
				console.log('error');
			}
			console.log('no error formidable');
		})
		// console.log(Object.keys(req));
		next()
	});

		// locals.testFile = []
		// var getFile = Upload.model.find({name: 'testfile'}).exec(function(err, file){
		// 	// console.log(file);
		// 	locals.testFile.push(file)
		// }).then( () => {
		// 	var addFile = locals.testFile[0][0]._doc.file
		// 	console.log(addFile);
		// 	// console.log(Object.keys(locals.testFile[0][0]));
			 
			
		// 	var newApplication = new Application.model();
		// 	var updater = newApplication.getUpdateHandler(req);
		// 	updater.req.body.resume = addFile
		// 	console.log(updater.req.body);
		// 	updater.process(req.body, {
		// 		flashErrors: true,
		// 		// fields: ['firstname', 'lastname', 'email', 'phone',
		// 		// 	'role', 'hoursavailable', 'desiredpay', 'locationsapplied',
		// 		// 	'startdate', 'coverletter'],
		// 		fields: 'resume',
		// 		errorMessage: 'Problem with your application, please check highlighted \
		// 		fields for invalid responses'
		// 	}, function(err) {
		// 		if (err) {
		// 			locals.validationErrors = err.detail
		// 		} else {
					
		// 			locals.applicationSubmitted = true;
		// 		}
		// 		next();   
		// 	}) 
		// 	})
  
		// var newApplication = new Application.model();
		// var updater = newApplication.getUpdateHandler(req);
		
		// updater.process(req.body, {
		// 	flashErrors: true,
		// 	// fields: ['firstname', 'lastname', 'email', 'phone',
		// 	// 	'role', 'hoursavailable', 'desiredpay', 'locationsapplied',
		// 	// 	'startdate', 'coverletter'],
		// 	fields: 'resume',
		// 	errorMessage: 'Problem with your application, please check highlighted \
		// 	fields for invalid responses'
		// }, function(err) {
		// 	if (err) {
		// 		locals.validationErrors = err.detail
		// 	} else {
				
		// 		locals.applicationSubmitted = true;
		// 	}
		// 	next();   
		// }) 
	// })
	// Render the view
	view.render('employment'); 
};
       