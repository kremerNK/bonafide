var keystone = require('keystone');
var Application = keystone.list('Application')

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'contact';
	locals.formData = req.body || {};

	locals.applicationSubmitted = false;
	console.log(req.body);

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'application';

	view.render('employment');
}


	// view.on('post', { action: 'application' }, function (next) {

	// 	req.body.role === undefined ? req.body.role = '' : null;
	// 	req.body.locationsapplied === undefined ? req.body.locationsapplied = '' : null;
	// 	var missingValues = []
	// 	for (const [key, value] of Object.entries(req.body)){
	// 		if (value ==''){
	// 			missingValues.push(key)
	// 		}
	// 	}
	// 	///make sure to check for file and change color also///

	// 	var newApplication = Application.model()
	// 	var updater = newApplication.getUpdateHandler(req)
	
	// 	updater.process(req.body, {
	// 		flashErrors: true,
	// 		fields: 'firstname, lastname, email, phone, role, hoursavailable, desiredpay,\
	// 		locationsapplied, startdate, coverletter', 
	// 		errorMessage: 'Problem with your application, please check highlighted fields',
	// 	}, function(err){
	// 		if(err){
	// 			console.log('fail');
	// 				for (i=0; i < missingValues.length; i++){
	// 					var key = missingValues[i]
	// 					err.detail[key] = {
	// 						type: 'required',
	// 						error: `${missingValues[i]} is required`,
	// 						detail: undefined, 
	// 						fieldLabel: `${missingValues[i]}`,
	// 						// fieldType: 'probably doesn't matter',
	// 					}
	// 				}
	// 			locals.validationErrors = err.detail
	// 			// console.log(locals.validationErrors, 'error');
	// 			// console.log(err, 'error');
				
	// 		} else {
	// 			console.log('success');
	// 			// locals.applicationSubmitted = true;
	// 	}
	// 	next()
	// 	// console.log(locals.validationErrors, 'validation_errors');
	// 	// if (req.files.resume !== undefined){
	// 	// 	updater.process(req.files.resume, {
	// 	// 	flashErrors: true,
	// 	// 	fields: 'resume',
	// 	// 	errorMessage: 'File upload problem',
	// 	// }, function(err){
	// 	// 	if (err){
	// 	// 		console.log('failed file upload');
	// 	// 	}	
	// 	// 	else {
	// 	// 		console.log('successful file upload');
	// 	// 		locals.applicationSubmitted = true;
	// 	// 	}
			
	// 	// 	})
			
	// 	// } else {
	// 	// 	console.log(locals.validationErrors, 'validation errors');
			

	// 	// }
		
	
	// })
	



	



	// var newApplication = new Application.model();
	// var updater = newApplication.getUpdateHandler(req);
	// updater.req.body.resume = addFile
	// console.log(updater.req.body);
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
	// 	})

	// 	var newApplication = new Application.model();
	// 	var updater = newApplication.getUpdateHandler(req);

	// 	updater.process(req.body, {
	// 		flashErrors: true,
	// 		fields: ['firstname', 'lastname', 'email', 'phone',
	// 			'role', 'hoursavailable', 'desiredpay', 'locationsapplied',
	// 			'startdate', 'coverletter', 'resume'],
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
	// })
	// Render the view



	// ATTEMPT #1ATTEMPT #1ATTEMPT #1ATTEMPT #1ATTEMPT #1

	// view.on('post', {
	//     action: 'application'
	// }, function(next) {
	//     var newApplication = new Application.model();
	//     var updater = newApplication.getUpdateHandler(req);

	//     updater.process(req.body, {
	//         flashErrors: true,
	//         fields: ['firstname', 'lastname', 'email', 'phone',
	//             'role', 'hoursavailable', 'desiredpay', 'locationsapplied',
	//             'startdate', 'coverletter', 'resume'
	//         ],
	//         errorMessage: 'Problem with your application, please check highlighted \
	// 		fields for invalid responses'
	//     }, function(err) {
	//         if (err) {
	//             locals.validationErrors = err.detail
	//         } else {

	//             locals.applicationSubmitted = true;
	//         }
	//         next();
	//     })
	// })

	// ATTEMPT #2 ATTEMPT #2 ATTEMPT #2 ATTEMPT #2 ATTEMPT #2
	// var newApplication = new Application.model()
	// var updater = newApplication.getUpdateHandler(req)
	// if (typeof req.files.resume === 'undefined'){
	// 	req.body.resume = ''
	// 	updater.process(req.body, {
	// 		flashErrors: true,
	// 		fields: ['firstname', 'lastname', 'email', 'phone',
	// 			'role', 'hoursavailable', 'desiredpay', 'locationsapplied',
	// 			'startdate', 'coverletter', 'resume'],

	// 		errorMessage: 'Problem with your application, please check highlighted \
	// 		fields for invalid responses'
	// 	}, function(err) {
	// 		if (err) { 
	// 			err.detail.resume = {
	// 				type: 'required',
	// 				error: 'Resume is required',
	// 				detail: undefined, 
	// 				fieldLabel: 'resume',
	// 				fieldType: 'file'
	// 			}
	// 			locals.validationErrors = err.detail
	// 		} else {
	// 			locals.validationErrors = {}
	// 			locals.validationErrors.resume = {
	// 				type: 'required',
	// 				error: 'Resume is required',
	// 				detail: undefined,
	// 				fieldLabel: 'resume',
	// 				fieldType: 'file'
	// 			}
	// 			locals.applicationSubmitted = false;
	// 		}
	// 		next();   
	// 	}) 
	// } else {
	// 	updater.process(req.files.resume, {
	// 		flashErrors: true,
	// 		fields: 'resume',
	// 		errorMessage: 'Upload Failed'
	// 	}, function(err) {
	// 		if (err){
	// 			locals.validationErrors = err.detail
	// 		} else {
	// 			locals.applicationSubmitted = true
	// 			updater.process(req.body, {
	// 				flashErrors: true,
	// 				fields: ['firstname', 'lastname', 'email', 'phone',
	// 				'role', 'hoursavailable', 'desiredpay', 'locationsapplied',
	// 				'startdate', 'coverletter'],
	// 				errorMessage: 'Upload Failed'
	// 			}, function(err){
	// 				if (err){
	// 					location.validationErrors = err.detail
	// 				} else {
	// 					locals.applicationSubmitted = true
	// 				}
	// 			})
	// 		}
	// 		next()
	// 	})	

	// }
	// })




	// var newApplication = new Application.model()
	// 	var updater = newApplication.getUpdateHandler(req)
	// 	console.log(req.body.files);

	// 	updater.process(req.body, {
	// 		flashErrors: true,
	// 		fields: ['firstname', 'lastname', 'email', 'phone',
	// 			'role', 'hoursavailable', 'desiredpay', 'locationsapplied',
	// 			'startdate', 'coverletter', 'resume'],
	// 		errorMeessage: 'Upload Failed'
	// 	}, function (err) {
	// 		if (err) {
	// 			locals.validationErrors = err.detail
	// 			console.log(locals.validationErrors);
	// 		} else {
	// 			console.log('upload success');
	// 			locals.fileSubmitted = true
	// 		}}
				
	// 	)
	// 	next()
	
	// });






// 	var testModel = new Application.model()
// 	var updater = testModel.getUpdateHandler(req)
// 	console.log(req.files.resume);

// 	updater.process(req.files, {
// 		flashErrors: true,
// 		files: req.files,
// 		fields: 'resume',
// 		errorMeessage: 'Upload Failed'
// 	}, function(err) {
// 		if (err){
// 			locals.validationErrors = err.detail
// 			console.log('upload fail');
// 			console.log(err);
// 		} else {
// 			console.log('upload success');
// 			locals.fileSubmitted = true
// 		}
// 	}
