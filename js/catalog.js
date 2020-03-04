"use strict";
// getting variables
var products = window.catalog,
    shoppingCart = JSON.parse(localStorage.getItem('cartStorage')),
    beforePromo = document.querySelector('.before-promo'),
    promo = document.querySelector('.promo'),
    afterPromo = document.querySelector('.after-promo'),
    items = document.getElementsByClassName('catalog-item'),
    input = document.querySelector('input'),
    filter = input.value.toUpperCase();

var burgerIcon = document.querySelector("#dropdown-button");
var closeBurgerIcon = document.querySelector("#close-dropdown");
var menuContainer = document.querySelector(".navigation-menu");

burgerIcon.addEventListener('click', toggleNavigationMenu);
closeBurgerIcon.addEventListener('click', toggleNavigationMenu);

function toggleNavigationMenu () {
    if (menuContainer.style.display === 'block') {
        menuContainer.style.display = 'none';
        burgerIcon.classList.toggle('hidden');
        closeBurgerIcon.classList.toggle('hidden')
    } else {
        menuContainer.style.display = 'block';
        document.querySelector('.navigation-menu').classList.add('openMenu');
        burgerIcon.classList.toggle('hidden');
        closeBurgerIcon.classList.toggle('hidden')
    }
}

(function onloadCartTotals() {
    var totals = localStorage.getItem('cartStorage');
    if (totals) {
        document.querySelector('#amount').textContent = "(" + shoppingCart.totalCount + ")";
        document.querySelector('#total-cost').textContent = "£" + shoppingCart.totalCost.toFixed(2);
    }
})();

function sortByArrivals() {
    products = _.orderBy(catalog, ['dateAdded'], ['desc']);
}
sortByArrivals();


// rendering catalog items above promobar
(function renderCatalog() {
    var htmlBeforePromo = '';
    for (var i = 0; i < 4; i++) {
            htmlBeforePromo +=
                "<div class=\"catalog-item\" data-id=\"" + products[i].id + "\" data-fashion=\"" + products[i].fashion + "\">" +
                "<p class=\"new-icon\">new</p>" +
                "<div class=\"catalog-image\">" +
                "<a href=\"item.html#id=" + products[i].id + "\"><img src=\"" + products[i].thumbnail + "\" alt=\"\">" +
                "<p>View item</p></a></div>" + "<div class=\"catalog-info\">" +
                "<h4>" + products[i].title + "</h4>" + "<p><span class='discount'><img src=\"img/desktop/crossline.png\" alt=\"\">" + "£" + products[i].discountedPrice + "</span>" + "£" + products[i].price.toFixed(2) + "</p>" + "</div>" +
                "</div>";
    }
    beforePromo.innerHTML = htmlBeforePromo;
    // rendering promobar
    promo.innerHTML =
        "<h2>Last weekend" + " " + "<span>extra 50%</span>" + " " + "off on all reduced boots and shoulder bags" + "</h2>" +
        "<p>This offer is valid in-store and online. Prices displayed reflect this additional discount. " +
        "This offer ends at 11:59 GMT on March 1st 2019</p>";
    //rendering catalog items in the bottom of promobar
    var htmlAfterPromo = '';
    for (var i = 4; i < products.length; i++) {
            htmlAfterPromo +=
                "<div class=\"catalog-item\" data-id=\"" + products[i].id + "\" data-fashion=\"" + products[i].fashion + "\">" +
                "<p class=\"new-icon\">new</p>" +
                "<div class=\"catalog-image\">" +
                "<a href=\"item.html#id=" + products[i].id + "\"><img src=\"" + products[i].thumbnail + "\" alt=\"\">" +
                "<p>View item</p></a></div>" + "<div class=\"catalog-info\">" +
                "<h4>" + products[i].title + "</h4>" + "<p><span class='discount'><img src=\"img/desktop/crossline.png\" alt=\"\">" + "£" + products[i].discountedPrice + "</span>" + "£" + products[i].price.toFixed(2) + "</p>" + "</div>" +
                "</div>";
    }
    afterPromo.innerHTML = htmlAfterPromo;
    var newLabel = document.querySelectorAll('.new-icon');
    for (var j = 0; j < newLabel.length; j++){
        if (products[j].hasNew === false){
            newLabel[j].classList.toggle('hidden-discount');
        }
    }
    var discount = document.querySelectorAll('.discount');
    for (var k = 0; k < discount.length; k++){
        if (products[k].discountedPrice === products[k].price || products[k].discountedPrice === null){
            discount[k].classList.toggle('hidden-discount');
        }
    }

})();

function searchByStyle() {
    for (var i = 0; i < products.length; i++) {
        if (items[i].getAttribute('data-fashion').toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
}