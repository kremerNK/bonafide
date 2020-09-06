var keystone = require('keystone');
var Types = keystone.Field.Types;
const { LocalFileAdapter } = require('@keystonejs/file-adapters');

/**
 * Application Model
 * =============
 */

 var Application = new keystone.List('Application', {
     nocreate: true,
     noedit: true,
 })

 var fileAdapter = new LocalFileAdapter({
    src: './public/uploads/files'
    // path: keystone.expandPath('./public/uploads/files'),
    // publicPath: './public/uploads/files/'
    
 })


 Application.add({
    // firstname: { type: String, required: true },
    // lastname: { type: String, required: true }, 
    // email: {type: Types.Email, required: true },
    // phone: { type: String, required: true},
    // role: { type: Types.TextArray, required: true},
    // hoursavailable: { type: String, required: true },
    // desiredpay: { type: String, required: true}, 
    // locationsapplied: { type: Types.TextArray, required: true},
    // startdate: {type: String, required: true},
    // coverletter: {type: String, required: true},
    // resume: { type: File, storage: fileAdapter},
    createdAt: {type: Date, default: Date.now},


 })

 Application.defaultSort = '-createdAt';
 Application.defaultColumns = 'namefirst, namelast';
 Application.register();

 