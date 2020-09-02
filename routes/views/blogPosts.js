var keystone = require('keystone');
var Post = keystone.list('Post')

exports = module.exports = function (req, res) {
    console.log(req.params);
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
    locals.section = 'blogPosts';
    locals.filters = {
        post: req.params.post,
    };
    locals.data = {
        posts: [],
    }
    
    // Load the current post
    view.on('init', function (next) {
        var q = keystone.list('Post').model.findOne({
            slug: locals.filters.post,
            // slug: 'blog-1',
        })

        q.exec(function (err, results) {
            // console.log(results);
            locals.data.post = results;
            next(err)
            
        })
    }) 

    Post.model.find({}).sort('-dateCreated').exec(function(err, post) {
		
		var dates = []
		post.forEach(post => {
			dates.push(post.formattedDate)
		})
		dates = [...new Set(dates)]
		view.query('post', Post.model.find({}).sort('-dateCreated'))
		view.query('postLimit5', Post.model.find({}).sort('-dateCreated').limit(5))
		// Render the view
		view.render('blogPost', {dates:dates}); 
	})
    
    // Load other posts
 

    
	
};
    
   