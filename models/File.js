var keystone = require('keystone');
var Types = keystone.Field.Types;

var FileUpload = new keystone.List('FileUpload')


var myStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./public/uploads/files'), // required; path where the files should be stored
    publicPath: '/public/uploads/files', // path where files will be served
  }
});

FileUpload.add({
  name: { type: String, index: true},
  file: {
    type: Types.File,
    storage: myStorage
  },
  application: { type: Types.Relationship, ref: 'Application' },
  date: { type: String, default: Date.now()},
 
}); 

FileUpload.defaultSort = '-date';
FileUpload.defaultColumns = '_id';
FileUpload.register();