var keystone = require('keystone');
var Types = keystone.Field.Types;

var FileUpload = new keystone.List('FileUpload');

var myStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./public/uploads/files'), // required; path where the files should be stored
    publicPath: '/public/uploads/files', // path where files will be served
  }
});

FileUpload.add({
  name: { type: String, index: true, default: 'default'},
  file: {
    type: Types.File,
    storage: myStorage
  },
  date: { type: String},

  // createdTimeStamp: { type: String },
  // alt1: { type: String },
  // attributes1: { type: String },
  // category: { type: String },      //Used to categorize widgets.
  // priorityId: { type: String },    //Used to prioritize display order.
  // parent: { type: String },
  // children: { type: String },
  // url: {type: String},
  // fileType: {type: String}
 
}); 


FileUpload.defaultColumns = 'name';
FileUpload.register();