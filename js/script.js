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
        console.log(goods[i].id);

        if (goods[i].hasNew) {
            htmlCatalog += "\n            <div class=\"catalog-item\">\n                <p class=\"new-icon\">new</p>\n                <div class=\"catalog-image\" data-id=\"" + goods[i].id + "\">\n                    <a href=\"#\"><img src=\"" + goods[i].thumbnail + "\" alt=\"\">\n                    <p>View item</p></a>\n                </div>\n                <div class=\"catalog-info\">\n                    <h4>" + goods[i].title + "</h4>\n                    <p>\xA3" + goods[i].price + "</p>\n                </div>\n            </div>";
        } else {
            htmlCatalog += "\n            <div class=\"catalog-item\">\n                <div class=\"catalog-image\" data-id=\"" + goods[i].id + "\">\n                    <a href=\"#\"><img src=\"" + goods[i].thumbnail + "\" alt=\"\">\n                    <p>View item</p></a>\n                </div>\n                <div class=\"catalog-info\">\n                    <h4>" + goods[i].title + "</h4>\n                    <p>\xA3" + goods[i].price + "</p>\n                </div>\n            </div>";
        }
    }

    ROOT_CATALOG.innerHTML = htmlCatalog;
}

renderCatalog();