// create item rows in shopping cart

var shoppingCart = JSON.parse(localStorage.getItem('cart')) || []
var table = document.querySelector('#cart-table')


if (shoppingCart.length > 0) {


  for (i = 0; i < shoppingCart.length; i++) {

    var row = table.insertRow(1)
    row.className = 'product-row'
    var cell1 = row.insertCell(0)
    var cell2 = row.insertCell(1)
    var cell3 = row.insertCell(2)
    var cell4 = row.insertCell(3)
    var cell5 = row.insertCell(4)

    var hiddenId = document.createElement('input')
    hiddenId.type = 'hidden'
    hiddenId.name = shoppingCart[i].id
    hiddenId.id = 'product-id'
    row.appendChild(hiddenId)

    var img = document.createElement('img')
    img.src = shoppingCart[i].value.image

    var deleteBtn = document.createElement('i')
    deleteBtn.className = "fas fa-times"

    var plusMinusDiv = document.createElement('div')
    plusMinusDiv.appendChild(document.querySelector('.input-group').cloneNode(true))
    var plusMinusBtn = plusMinusDiv.getElementsByTagName('div')[0]
    plusMinusBtn.style.display = 'flex'

    // var itemQuantity = cell4.querySelector('#myNumber')
    // console.log(itemQuantity);

    cell1.appendChild(deleteBtn)
    cell1.appendChild(img)
    cell2.innerHTML = shoppingCart[i].value.title
    cell3.innerHTML = shoppingCart[i].value.price
    cell4.appendChild(plusMinusDiv)
    cell5.innerHTML = shoppingCart[i].value.price

    //set quantity for each product
    cell4.parentNode.querySelector('#myNumber').value = shoppingCart[i].value.quantity
  }

} else {
  table.style.display = 'none'
}


//plus minus btn function//
function up(max) {
  var cartItems = JSON.parse(localStorage.getItem('cart'))
  var itemId = event.target.closest('.product-row').querySelector('#product-id').name

  var myNumber = event.target.closest('.input-group').querySelector('#myNumber')
  myNumber.value = parseInt(myNumber.value) + 1

  if (myNumber.value >= parseInt(max)) {
    myNumber.value = max;
  }
  for (i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id == itemId) {
      cartItems[i].value.quantity = myNumber.value
    }
  }
  localStorage.setItem('cart', JSON.stringify(cartItems))
}
function down(min) {
  var cartItems = JSON.parse(localStorage.getItem('cart'))
  var itemId = event.target.closest('.product-row').querySelector('#product-id').name
  var myNumber = event.target.closest('.input-group').querySelector('#myNumber')
  myNumber.value = parseInt(myNumber.value) - 1;
  if (myNumber.value <= parseInt(min)) {
    myNumber.value = min;
  }
  for (i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id == itemId) {
      cartItems[i].value.quantity = myNumber.value
    }
  }
  localStorage.setItem('cart', JSON.stringify(cartItems))
}

//remove item from cart

var deleteBtns = document.querySelectorAll('.fas.fa-times')
 
deleteBtns.forEach(btn => btn.addEventListener('click', function () {
  var target = event.target.closest('.product-row')
  var id = target.querySelector('#product-id').name

  target.remove()

  var getStorage = JSON.parse(localStorage.getItem('cart'))
  for (i = 0; i < getStorage.length; i++) {
    console.log(getStorage[i].id);
    if (getStorage[i].id == id) {
      getStorage.splice(i, 1)
    }
  }
  localStorage.setItem('cart', JSON.stringify(getStorage))

})) 
