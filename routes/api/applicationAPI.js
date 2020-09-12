var async = require('async'),
keystone = require('keystone');
const { application } = require('express');
var exec = require('child_process').exec;

var FileData = keystone.list('FileUpload');
var Application = keystone.list('Application')


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
  
  var test = Application.model.findById(req.query.application)
  var itemToUpdate = {
    item: test
  }
  console.log(test);
  // Application.model.findOne(itemToUpdate, function(error, object){
  //   console.log(object);
  //   // Application.updateItem(

  //   // )

  // })

  test.updateItem()
  // Application.model.findById(req.query.application).exec(function(err, item){
  //   // console.log(req.body, 'req.body');
  //   // console.log(item, 'item');
  //   // console.log(item._doc);
  //   item._doc.lastname = 'test'
  //   // console.log(item._doc);
  //   item.save()
  //   item.getUpdateHandler(data).process(data, function(err){
  //     if (err) return res.apiError('create error', err)
  //     res.apiResponse({
  //       collection: item
  //     })
  //   })
  // })

  
  
  // newApplication.save()
  // console.log(newApplication.schema.paths._id);

  // FileData.model.findById(req.params.id).exec(function(err, item) {
  //   if (err) return res.apiError('database error', err);
  //   if (!item) return res.apiError('not found');
  //   // console.log(req.query.application);
  //   // console.log(item._doc.application);
  //   item._doc.application = newApplication
  //   var data = (req.method == 'POST') ? req.body : req.query;
  //   // console.log(data);
  //   item.getUpdateHandler(req).process(data, function(err) {
  //     // console.log(err, 'api err');
  //     if (err) return res.apiError('create error', err);
      
  //     res.apiResponse({
    
  //       collection: item
  //     });

  //   });
  // });
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
    newApplication._doc.firstname = 'test'
    // console.log(newApplication._doc);
    console.log('saved');
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