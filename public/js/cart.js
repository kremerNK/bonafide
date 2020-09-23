// create item rows in shopping cart

var shoppingCart = JSON.parse(localStorage.getItem('cart'))


if (shoppingCart.length > 0) {
    var shoppingCartFiltered = Array.from(new Set(shoppingCart.map(a => a.id)))
        .map(id => {
            return shoppingCart.find(a => a.id === id)
        }).reverse()
    var table = document.querySelector('#cart-table')
    
    for (i=0; i < shoppingCartFiltered.length; i++){
        

    
        var row = table.insertRow(1)
        row.className = 'product-row'
        var cell1 = row.insertCell(0)
        var cell2 = row.insertCell(1)
        var cell3 = row.insertCell(2)
        var cell4 = row.insertCell(3)
        var cell5 = row.insertCell(4)

        var img = document.createElement('img')
        img.src = shoppingCartFiltered[i].value.image
        var deleteBtn = document.createElement('i')
        deleteBtn.className = "fas fa-times"
        var plusMinusDiv = document.createElement('div')
        plusMinusDiv.appendChild(document.querySelector('.input-group').cloneNode(true))
        var plusMinusBtn = plusMinusDiv.getElementsByTagName('div')[0]
        plusMinusBtn.style.display = 'flex'

        cell1.appendChild(deleteBtn)
        cell1.appendChild(img)
        cell2.innerHTML = shoppingCartFiltered[i].value.title
        cell3.innerHTML = shoppingCartFiltered[i].value.price
        cell4.appendChild(plusMinusDiv)
        cell5.innerHTML = shoppingCartFiltered[i].value.price
    }
    
} 


//plus minus btn function//
