var keystone = require('keystone');
var Types = keystone.Field.Types;

var Inquiry = new keystone.List('Inquiry')

Inquiry.add({
    firstname: {type: String},
    lastname: {type: String},
    email: {type: Types.Email, initial: false, required: true},
    phone: {type: String},
    message: {type: String,},
})

Inquiry.defaultSort = '';
Inquiry.defaultColumns = '_id, firstname';
Inquiry.register(); 