var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});
 
Post.add({
    title: { type: String, required: true },
    author: { type: String, required: true, default:' '},
    content: { type: String},
    image: { type: Types.CloudinaryImage },
    category: { type: String, default:' '},
    // monthCreated: { type: Types.Select, options: 'January, February, March, April, May, \
    // June, July, August, September, October, November, December', 
    // default: new Date().toLocaleString('default', { month: 'long'})},
    // yearCreated: { type: String, default: new Date().getFullYear() },
    dateCreated: { type: Types.Date, default: Date.now}, 
    postHtml: {type: Types.Markdown, height: 200}
});
 
Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.schema.virtual('formattedDate').get(function(){
    return this._.dateCreated.format('MMMM YYYY');
})

Post.schema.virtual('formattedYear').get(function(){
    return this._.dateCreated.format('YYYY');
})

Post.schema.virtual('formattedMonth').get(function(){
    return this._.dateCreated.format('MMMM');
})

Post.defaultColumns = 'title';
Post.register();
  