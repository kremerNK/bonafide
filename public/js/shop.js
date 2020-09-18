//////////////Sort by select bar/////////

const select = document.querySelector('#sort')
const allItems = document.querySelectorAll('#item')

function defaultSort(array, itemsDiv) {

    array.sort(function (a, b) {
        if (a.querySelector('#item-title').textContent <
            b.querySelector('#item-title').textContent) {
            return -1;
        } else {
            return 1;
        }
    })
    itemsDiv.textContent = '';
    for (i = 0; i < array.length; i++) {
        itemsDiv.appendChild(array[i].cloneNode(true))
    }

}

function latestSort(array, itemsDiv) {
    array.sort(function (a, b) {
        const date1 = a.querySelector('#date-created').value
        const date2 = b.querySelector('#date-created').value
        return (new Date(date1) - new Date(date2) < 0) ? 1 : -1;
    })
    itemsDiv.textContent = '';
    for (i = 0; i < array.length; i++) {
        itemsDiv.appendChild(array[i].cloneNode(true))
    }
}

function loHi(array, itemsDiv) {
    array.sort(function (a, b) {
        if (parseFloat(a.querySelector('#item-price').textContent.substring(1)) <
            parseFloat(b.querySelector('#item-price').textContent.substring(1))) {
            return -1;
        } else {
            return 1;
        }
    })
    itemsDiv.textContent = '';
    for (i = 0; i < array.length; i++) {
        itemsDiv.appendChild(array[i].cloneNode(true))
    }
}

function hiLo(array, itemsDiv) {
    array.sort(function (a, b) {
        if (parseFloat(a.querySelector('#item-price').textContent.substring(1)) <
            parseFloat(b.querySelector('#item-price').textContent.substring(1))) {
            return 1;
        } else {
            return -1;
        }
    })
    itemsDiv.textContent = '';
    for (i = 0; i < array.length; i++) {
        itemsDiv.appendChild(array[i].cloneNode(true))
    }
}

function getSort() {
    const option = select.options[select.selectedIndex].value
    const allItems = document.querySelectorAll('#item')
    // const allItemsArray = Array.prototype.slice.call(allItems, 0);
    var allItemsArray = [...allItems]
    const itemsDiv = document.querySelector('.items')
    console.log(listBtn);
    if (listBtn.classList.contains('active')){
        console.log('active list');
    }

    if (option == 'default') {
        defaultSort(allItemsArray, itemsDiv)
    }
    else if (option == 'latest') {
        latestSort(allItemsArray, itemsDiv)
    }
    else if (option == 'lohi') {
        loHi(allItemsArray, itemsDiv)
    }
    else if (option == 'hilo') {
        hiLo(allItemsArray, itemsDiv)
    }
}


//////////switch between grid and list view of items/////////

const gridBtn = document.querySelector('#items-grid')
const listBtn = document.querySelector('#items-list')
const itemsDiv = document.querySelector('.items')
const items = document.querySelectorAll("#item")
gridBtn.classList.add('active')

function activeBtn(target) {
    target.style.padding = '5px 10px 5px 10px';
    target.style.border = '1px solid #13aff0'
    target.style.margin = '0 -1px 0 -1px'
    target.style.color = '#13aff0'
}

function deactiveBtn(target) {
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
        if (event.target.classList.contains('active')) {
            activeBtn(event.target)
            itemsDiv.style.display = 'grid'
            itemsDiv.classList.toggle('activeList')
            itemsDiv.classList.toggle('items')
            items.forEach(item => item.className = 'item')
        }
        else {
            deactiveBtn(event.target)
        }
    }
    else {
        return
    }
}

listBtn.onclick = () => {

    if (itemsDiv.classList.contains('activeList')) {
        return
    }

    else {
        gridBtn.classList.contains('active') ?
            (gridBtn.classList.remove('active'),
                deactiveBtn(gridBtn)) : null;
        event.target.classList.toggle('active')
        if (event.target.classList.contains('active')) {
            activeBtn(event.target)
            itemsDiv.classList.toggle('activeList')
            itemsDiv.classList.toggle('items')
            items.forEach(item => item.className = 'itemActive')
        }
        else {
            deactiveBtn(event.target)
        }
    }
}

//filter by Search


function filterProducts() {
    
    window.setTimeout(function () {
        var items = document.querySelectorAll('#item')
        var search = document.querySelector('#search-input').value
        var boxes = [...document.querySelectorAll('.checkbox-input')]
        .filter(box => box.checked == true)
        .map(box => box.value)
        
        items.forEach(item => {
            var itemVal = item.getAttribute('value')
            var itemTitle = item.querySelector('#item-title').textContent
            if (boxes.includes(itemVal) || boxes.includes('All') || boxes.length == 0){
                if (itemTitle.toLowerCase().match(search)){
                    item.style.display = 'flex'
                } else {
                    item.style.display = 'none'
                }
                
            } else {
                item.style.display = 'none'
            }
        })
    }, 10)
}