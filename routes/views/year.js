var keystone = require('keystone');
var Post = keystone.list('Post')

exports = module.exports = function (req, res) {
    console.log(req.params.year, 'year');
	var view = new keystone.View(req, res);
	var locals = res.locals;
    locals.data = {
        results:[]
    }
	// locals.section is used to set the currently selected
	// item in the header navigation.
    locals.section = 'year';
    testg = []
	view.on('init', function (next) {
        var q = Post.model.find({})
        q.exec(function (err, results) {
            results.forEach(result => {
                if (result.formattedYear == req.params.year){
                    testg.push(result)
                }
            })
            next(err)
            console.log(testg.length);
        })
        
    })
	
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
    view.render('year')
};
    
  