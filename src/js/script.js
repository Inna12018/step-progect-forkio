// HEAD

// меню бургер
const hamburger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__nav');
if (hamburger) {
    hamburger.addEventListener("click", function (e) {
        document.body.classList.toggle('lock');
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
    });
}


// прокрутка при клике

const menuLinks = document.querySelectorAll('.header__link[data-goto]');

if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

}

function onMenuLinkClick(e) {
    const headerLink = e.target;
    if (headerLink.dataset.goto && document.querySelector(headerLink.dataset.goto)) {
        const gotoBlock = document.querySelector(headerLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

        if (menu.classList.contains('active')) {
            document.body.classList.remove('lock');
            hamburger.classList.remove('active');
            menu.classList.remove('active');

        }

        window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
        });
        e.preventDefault();
    }
}