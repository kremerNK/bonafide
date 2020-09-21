var navbar = document.querySelector('#navbar')
var getHeight = document.querySelector('.slide-show').offsetHeight
var padding = navbar.getBoundingClientRect().height
var spacer = document.querySelector('#spacer')
var logoShrink = document.querySelector('#top-banner-img')
var test = document.querySelector('.homepage-section')

console.log(spacer.offsetHeight);

window.onscroll = function () {scroll()};

function scroll(){
    if (window.pageYOffset >= getHeight){
        logoShrink.style.height = '50px'
        navbar.classList.add('sticky');
        spacer.style.height = padding.toString().concat('px')
        // spacer.style.height = '210px'
        
    } else {
        navbar.classList.remove('sticky')
        // spacer.style.height = '0px'
        logoShrink.style.height = '125px'
    }
}