

///display items and subtotals
var shoppingCart = JSON.parse(localStorage.getItem('cart')) || []
var table = document.querySelector('#checkout-table')

if (shoppingCart.length > 0) {
    

    for (i=0; i < shoppingCart.length; i++){
        
        var row = table.insertRow(1)
        row.className = 'product-row'
        var cell1 = row.insertCell(0)
        var cell2 = row.insertCell(1)
        

        cell1.innerHTML = shoppingCart[i].value.title + ` (Quantity ${shoppingCart[i].value.quantity})`
        cell2.innerHTML = '$' + parseFloat(shoppingCart[i].value.price.replace( /[^0-9]/, '' )) 
        * parseFloat(shoppingCart[i].value.quantity)

        cell2.id = 'product-price'
    }
    
} else {
    table.style.display = 'none'
}

///set total value
var itemPrices = document.querySelectorAll('#product-price')
var totalPlusTax = document.querySelector('#final-total')
var tax = document.querySelector('#tax')
var orderTotal = 0
var totalEle = document.querySelector('#total')

console.log(orderTotal);
if (itemPrices.length > 0){
    for (i=0; i < itemPrices.length; i++){
        orderTotal += parseFloat(itemPrices[i].textContent.replace( /[^0-9]/, '' ))
    }
}
// orderTotal = orderTotal * 1.05
var roundedTotal = (Math.ceil(orderTotal * 100)/100)
tax.textContent = '$ ' + ((Math.ceil((orderTotal * 1.05) * 100)/100) - roundedTotal).toFixed(2)
totalEle.textContent = '$ '.concat(roundedTotal.toString())
totalPlusTax.textContent = '$ ' + (Math.ceil((orderTotal * 1.05) * 100)/100).toFixed(2).toString()

// stripe integration

const stripe = Stripe('pk_test_51HU2DcIVvXQ3iOrWc4VpIocGbjdoc2mDwhs8p0mOpTfdyi9TF4YaRTISX4husPKA3bCjxhCEIhz5UidBqTYJqTex00MrSwK4C1');
const elements = stripe.elements();

// Create our card inputs
var style = {
  base: {
    backgroundColor: "#fff",
   
  }
}; 

const card = elements.create('card', { style });
card.mount('#card-element');
 



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
  // localStorage.removeItem('cart')
}

// Create token from card data
form.addEventListener('submit', e => {
    var totalCost = document.querySelector('#payment-value')
    totalCost.value = (Math.ceil((orderTotal * 1.05) * 100)/100).toFixed(2).toString()
  
  e.preventDefault();
  stripeTokenHandler('placeholder')
  // stripe.createToken(card).then(res => {

  //   if (res.error) errorEl.textContent = res.error.message;
    
  //   else stripeTokenHandler(res.token);
  // })
}) 
