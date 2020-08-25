//////////////Sort by select bar/////////

const select = document.querySelector('#sort')
const allItems = document.querySelectorAll('#item')

function defaultSort(array, itemsDiv){
    console.log('default');
    
    array.sort(function(a, b){
        if (a.querySelector('#item-title').textContent < 
        b.querySelector('#item-title').textContent) {
            return -1;
        } else {
            return 1;
        }
    })
    itemsDiv.textContent = '';
    for (i=0; i < array.length; i++){
        itemsDiv.appendChild(array[i].cloneNode(true))
    }

}

function latestSort(array, itemsDiv){
    array.sort(function(a, b){
        const date1 = a.querySelector('#date-created').value
        const date2 = b.querySelector('#date-created').value
        return (new Date(date1) - new Date(date2) < 0) ? 1: -1;
    })
    itemsDiv.textContent ='';
    for (i=0; i < array.length; i++){
        itemsDiv.appendChild(array[i].cloneNode(true))
    }
}

function loHi(array, itemsDiv){
    array.sort(function(a, b){
        if (parseFloat(a.querySelector('#item-price').textContent.substring(1)) < 
        parseFloat(b.querySelector('#item-price').textContent.substring(1))) {
            return -1;
        } else {
            return 1;
        }
    })
    itemsDiv.textContent ='';
    for (i=0; i < array.length; i++){
        itemsDiv.appendChild(array[i].cloneNode(true))
    }
}

function hiLo(array, itemsDiv){
    array.sort(function(a, b){
        if (parseFloat(a.querySelector('#item-price').textContent.substring(1)) < 
        parseFloat(b.querySelector('#item-price').textContent.substring(1))) {
            return 1;
        } else {
            return -1;
        }
    })
    itemsDiv.textContent ='';
    for (i=0; i < array.length; i++){
        itemsDiv.appendChild(array[i].cloneNode(true))
    }
}

function getSort(){
    const option = select.options[select.selectedIndex].value
    const allItems = document.querySelectorAll('#item')
    const allItemsArray = Array.prototype.slice.call(allItems, 0);
    const itemsDiv = document.querySelector('.items')

    if (option == 'default'){
        defaultSort(allItemsArray, itemsDiv)
    }
    else if (option =='latest'){
        latestSort(allItemsArray, itemsDiv)
    }
    else if (option == 'lohi'){
        loHi(allItemsArray, itemsDiv)
    }
    else if (option == 'hilo'){
        hiLo(allItemsArray, itemsDiv)
    }
}


///for grid/list, just make new class for list and
//revert between the two w/ each choice selected