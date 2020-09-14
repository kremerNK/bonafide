var async = require('async'),
keystone = require('keystone');
const { application } = require('express');
var exec = require('child_process').exec;
var nodemailer = require('nodemailer');
const list = require('keystone/lib/core/list');
var FileData = keystone.list('FileUpload');
var Application = keystone.list('Application')
var fs = require('fs')

exports.mailforward = async function(req, res) {

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
      // console.log(app._doc, 'application');
      console.log(getFile._doc.file.filename);
      // console.log(getFile._doc._id, 'file');
      ////then send email///
      // content: new Buffer('hello world!','utf-8') for sending list, maybe something like that 
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
        text: JSON.stringify(app._doc), 
        attachments: [
          {
            path: 'public/uploads/files/' + fileName
          }
        ]
      };
      transporter.sendMail(mailOptions, function(error, info){
        if(error){
          console.log(error);
        } else {
          console.log('email sent: ' + info.response);
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
  console.log('get ran');
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