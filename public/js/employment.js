
/////FORMAT PHONE NUMBER////
const phoneInput = document.querySelector('#phone-input');
const phoneFormat = '{0}{1}{2}-{3}{4}{5}-{6}{7}{8}{9}'; 

phoneInput.addEventListener('input', (event) => {
  const inputStripped = phoneInput.value.replace(/\D/g, '');
  const inputIsValid = !isNaN(parseInt(event.data));

  if (event.inputType.includes('deleteContent')) {
    /*
     TODO Create input inequality when values are deleted
     that are NOT at the end of the input
     '(012) 34' -> '(012) 3' FINE
     '(012) 34' -> '(01x) 34' INEQUALITY TO FIX
    */
    return;
  }

  /*
    If text was inserted on 'input', and the current length is max (or input 
    value was not a number), then remove the last inputted value.
  */
  if (event.inputType == 'insertText' && (inputStripped.length > 10 || !inputIsValid)) {
    phoneInput.value = phoneInput.value.substring(0, phoneInput.value.length - 1);
    return;
  }

  if (inputStripped)
    phoneInput.value = formatPhoneInput(inputStripped);
});

const formatPhoneInput = (inputNumber) => {
  let inputNumArr = inputNumber.split('');
  let formatVar = inputNumArr.length - 1;
  
  // indexOf() + 3, so we can replace the entire '{x}' variable in phoneFormat
  let replaceIndex = phoneFormat.indexOf(`{${formatVar}}`) + 3;
  
  // Autocompletion to next input value
  switch (formatVar) {
    case 2:
      replaceIndex += 1;
      break;
    case 5:
      replaceIndex += 1;
      break;
    default:
      break;
  }
  
  // phoneFormat substring based on the current number length
  let formattedInput = phoneFormat.substring(0, replaceIndex);

  for (let i = 0; i < inputNumArr.length; i++) {
    formattedInput = formattedInput.replace(`{${i}}`, inputNumArr[i]);
  }

  return formattedInput;
}
 

////CONSERVE SELECTED OPTIONS FROM SELECT ELEMENTS////
var submitBtn = document.querySelector('#submit');
var selectedRoles = document.querySelectorAll('#role-option')
var selectedLocation = document.querySelectorAll('#location-option')

submitBtn.addEventListener('click', function(){
  var roleArr = []
  var locationArr = []

  var getItem = localStorage.setItem('roleStorage', [])
  var getItemLocation = localStorage.setItem('locationStorage', [])
  for (i=0; i < selectedRoles.length; i++){
    roleArr.push(selectedRoles[i].selected)
  } 
  for (i=0; i < selectedLocation.length; i++){
    locationArr.push(selectedLocation[i].selected)
  }
  console.log(locationArr);
  localStorage.setItem('roleStorage', JSON.stringify(roleArr))
  localStorage.setItem('locationStorage', JSON.stringify(locationArr))
  console.log(JSON.parse(localStorage.getItem('locationStorage')))
})

function setRoles(){
  var parsedRole = JSON.parse(localStorage.getItem('roleStorage'))
  var parsedLocation = JSON.parse(localStorage.getItem('locationStorage'))
  console.log(parsedRole);
  console.log(parsedLocation);
  for (i=0; i < selectedRoles.length; i++){
    selectedRoles[i].selected = parsedRole[i]
  }
  for (i=0; i < selectedLocation.length; i++ ){
    selectedLocation[i].selected = parsedLocation[i]
  }
}

setRoles()


// ////API FOR FORM SUBMISSION////
$(document).ready(function () {
  //debugger;

});

function uploadFile() {
  //debugger;
  
  var selectedFile = $('#file_upload').get(0).files[0];


  ////VALIDATING FORM FIELDS EXCEPT FILE
  var firstName = document.querySelector('#firstname-input').value
  var lastName = document.querySelector('#lastname-input').value
  var email = document.querySelector('#email-input').value
  var phone = document.querySelector('#phone-input').value
  var role = []
  var hoursavailable = document.querySelector('#hoursavailable').value
  var desiredpay = document.querySelector('#desiredpay').value
  var locationsapplied = []
  var startdate = document.querySelector('#startdate').value
  var coverletter = document.querySelector('#coverletter').value

  var locationSelection = [...document.querySelector('#locationsapplied').options]
  for (i=0; i < locationSelection.length; i++){
    locationsapplied.push(locationSelection[i].value)
  }
  var roleSelection = [...document.querySelector('#selectRole')]
  for (i=0; i < roleSelection.length; i++){
    role.push(roleSelection[i].value)
  }

  console.log(role);
  console.log(locationsapplied);

  function fieldValidation(){
    
  }
  fieldValidation();
  //Error handling
  if (selectedFile == undefined)
      alert('You did not select a file!');
  console.log(selectedFile);
  //Create the FormData data object and append the file to it.
  var newFile = new FormData();
  newFile.append('file_upload', selectedFile); //This is the raw file that was selected
  // newFile.append('testing', firstName)
  // for (var pair of newFile.entries()){
  //   console.log(pair);
  // }
 
  //Set the form options.
  var opts = {
      url: '/api/fileupload/create',
      data: newFile,
      cache: false,
      contentType: false,
      processData: false,
      type: 'POST',

      //This function is executed when the file uploads successfully.
      success: function (data) {
        ///manipulate DOM here upon success to show success page
        console.log(data);
          //Dev Note: KeystoneAPI only allows file and image uploads with the file itself. Any extra metadata will have to
          //be uploaded/updated with a second call.

          //debugger;
          console.log('File upload succeeded! ID: ' + data.file_upload._id);

          //Fill out the file metadata information
          
          data.file_upload.firstname = firstName;
          data.file_upload.lastname = lastName;
          data.file_upload.email = email;
          data.file_upload.phone = phone;
          data.file_upload.role = role;
          data.file_upload.hoursavailable = hoursavailable;
          data.file_upload.desiredpay = desiredpay;
          data.file_upload.locationsapplied = locationsapplied;
          data.file_upload.startdate = startdate;
          data.file_upload.coverletter = coverletter
        
          
          // data.file_upload.fileType = data.file_upload.file.mimetype;
          // data.file_upload.createdTimeStamp = new Date();

          // Update the file with the information above.
          $.get('/api/fileupload/' + data.file_upload._id + '/update', data.file_upload, function (data) {
              //debugger;

              console.log('File information updated.');

              //Add the uploaded file to the uploaded file list.
              $('#file_list').append('<li><a href="' + data.collection.url + '" download>' + data.collection.name + '</a></li>');

          })

              //If the metadata update fails:
              .fail(function (data) {
                  debugger;

                  console.error('The file metadata was not updated. Here is the error message from the server:');
                  console.error('Server status: ' + err.status);
                  console.error('Server message: ' + err.statusText);

                  alert('Failed to connect to the server while trying to update file metadata!');
              });
      },

      //This error function is called if the POST fails for submitting the file itself.
      error: function (err) {
          //debugger;

          console.error('The file was not uploaded to the server. Here is the error message from the server:');
          console.error('Server status: ' + err.status);
          console.error('Server message: ' + err.statusText);

          alert('Failed to connect to the server!');
      }
  };

  //Execute the AJAX call.
  jQuery.ajax(opts);

} 