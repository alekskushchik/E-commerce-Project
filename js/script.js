"use strict";

var ROOT_CATALOG = document.querySelector('.catalog');
var goods = catalog;

function sortByArrivals() {
    goods = _.orderBy(catalog, ['dateAdded'], ['desc']);
}
sortByArrivals();

function renderCatalog() {
    var htmlCatalog = '';
    for (var i = 0; i < goods.length; i++) {
        if (goods[i].hasNew) {
            htmlCatalog +=
                "<div class=\"catalog-item\">" +
                "<p class=\"new-icon\">new</p>" +
                "<div class=\"catalog-image\" data-id=\"" + goods[i].id + "\">" +
                "<a href=\"#\"><img src=\"" + goods[i].thumbnail + "\" alt=\"\">" +
                "<p>View item</p></a></div>" + "<div class=\"catalog-info\">" +
                "<h4>" + goods[i].title + "</h4><p>" + "£" + goods[i].price.toFixed(2) + "</p>" + "</div>" +
                "</div>"
            ;
        } else {
            htmlCatalog +=
            "<div class=\"catalog-item\">" +
            "<div class=\"catalog-image\" data-id=\"" + goods[i].id + "\">" +
            "<a href=\"#\"><img src=\"" + goods[i].thumbnail + "\" alt=\"\">" +
            "<p>View item</p></a></div>" + "<div class=\"catalog-info\">" +
            "<h4>" + goods[i].title + "</h4><p>" + "£" + goods[i].price.toFixed(2) + "</p>" + "</div>" +
            "</div>";
        }
    }

    ROOT_CATALOG.innerHTML = htmlCatalog;
}

renderCatalog();