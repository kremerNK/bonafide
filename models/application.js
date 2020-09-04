var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Application Model
 * =============
 */

 var Application = new keystone.List('Application', {
     nocreate: true,
     noedit: true,
 })

 Application.add({
    namefirst: { type: String },
    namelast: { type: String }, 
    email: {type: Types.Email },
    phone: { type: String},
    role: { type: String},
    hoursavailable: { type: String },
    desiredpay: { type: String}, 
    locationsapplied: { type: String},
    startdate: {type: String},
    skills: {type: String},
    // resume: {},
    createdAt: {type: Date, default: Date.now},


 })

 Application.defaultSort = '-createdAt';
 Application.defaultColumns = 'namefirst, namelast';
 Application.register();

