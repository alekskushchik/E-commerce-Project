"use strict";
var goods = catalog;
var newArrivals = document.querySelector('.new-arrivals');

function sortByArrivals() {
    goods = _.orderBy(catalog, ['dateAdded'], ['desc']);
}
sortByArrivals();

function renderCatalog() {
        var htmlNewArrivals = '';
    for (var i = 0; i < 4; i++) {
        if (goods[i].hasNew) {
            htmlNewArrivals +=
                "<div class=\"catalog-item\" data-fashion=\"" + goods[i].fashion + "\">" +
                "<p class=\"new-icon\">new</p>" +
                "<div class=\"catalog-image\">" +
                "<a href=\"#\"><img src=\"" + goods[i].thumbnail + "\" alt=\"\">" +
                "<p>View item</p></a></div>" + "<div class=\"catalog-info\">" +
                "<h4>" + goods[i].title + "</h4><p>" + "£" + goods[i].price.toFixed(2) + "</p>" + "</div>" +
                "</div>"
        } else {
            htmlNewArrivals +=
                "<div class=\"catalog-item\" data-fashion=\"" + goods[i].fashion + "\">" +
                "<div class=\"catalog-image\">" +
                "<a href=\"#\"><img src=\"" + goods[i].thumbnail + "\" alt=\"\">" +
                "<p>View item</p></a></div>" + "<div class=\"catalog-info\">" +
                "<h4>" + goods[i].title + "</h4><p>" + "£" + goods[i].price.toFixed(2) + "</p>" + "</div>" +
                "</div>"
        }
    }
    newArrivals.innerHTML = htmlNewArrivals;
}
renderCatalog();

function searchByStyle() {
    let input = document.querySelector('input');
    let filter = input.value.toUpperCase();
    let goods = document.getElementsByClassName('catalog-item');
    for (let i = 0; i < goods.length; i++) {
        if (goods[i].getAttribute('data-fashion').toUpperCase().indexOf(filter) > -1) {
            goods[i].style.display = "";
        } else {
            goods[i].style.display = "none";
        }
    }
}