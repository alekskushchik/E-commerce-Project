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
                "<div>" +
                "<p class=\"new-icon\">new</p>" +
                "<img src=\"" + goods[i].thumbnail + "\" alt=\"\">" +
                "<p class=\"items__title\">" + goods[i].title + "</p>" +
                "<p class=\"items__price\">" + "£" + goods[i].price.toFixed(2) + "</p>" +
                "</div>";
        } else {
            htmlNewArrivals +=
                "<div>" +
                "<img src=\"" + goods[i].thumbnail + "\" alt=\"\">" +
                "<p class=\"items__title\">" + goods[i].title + "</p>" +
                "<p class=\"items__price\">" + "£" + goods[i].price.toFixed(2) + "</p>" +
                "</div>";
        }
    }
    newArrivals.innerHTML = htmlNewArrivals;
}
renderCatalog();