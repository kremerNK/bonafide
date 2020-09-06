

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
  for (i=0; i < selectedRoles.length; i++){
    selectedRoles[i].selected = parsedRole[i]
  }
  for (i=0; i < selectedLocation.length; i++ ){
    selectedLocation[i].selected = parsedLocation[i]
  }
}

setRoles()

var test1 = document.querySelector('#test1')
 