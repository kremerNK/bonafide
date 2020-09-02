var keystone = require('keystone');
var Post = keystone.list('Post')

exports = module.exports = function (req, res) {
	console.log(req.params.year, req.params.month, 'month');
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'month';
	
    
   
	// Post.model.find({}).sort('-dateCreated').exec(function(err, post) {
		
	// 	var dates = []
	// 	post.forEach(post => {
	// 		dates.push(post.formattedDate)
	// 	})
	// 	dates = [...new Set(dates)]
	// 	view.query('post', Post.model.find({}).sort('-dateCreated'))
	// 	view.query('postLimit5', Post.model.find({}).sort('-dateCreated').limit(5))
	// 	// Render the view
	// 	view.render('blog', {dates:dates});
    // })
    
    view.render('month')
};
    
   