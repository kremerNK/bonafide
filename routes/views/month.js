var keystone = require('keystone');
var Post = keystone.list('Post')

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
    locals.data = {
        results:[]
    }
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'month';
	
    Post.model.find({}).sort('-dateCreated').exec(function(err, results) {
        var dates = []
        results.forEach(result => {
            if (result.formattedYear == req.params.year &&
                result.formattedMonth == req.params.month){
                locals.data.results.push(result)
            }
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
       


        view.query('postLimit5', Post.model.find({}).sort('-dateCreated').limit(5))
        if (locals.data.results.length > 0){
            view.render('month', {month:locals.data.results, dates:dateSet})
        } else {
            view.render('404', {month:locals.data.results, dates:dateSet})
        }
        
    })
};
    
   