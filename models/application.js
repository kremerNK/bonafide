var keystone = require('keystone');
var Types = keystone.Field.Types;
const { LocalFileAdapter } = require('@keystonejs/file-adapters');

/**
 * Application Model
 * =============
 */


 ///////////////MAY NEED TO JUST MODIFY THE NOEDIT FEATURE. IF DISABLED, PERHAPS SEQUENTIAL PROCESSING ENABLED
//  var Application = new keystone.List('Application', {
//      nocreate: true,
//      noedit: true,
//  })
 var Application = new keystone.List('Application')

var myStorage = new keystone.Storage({
   adapter: keystone.Storage.Adapters.FS,
   fs: {
     path: keystone.expandPath('./public/uploads/files'), // required; path where the files should be stored
     publicPath: '/public/uploads/files', // path where files will be served
   }
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

  // initial: false to possibly override an error. worth experimenting with
    // firstname: { type: String},
    firstname: { type: String, },
    lastname: { type: String, default:''}, 
    email: {type: Types.Email, },
    phone: { type: String, default:''},
    role: { type: Types.TextArray, default:''},
    hoursavailable: { type: String, default:''},
    desiredpay: { type: String, default:''}, 
    locationsapplied: { type: Types.TextArray, default:''},
    startdate: {type: String, default:''},
    coverletter: {type: String, default:''},

    // resume: { type: Types.File, storage: myStorage, required: true},
    // file: {type: Types.File, storage: myStorage},
    
    // add , filters: {file: 'file'}
    createdAt: {type: Date, default: Date.now},


 })
//relationships//
Application.relationship({ ref: 'FileUpload', path: 'File', refPath: 'application' });

 Application.defaultSort = '-createdAt';
 Application.defaultColumns = 'firstname, lastname, _id';
 Application.register();

 