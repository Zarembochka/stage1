const btnBurger = document.querySelector('.button-burger');
const header = document.querySelector('.header');
const header__nav = document.querySelector('.header__nav');
const headerLinks = document.querySelectorAll('.header__link');
const headerMenuLink = document.querySelector('.header__menu__link');

btnBurger.addEventListener('click', function(event) {
    event._isClickOnTneBurgerMenu = true;
    burger();
});

headerLinks.forEach(element => {
    element.addEventListener('click', clickOnTheLink);
});

headerMenuLink.addEventListener('click', (event) => {
    event.preventDefault();
    clickOnTheLink();
});

function burger() {
    header.classList.toggle('show');
    stopScroll();
}

function stopScroll() {
    document.body.style.paddingRight = calcRightPadding();
    document.body.classList.toggle('show-menu');
}

function allowScroll() {
    document.body.style.paddingRight = '';
    document.body.classList.remove('show-menu');
}

function clickOnTheLink() {
    header.classList.remove('show');
    allowScroll();
}



