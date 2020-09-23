
//////////////Sort by select bar/////////

const select = document.querySelector('#sort')
const allItems = document.querySelectorAll('#item')

function setItemStyle() {
    if (gridBtn.classList.contains('active')) {
        makeGrid()
    }

    if (listBtn.classList.contains('active')) {
        makeList()
    }
}

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
    setItemStyle()

}

function latestSort(array, itemsDiv) {
    console.log(array[0]);
    array.sort(function (a, b) {
        const date1 = a.querySelector('#date-created').value
        const date2 = b.querySelector('#date-created').value
        return (new Date(date1) - new Date(date2) < 0) ? 1 : -1;
    })
    itemsDiv.textContent = '';
    for (i = 0; i < array.length; i++) {
        console.log(array[i].style.display);
        itemsDiv.appendChild(array[i].cloneNode(true))
    }
    setItemStyle()

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
    console.log(itemsDiv);
    setItemStyle()
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
    setItemStyle()
}

function sort(){
    current_page = 1;
    changePage(1)
}

function getSort(allItems) {
    const option = select.options[select.selectedIndex].value
    // const allItems = document.querySelectorAll('#item')
    // const allItemsArray = Array.prototype.slice.call(allItems, 0);
    // const items = [...allItems]
    var items = allItems
    const itemsDiv = document.querySelector('.items') == undefined ?
        document.querySelector('.activeList') :
        document.querySelector('.items')
    if (option == 'default') {
        defaultSort(items, itemsDiv)
    }
    else if (option == 'latest') {
        latestSort(items, itemsDiv)
    }
    else if (option == 'lohi') {
        loHi(items, itemsDiv)
    }
    else if (option == 'hilo') {
        hiLo(items, itemsDiv)
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

    target.onmouseout = function(){
        target.style.color = '#13aff0'
        target.style.border = '1px solid #13aff0'
        target.style.padding = '5px 10px 5px 10px';
        target.style.margin = '0 -1px 0 -1px'
    }
}

function deactiveBtn(target) {
    target.style.padding = '5px 10px 5px 10px';
    target.style.border = '1px solid black'
    target.style.margin = '0 -1px 0 -1px'
    target.style.color = 'inherit'
    target.onmouseover = function(){
        console.log(target);
        target.style.color = '#13aff0'
        target.style.border = '1px solid #13aff0'
        target.style.padding = '5px 10px 5px 10px';
        target.style.margin = '0 -1px 0 -1px'

    }

    target.onmouseout = function(){
        target.style.color = 'black'
        target.style.border = '1px solid black'
    }
   
}

function makeGrid() {
    const gridBtn = document.querySelector('#items-grid')
    const listBtn = document.querySelector('#items-list')
    const itemsDiv = document.querySelector('#all-items-div')
    const items = document.querySelectorAll("#item")
    
    if (itemsDiv.classList.contains('activeList')) {
        gridBtn.classList.toggle('active')
        listBtn.classList.contains('active') ?
            (listBtn.classList.remove('active'),
                deactiveBtn(listBtn)) : null;
        if (gridBtn.classList.contains('active')) {
            activeBtn(gridBtn)
            // itemsDiv.style.display = 'flex'
            itemsDiv.classList.toggle('activeList')
            itemsDiv.classList.toggle('items')
            items.forEach(item => item.className = 'item')
        }
        else {
            deactiveBtn(gridBtn)
        }
    }
    else {
        return
    }
}



function makeList() {
    const gridBtn = document.querySelector('#items-grid')
    const listBtn = document.querySelector('#items-list')
    const itemsDiv = document.querySelector('#all-items-div')
    const items = document.querySelectorAll("#item")
    
    if (itemsDiv.classList.contains('activeList')) {
        console.log('returned early');
        // return
    }

    else {
        gridBtn.classList.contains('active') ?
            (gridBtn.classList.remove('active'),
                deactiveBtn(gridBtn)) : null;
        listBtn.classList.toggle('active')
        if (listBtn.classList.contains('active')) {
            activeBtn(listBtn)
            itemsDiv.classList.toggle('activeList')
            itemsDiv.classList.toggle('items')
            items.forEach(item => item.className = 'itemActive')
        }
        else {
            deactiveBtn(listBtn)
        }
    }
}


function filterProducts() {
    
    window.setTimeout(function () {
        var catStorage = localStorage.getItem('catStorage')
        var inputCats = document.querySelectorAll('.checkbox-input')

        if (catStorage !== null){
            for (i=0; i < inputCats.length; i++){
                if (inputCats[i].value == catStorage){
                    console.log(inputCats[i]);
                    inputCats[i].checked = true;
                }
            }
            window.localStorage.removeItem('catStorage')

        }
        var items = document.querySelectorAll('#item')
        search = document.querySelector('#search-input').value
        boxes = [...document.querySelectorAll('.checkbox-input')]
            .filter(box => box.checked == true)
            .map(box => box.value)

        items.forEach(item => {
            var itemVal = item.getAttribute('value')
            var itemTitle = item.querySelector('#item-title').textContent
            if (boxes.includes(itemVal) || boxes.includes('All') || boxes.length == 0) {
                if (itemTitle.toLowerCase().match(search)) {
           
                    item.style.display = 'flex'

                } else {
                    item.style.display = 'none'
                }

            } else {
                item.style.display = 'none'
            }
        })
        current_page = 1
        changePage(1)
    }, 20)
}

filterProducts()

var selectedPages = document.querySelectorAll('#product-pp')

selectedPages.forEach((option) => {
    option.onclick = () => {
        for (i=0; i < selectedPages.length; i++){
            if (selectedPages[i].classList.contains('active-page')){
                selectedPages[i].classList.toggle('active-page')
            }
        } 
        option.classList.toggle('active-page')
        records_per_page = option.textContent != 'All' ? parseInt(option.textContent) : 100000
        current_page = 1
        changePage(1)
    }
})


const listOfProducts = document.querySelectorAll('#item')

function getProductCount(){
    for (i=0; i < selectedPages.length; i++){
        if (selectedPages[i].classList.contains('active-page')){
            return parseInt(selectedPages[i].textContent)
        }
    } 
}

var current_page = 1;
var records_per_page = getProductCount();


function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    } 
}
    
function changePage(page)
{

    var firstFilter = [...listOfProducts]
        .filter(product => boxes.length === 0 || 
        boxes.includes('All') || 
        boxes.includes(product.getAttribute('value')))
    filteredProducts = firstFilter.filter(product => 
        product.querySelector('#item-title').textContent.toLowerCase().match(search.toLowerCase())
        )
   

    getSort(filteredProducts)
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.querySelector('#all-items-div')
    var page_span = document.getElementById("page");

    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";
    if (filteredProducts.length > 0){
        for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < filteredProducts.length; i++) {
            var clone = filteredProducts[i].cloneNode(true)
            clone.style.display = 'flex'
            listing_table.appendChild(clone);
            if (listBtn.classList.contains('active')){
                clone.classList.toggle('itemActive')
                clone.classList.toggle('item')
            }
            
        }
  
    } else {
        listing_table.innerHTML = '<p>No Match</p>'
    }
    
    // setItemStyle()
    page_span.innerHTML = page + " of " + numPages();

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages()
{
    return Math.ceil(filteredProducts.length / records_per_page);
}

window.onload = function() {
    // changePage(1);
    
};