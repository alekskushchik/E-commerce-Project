"use strict";
var products = catalog;
var newArrivals = document.querySelector('.new-arrivals');

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
    for (let i = 0; i < goods.length; i++) {
        if (products[i].getAttribute('data-fashion').toUpperCase().indexOf(filter) > -1) {
            products[i].style.display = "";
        } else {
            products[i].style.display = "none";
        }
    }
}