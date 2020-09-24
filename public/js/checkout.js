console.log('checkout');



///display items and subtotals
var shoppingCart = JSON.parse(localStorage.getItem('cart')) || []
var table = document.querySelector('#checkout-table')

if (shoppingCart.length > 0) {
    

    for (i=0; i < shoppingCart.length; i++){
        
        var row = table.insertRow(1)
        row.className = 'product-row'
        var cell1 = row.insertCell(0)
        var cell2 = row.insertCell(1)


        cell1.innerHTML = shoppingCart[i].value.title
        cell2.innerHTML = shoppingCart[i].value.price

    }
    
} else {
    table.style.display = 'none'
}


// stripe integration

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


const token = 't'

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
