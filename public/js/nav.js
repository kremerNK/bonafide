var navbar = document.querySelector('#navbar')
var getHeightNav = document.querySelector('.slide-show') ? 
document.querySelector('.slide-show').offsetHeight :
1
var padding = navbar.getBoundingClientRect().height
var spacer = document.querySelector('#spacer')
var logoShrink = document.querySelector('#top-banner-img')
var test = document.querySelector('.homepage-section')



window.onscroll = function () {scroll()};

function scroll(){
    if (window.pageYOffset >= getHeightNav){
        
        logoShrink.style.height = '50px'
        navbar.classList.add('sticky');
        spacer.style.height = padding.toString().concat('px')

        
    } else {
        navbar.classList.remove('sticky')
        // spacer.style.height = '0px'
        logoShrink.style.height = '125px'
    }
} 

var shopNowCat = document.querySelectorAll('#cat')

shopNowCat.forEach((item) => item.onclick = () => {
 
    localStorage.setItem('catStorage', item.textContent)
})


////add items to cart//////
  

function addCart(){
    var target = this.event.target;
    var ancestor = target.closest('#item')
    var addItem = {};
    addItem.image = ancestor.querySelector('#product-img').src
    addItem.title = ancestor.querySelector("#item-title").textContent
    addItem.price = ancestor.querySelector('#item-price').textContent
    addItem.quantity = '1'
    var id = ancestor.querySelector('#item-id').getAttribute('value')
    var parsedStorage = JSON.parse(localStorage.getItem('cart')) || []

    var toPush = {id: id, value: addItem}

    var exists = false
    parsedStorage.forEach((x) => {
        if (x.id == toPush.id){
            exists = true
        }
        
    })
    if (exists == false){
        parsedStorage.push(toPush)
    }

    localStorage.setItem('cart', JSON.stringify(parsedStorage))

}

// push({[id]: addItem})

