
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
var submitBtn = document.querySelector('#submit-btn');



submitBtn.addEventListener('click', function(){
  selectedRoles = document.querySelectorAll('#role-option')
  selectedLocation = document.querySelectorAll('#location-option')
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

  localStorage.setItem('roleStorage', JSON.stringify(roleArr))
  localStorage.setItem('locationStorage', JSON.stringify(locationArr))
  
})

function setRoles(roles, location){
  var parsedRole = JSON.parse(localStorage.getItem('roleStorage'))
  var parsedLocation = JSON.parse(localStorage.getItem('locationStorage'))
  selectedRoles = document.querySelectorAll('#role-option')
  selectedLocation = document.querySelectorAll('#location-option')

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

  
  selectedFile = $('#resume').get(0).files[0];

  ////VALIDATING FORM FIELDS EXCEPT FILE
  var firstName = document.querySelector('#firstname-input')
  var lastName = document.querySelector('#lastname-input')
  var email = document.querySelector('#email-input')
  var phone = document.querySelector('#phone-input')
  var role = document.querySelector('#selectRole')
  var hoursavailable = document.querySelector('#hoursavailable')
  var desiredpay = document.querySelector('#desiredpay')
  var locationsapplied = document.querySelector('#locationsapplied')
  var startdate = document.querySelector('#startdate')
  var coverletter = document.querySelector('#coverletter')
  var resume = document.querySelector('#resume')

  var stringFields = [firstName, lastName, hoursavailable, desiredpay, startdate, coverletter]
  var listFields = [role, locationsapplied]
 
  function validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
// poorly done manual validation
  function fieldValidation(){
    ifErrors = false
    if (resume.files.length === 0){
      ifErrors = true
      resume.closest('.input').querySelector('#alert').className = 'has-error'
    } else {
      resume.closest('.input').querySelector('#alert').className = ''
    }

    if (phone.value.length < 12){
      ifErrors = true
      phone.closest('.input').querySelector('#alert').className = 'has-error'
      
    } else {
      phone.closest('.input').querySelector('#alert').className = ''
    }
    if (validateEmail(email.value) !== true){
      ifErrors = true
      email.closest('.input').querySelector('#alert').className = 'has-error'
    } else {
      email.closest('.input').querySelector('#alert').className = ''
    }
    for (i=0; i < stringFields.length; i++){
      if (stringFields[i].value == ''){
        ifErrors = true
        stringFields[i].closest('.input').querySelector('#alert').className = 'has-error'
      } else {
        stringFields[i].closest('.input').querySelector('#alert').className = ''
      }
    }
    for (i=0; i < listFields.length; i++){
     
      if ([...listFields[i].options].filter((item) => item.selected === true).length > 0){
        console.log([...listFields[i].options].filter((item) => item.selected === true));
        listFields[i].closest('.input').querySelector("#alert").className = ''
      } else {
        ifErrors = true
        listFields[i].closest('.input').querySelector("#alert").className = 'has-error'
      }
    }
    if (selectedFile == undefined){
      resume.closest('.input').querySelector('#alert').className = 'has-error'
    } else {
      resume.closest('.input').querySelector('#alert').className = ''
    }
  }
  fieldValidation();

  //////show/hide alert div///
  var alertDiv = document.querySelector('#alert-div')

  if (ifErrors === true){
    if (alertDiv.classList.contains('hide')){
      alertDiv.classList.remove('hide')
    }
  } else {
    if (!alertDiv.classList.contains('hide')){
      alertDiv.classList.add('hide')
    }
  } 
  
  
  if (ifErrors === true){
    window.scrollTo({top: 0, behavior: 'smooth'});
    return
  }
  //Error handling
  
  // if (selectedFile == undefined)
      // alert('You did not select a file!');

  //Create the FormData data object and append the file to it.
  var newFile = new FormData();
  newFile.append('file_upload', selectedFile); //This is the raw file that was selected

 
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

          //Dev Note: KeystoneAPI only allows file and image uploads with the file itself. Any extra metadata will have to
          //be uploaded/updated with a second call.

          //debugger;
          // console.log('File upload succeeded! ID: ' + data.file_upload._id);

          //Fill out the file metadata information
          
          data.file_upload.application = data.newApplication._id
     
          data.file_upload.firstname = firstName.value;
          data.file_upload.lastname = lastName.value;
          data.file_upload.email = email.value;
          data.file_upload.phone = phone.value;
          data.file_upload.role = JSON.stringify([...role.options].filter((item) => item.selected === true).map(x => x.value))
          
   
          data.file_upload.hoursavailable = hoursavailable.value;
          data.file_upload.desiredpay = desiredpay.value;
          data.file_upload.locationsapplied = JSON.stringify([...locationsapplied.options].filter((item) => item.selected === true).map(x => x.value))
          data.file_upload.locationsapplied = '["Depere", "Appleton"]'
          data.file_upload.startdate = startdate.value;
          data.file_upload.coverletter = coverletter.value
        
          // Update the file with the information above.
          
          $.get('/api/fileupload/' + data.file_upload._id + '/update', data.file_upload, function (data) {
              //debugger;
            var appSubmitted = document.querySelector('.application-submitted')
            var appForm = document.querySelector('#application-form')
            appForm.classList.add('hidden')
            appSubmitted.classList.add('active')
            window.scrollTo({top: 0, behavior: 'smooth'});
              // console.log('File information updated.');

              //Add the uploaded file to the uploaded file list.
              $('#file_list').append('<li><a href="' + data.collection.url + '" download>' + data.collection.name + '</a></li>');

          })

              //If the metadata update fails:
              .fail(function (data) {
                  // debugger;
                  console.log(data);
                  // var dataResponse = (Object.keys(data.responseJSON.detail.detail))
                  // console.log(dataResponse);
                  // var subFailure = document.querySelector('.alert.alert-danger.hide')
                  // var subSuccess = document.querySelector('.alert.alert-success.hide')
                  // subSuccess.classList.toggle('hide')
                  // subFailure.classList.toggle('hide')
                  console.error('The file metadata was not updated. Here is the error message from the server:');
                  console.error('Server status: ' + err.status);
                  console.error('Server message: ' + err.statusText);

                  // alert('Failed to connect to the server while trying to update file metadata!');
              });
            $.get('/api/fileupload/mailforward', data.file_upload, function(data){

            })
      },

      //This error function is called if the POST fails for submitting the file itself.
      error: function (err) {
          //debugger;
          resume.closest('.input').querySelector('#alert').className = 'has-error'
          console.error('The file was not uploaded to the server. Here is the error message from the server:');
          console.error('Server status: ' + err.status);
          console.error('Server message: ' + err.statusText);

          alert('Failed to connect to the server!');
      }
  };

  //Execute the AJAX call.
  jQuery.ajax(opts);

} 