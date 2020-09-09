/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Blog', key: 'blog', href: '/blog' },
		{ label: 'Gallery', key: 'gallery', href: '/gallery' },
		{ label: 'Contact', key: 'contact', href: '/contact' },
		 
	];
	res.locals.user = req.user;
	next();
};

 
/** 
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {

	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	}; 
	if (req.body.resume == ''){
		if (flashMessages.error.length > 0){
			// console.log(flashMessages.error[0].list, 'if flash');
			flashMessages.error[0].list.push('Resume is required')
		} else {
			flashMessages.error.push({
				title: 'Problem with your application, please check highlighted fields for \
				invalid responses',
				list: ['Resume is required']
			})
			// flashMessages.error.push('Resume is required')
		}
		// flashMessages.error[0].list.push('Resume is required')
		// console.log(flashMessages, 'flash message');
	}
	
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	// console.log(res.locals.messages, 'local.messages');
	next();
};

 
/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
 