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
        // spacer.style.height = '210px' 
        console.log('true');
        
    } else {
        console.log(window.pageYOffset);
        console.log(getHeightNav);
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
