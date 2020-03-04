"use strict";
var products = catalog;
var shoppingCart = JSON.parse(localStorage.getItem('cartStorage'));
var newArrivals = document.querySelector('.new-arrivals');
/////////
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

function renderCatalog() {
        var htmlNewArrivals = '';
    for (var i = 0; i < 4; i++) {
        if (products[i].hasNew) {
            htmlNewArrivals +=
                "<div class=\"catalog-item\" data-fashion=\"" + products[i].fashion + "\">" +
                "<p class=\"new-icon\">new</p>" +
                "<div class=\"catalog-image\">" +
                "<a href=\"item.html#id=" + products[i].id + "\"><img src=\"" + products[i].thumbnail + "\" alt=\"\">" +
                "<p>View item</p></a></div>" + "<div class=\"catalog-info\">" +
                "<h4>" + products[i].title + "</h4><p>" + "£" + products[i].price.toFixed(2) + "</p>" + "</div>" +
                "</div>"
        } else {
            htmlNewArrivals +=
                "<div class=\"catalog-item\" data-fashion=\"" + products[i].fashion + "\">" +
                "<div class=\"catalog-image\">" +
                "<a href=\"item.html#id=" + products[i].id + "\"><img src=\"" + products[i].thumbnail + "\" alt=\"\">" +
                "<p>View item</p></a></div>" + "<div class=\"catalog-info\">" +
                "<h4>" + products[i].title + "</h4><p>" + "£" + products[i].price.toFixed(2) + "</p>" + "</div>" +
                "</div>"
        }
    }
    newArrivals.innerHTML = htmlNewArrivals;
}
renderCatalog();

function searchByStyle() {
    let input = document.querySelector('input');
    let filter = input.value.toUpperCase();
    let products = document.getElementsByClassName('catalog-item');
    for (let i = 0; i < products.length; i++) {
        if (products[i].getAttribute('data-fashion').toUpperCase().indexOf(filter) > -1) {
            products[i].style.display = "";
        } else {
            products[i].style.display = "none";
        }
    }
}

