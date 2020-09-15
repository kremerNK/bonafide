var async = require('async'),
keystone = require('keystone');
const { application } = require('express');
var exec = require('child_process').exec;
var nodemailer = require('nodemailer');
const list = require('keystone/lib/core/list');
var FileData = keystone.list('FileUpload');
var Application = keystone.list('Application')
var fs = require('fs')

exports.contactforward = async function(req, res){ 

  var formData = req._doc
  var transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'kremer55550@gmail.com',
      pass: '/kremer51'
    }
  });
 
  var mailOptions = {
    from: 'test2@gmail.com',
    to: 'kremer55550@gmail.com',
    subject: 'new test',
    html: `<p><b>Name:</b> ${formData.firstname} ${formData.lastname}</p> \
    <br> \
    <p><b>Email:</b> ${formData.email}</p> \
    <br>
    <p><b>Phone:</b> ${formData.phone} </p> \
    <br> \
    <p><b>Message:</b> ${formData.message}</p> \
    <br>
    `, 
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.apiResponse({fail: 'Mail not sent'})
    } else {
      console.log('email sent: ' + info.response);
      res.apiResponse({success: 'Application submitted'})
    }
  })
}

exports.mailforward = async function(req, res) {
  console.log(req);
  console.log(res);
  ////need to add res to stop this from sticking and resending the email//
  ///get file///
  var getFile = new Promise((resolve, reject) => {
    FileData.model.findById(req.query._id).exec(function(err, item){
      if (err) return res.apiError('database error', err);
      if (!item) return res.apiError('not found');
      
      resolve(item)
  }) 
  })
  getFile
  .then((getFile) => {
    ////get application
    var getApp = new Promise((resolve, reject) => {
      Application.model.findById(req.query.application).exec(function(err, item){
        if (err) return res.apiError('database error', err);
        if (!item) return res.apiError('not found');
        
        resolve(item)
      })
      
    }).then((app) => {
      var fileName = getFile._doc.file.filename
      var details = app._doc
      
      ////then send email///
     
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kremer55550@gmail.com',
          pass: '/kremer51'
        }
      });
     
      var mailOptions = {
        from: 'test2@gmail.com',
        to: 'kremer55550@gmail.com',
        subject: 'new test',
        html:  `\
        <p><b>Name:</b> ${details.firstname} ${details.lastname}</p> \
        <br> \
        <p><b>Phone:</b> ${details.phone}</p> \
        <br>
        <p><b>Email:</b> ${details.email}</p> \
        <br>
        <p><b>Roles:</b> ${JSON.parse(details.role).toString().replace(/,/g, ', ')}</p> \
        <br>
        <p><b>Hours available:</b> ${details.hoursavailable}</p> \
        <br>
        <p><b>Desired pay:</b> ${details.desiredpay}</p> \
        <br>
        <p><b>Locations applied:</b> ${JSON.parse(details.locationsapplied).toString().replace(/,/g, ', ')}</p> \
        <br>
        <p><b>Start date:</b> ${details.startdate}</p> \
        <br>
        <p><b>Cover letter:</b> ${details.coverletter}</p> \
        <br>
        <p><b>Submitted on:</b> ${details.createdAt}</p> \
        `, 
        attachments: [
          {
            path: 'public/uploads/files/' + fileName
          }
        ]
      };
      transporter.sendMail(mailOptions, function(error, info){
        if(error){
          console.log(error);
          res.apiResponse({fail: 'Mail not sent'})
        } else {
          console.log('email sent: ' + info.response);
          res.apiResponse({success: 'Application submitted'})
        }
      })

    })
  })
  
}

/**
 * List Files
 */
exports.list = function(req, res) {
  FileData.model.find(function(err, items) {

    if (err) return res.apiError('database error', err);

    res.apiResponse({
      collections: items
    }); 

  });  
}

/**
 * Get File by ID
 */
exports.get = function(req, res) {
  FileData.model.findById(req.params.id).exec(function(err, item) {

    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    res.apiResponse({
      collection: item
    });

  });
}


/**
 * Update File by ID
 */
exports.update = function(req, res) {
  
  var newApplication = Application.model.findById(req.query.application)

  newApplication.exec(function(err, item){
    if (err) console.log(err);
    item.getUpdateHandler(req).process(req.query, {
      fields: 'firstname, lastname, email, phone, role, hoursavailable, desiredpay, \
      locationsapplied, startdate, coverletter'
    }, function(err){
      if (err) console.log(err);
      console.log('success');
    })

  })




  FileData.model.findById(req.params.id).exec(function(err, item) {
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    item._doc.application = newApplication
    // console.log(item._doc, 'application added');
    item._doc.test = req.query.testing
    // console.log(item._doc, 'testing added');
    var data = (req.method == 'POST') ? req.body : req.query;
    // console.log(data);
    item.getUpdateHandler(req).process(data, function(err) {
      // console.log(err, 'api err');
      if (err) return res.apiError('create error', err);
      
      res.apiResponse({
    
        collection: item
      });

    });
  });
}

/**
 * Upload a New File
 */
exports.create = function(req, res) {
  var newApplication = new Application.model()

  newApplication.getUpdateHandler(req).process(req, function(err){

    if (err){
      console.log(err);
    }
    
  })
  var item = new FileData.model(),
  data = (req.method == 'POST') ? req.body : req.query;

  item.getUpdateHandler(req).process(req.files, function(err) {

    if (err) return res.apiError('error', err);

    res.apiResponse({
      file_upload: item,
      newApplication: newApplication
    });

  });
}

/**
 * Delete File by ID
 */
exports.remove = function(req, res) {
  var fileId = req.params.id;
  FileData.model.findById(req.params.id).exec(function (err, item) {

    if (err) return res.apiError('database error', err);

    if (!item) return res.apiError('not found');

      item.remove(function (err) {

        if (err) return res.apiError('database error', err);

        //Delete the file
        exec('rm public/uploads/files/'+fileId+'.*', function(err, stdout, stderr) {
          if (err) {
              console.log('child process exited with error code ' + err.code);
              return;
          }
          console.log(stdout);
        });

        return res.apiResponse({
          success: true
        });
    });

  });
}