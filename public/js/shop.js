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


//////////switch between grid and list view of items/////////

const gridBtn = document.querySelector('#items-grid')
const listBtn = document.querySelector('#items-list')
const itemsDiv = document.querySelector('.items')
const items = document.querySelectorAll("#item")
gridBtn.classList.add('active')

function activeBtn(target){
    target.style.padding = '5px 10px 5px 10px';
    target.style.border = '1px solid #13aff0'
    target.style.margin = '0 -1px 0 -1px'
    target.style.color = '#13aff0'
}

function deactiveBtn(target){
    target.style.padding = '5px 10px 5px 10px';
    target.style.border = '1px solid black'
    target.style.margin = '0 -1px 0 -1px'
    target.style.color = 'inherit'
}

(gridBtn).onclick = () => {
    if (itemsDiv.classList.contains('activeList')) {
        event.target.classList.toggle('active')
        listBtn.classList.contains('active') ? 
        (listBtn.classList.remove('active'), 
        deactiveBtn(listBtn)) : null;
        if (event.target.classList.contains('active')){
            activeBtn(event.target)
            itemsDiv.style.display = 'grid'
            itemsDiv.classList.toggle('activeList') 
            itemsDiv.classList.toggle('items')
            items.forEach(item => item.classList.toggle('itemActive'))
        }
        else {
            deactiveBtn(event.target)
        }
    }
    else {
        console.log('grid activated, no toggle');
        return
    }
}

listBtn.onclick = () => {
    if (itemsDiv.classList.contains('activeList')){
        return
    }

    else {
        gridBtn.classList.contains('active') ? 
        (gridBtn.classList.remove('active'), 
        deactiveBtn(gridBtn)) : null;
        event.target.classList.toggle('active')
        console.log(event.target.classList);
        if (event.target.classList.contains('active')){
            activeBtn(event.target)
            itemsDiv.classList.toggle('activeList') 
            itemsDiv.classList.toggle('items')
            items.forEach(item => item.classList.toggle('itemActive'))
        }
        else {
            deactiveBtn(event.target)
        }
    }
}


//////////search products///////

const searchInput = document.querySelector('#search-input')
var searchTerms = "";

searchInput.onkeydown = (search) => {
    window.setTimeout( function () {
        const items = document.querySelectorAll("#item")
        const letterNumber = /^[0-9a-zA-Z\s]+$/;
        if (search.key.length == 1 && search.key.match(letterNumber)) {
            (searchTerms.length > 0) ? searchTerms += search.key : searchTerms = search.key
        }
        else if (search.key == 'Backspace') {
            searchTerms = searchTerms.slice(0, -1)
            console.log(search.target.value);
        }
        items.forEach(item => {
            const itemTitle = item.querySelector('#item-title').textContent
            // const regex = searchTerms.toLowerCase()
            const regex = search.target.value
            if (!itemTitle.toLowerCase().match(regex)){
                item.style.display = 'none';
                
            }
            else {
                item.style.display = 'flex';
                item.style.flexDirection = 'column'
                item.style.alignItems = 'center'
            }
        })
    }, 10)
    
}

/////////search by Product Categories /////////

const checkBoxes = document.querySelectorAll('.checkbox')
let selectedBoxes = [];


function filterByCategory(selection){
    if (selection.includes('all') || selection.length == 0){
        for (i=0; i < allItems.length; i++){
            allItems[i].style.display = 'flex';
            allItems[i].style.flexDirection = 'column'
            allItems[i].style.alignItems = 'center'
        }
        return
    }
    for (i=0; i < allItems.length; i++){
        if (selection.includes([...allItems][i].getAttribute('value'))){
            allItems[i].style.display = 'flex';
            allItems[i].style.flexDirection = 'column'
            allItems[i].style.alignItems = 'center'
        }
        else {
            allItems[i].style.display = 'none';
        }
    }
}

checkBoxes.forEach((checkBox) => {
      checkBox.addEventListener('click', function(){
        this.classList.toggle('active-checkbox')
        if (this.classList.contains('active-checkbox')){
            selectedBoxes.push(this.value)
            filterByCategory(selectedBoxes)
    }
        else {
            let value = this.value
            selectedBoxes = selectedBoxes.filter(function(box) { return box !== value})
            filterByCategory(selectedBoxes)
        }
      })
}) 