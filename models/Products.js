var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Product Model
 * ==========
 */

var Product = new keystone.List('Product', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});
 
Product.add({
    title: { type: String, required: true },
    description1: { type: String},
    description2: { type: String,},
    originalprice: {type: String},
    price: { type: String},
    stock: { type: String},
    features: {type: Types.TextArray},
    image: { type: Types.CloudinaryImage },
    category: { type: Types.Select, options: 'Essential Oils, Bakery, \
    Collagen, Gift Card, Retail Products'},
    description: {type: Types.Markdown, wysiwyg: true, height: 300},
    test: {type: Types.Html, wysiwyg: true},
    dateCreated: { type: Types.Date, default:Date.now }
});

Product.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Product.defaultColumns = 'title';
Product.register();
 