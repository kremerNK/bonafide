// create item rows in shopping cart

var shoppingCart = JSON.parse(localStorage.getItem('cart')) || []
var table = document.querySelector('#cart-table')


if (shoppingCart.length > 0) {
    

    for (i=0; i < shoppingCart.length; i++){
        
        var row = table.insertRow(1)
        row.className = 'product-row'
        var cell1 = row.insertCell(0)
        var cell2 = row.insertCell(1)
        var cell3 = row.insertCell(2)
        var cell4 = row.insertCell(3)
        var cell5 = row.insertCell(4)

        var hiddenId = document.createElement('input')
        hiddenId.type= 'hidden'
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

        cell1.appendChild(deleteBtn)
        cell1.appendChild(img)
        cell2.innerHTML = shoppingCart[i].value.title
        cell3.innerHTML = shoppingCart[i].value.price
        cell4.appendChild(plusMinusDiv)
        cell5.innerHTML = shoppingCart[i].value.price
    }
    
} else {
    table.style.display = 'none'
}


//plus minus btn function//
function up(max) {
    var myNumber = event.target.closest('.input-group').querySelector('#myNumber')
    myNumber.value = parseInt(myNumber.value) + 1

    if (myNumber.value >= parseInt(max)) {
        myNumber.value = max;
    }
}
function down(min) {
    var myNumber = event.target.closest('.input-group').querySelector('#myNumber')
    myNumber.value = parseInt(myNumber.value) - 1;
    if (myNumber.value <= parseInt(min)) {
        myNumber.value = min;
    }
}

//remove item from cart

var deleteBtns = document.querySelectorAll('.fas.fa-times')

deleteBtns.forEach(btn => btn.addEventListener('click', function(){
    var target = event.target.closest('.product-row')
    var id = target.querySelector('#product-id').name
   
    target.remove()

    var getStorage = JSON.parse(localStorage.getItem('cart'))
    for (i=0; i < getStorage.length; i++){
        console.log(getStorage[i].id);
        if (getStorage[i].id == id){
            getStorage.splice(i, 1)
        }
    }
    localStorage.setItem('cart', JSON.stringify(getStorage))
    
})) 

//stripe integration

const stripe = Stripe('pk_test_51HU2DcIVvXQ3iOrWc4VpIocGbjdoc2mDwhs8p0mOpTfdyi9TF4YaRTISX4husPKA3bCjxhCEIhz5UidBqTYJqTex00MrSwK4C1');

const elements = stripe.elements();

// Create our card inputs
var style = {
  base: {
    color: "#fff"
  }
}; 

const card = elements.create('card', { style });
card.mount('#card-element');


const token = async () => await stripe.card.createToken({
  card: {
    number: '4242424242424242',
    exp_month: 9,
    exp_year: 2021,
    cvc: '314',
  },   
});

const form = document.querySelector('form');
const errorEl = document.querySelector('#card-errors');

// Give our token to our form
const stripeTokenHandler = token => {

  const hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id); 
  form.appendChild(hiddenInput);
 
  form.submit();
}

// Create token from card data
form.addEventListener('submit', e => {
  e.preventDefault();
  stripeTokenHandler(token)
  // stripe.createToken(card).then(res => {

  //   if (res.error) errorEl.textContent = res.error.message;
    
  //   else stripeTokenHandler(res.token);
  // })
}) 
