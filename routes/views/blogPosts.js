var keystone = require('keystone');
var Post = keystone.list('Post')

exports = module.exports = function (req, res) {
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
        })

        q.exec(function (err, results) {
            locals.data.post = results;
            next(err)
            
        })
    }) 

    Post.model.find({}).sort('-dateCreated').exec(function(err, result) {
		
		var dates = []
		result.forEach(result => {
			dates.push({formatted: result.formattedDate, year: result.formattedYear,
                month: result.formattedMonth})
        })
        
        var dateSet = []
        var formattedDates = []
        for (i=0; i < dates.length; i++){
            if (dateSet.length == 0){
                dateSet.push(dates[i])
                formattedDates.push(dates[i].formatted)
            } else {  
                if (formattedDates.includes(dates[i].formatted)){
        
                } else {
 
                formattedDates.push(dates[i].formatted)
                dateSet.push(dates[i])
                }
            }
        }
        

		view.query('post', Post.model.find({}).sort('-dateCreated'))
		view.query('postLimit5', Post.model.find({}).sort('-dateCreated').limit(5))
		// Render the view
		view.render('blogPost', {dates:dateSet}); 
	})
    
    // Load other posts
 

    
	
};
    
   