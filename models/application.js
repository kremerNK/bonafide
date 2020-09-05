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
    namefirst: { type: String, required: true },
    namelast: { type: String, required: true }, 
    email: {type: Types.Email, required: true },
    phone: { type: String, required: true},
    role: { type: Types.TextArray, required: true},
    hoursavailable: { type: String, required: true },
    desiredpay: { type: String, required: true}, 
    locationsapplied: { type: Types.TextArray, required: true},
    startdate: {type: String, required: true},
    skills: {type: String, required: true},
    // resume: {},
    createdAt: {type: Date, default: Date.now},


 })

 Application.defaultSort = '-createdAt';
 Application.defaultColumns = 'namefirst, namelast';
 Application.register();

