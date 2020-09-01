var keystone = require('keystone');
var Post = keystone.list('Post')

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'blogPosts';
	
	
	view.render('blog');
};
    
 