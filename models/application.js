var keystone = require('keystone');
var Types = keystone.Field.Types;
const { LocalFileAdapter } = require('@keystonejs/file-adapters');

/**
 * Application Model
 * =============
 */


 ///////////////MAY NEED TO JUST MODIFY THE NOEDIT FEATURE. IF DISABLED, PERHAPS SEQUENTIAL PROCESSING ENABLED
 var Application = new keystone.List('Application', {
     nocreate: true,
     noedit: true,
 })

var myStorage = new keystone.Storage({
   adapter: keystone.Storage.Adapters.FS,
   fs: {
     path: keystone.expandPath('./public/uploads/files'), // required; path where the files should be stored
     publicPath: '/public/uploads/files', // path where files will be served
   },
   isRequired: true
 });

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

    // firstname: { type: String},
    // lastname: { type: String}, 
    // email: {type: Types.Email},
    // phone: { type: String},
    // role: { type: Types.TextArray},
    // hoursavailable: { type: String},
    // desiredpay: { type: String}, 
    // locationsapplied: { type: Types.TextArray},
    // startdate: {type: String},
    // coverletter: {type: String},

    // resume: { type: Types.File, storage: myStorage, required: true},
    resume: {type: Types.File, storage: myStorage, required: true},
    createdAt: {type: Date, default: Date.now},


 })

 Application.defaultSort = '-createdAt';
 Application.defaultColumns = 'namefirst, namelast';
 Application.register();

 