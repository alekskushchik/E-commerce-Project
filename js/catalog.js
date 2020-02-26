"use strict";
var goods = catalog;
var beforePromo = document.querySelector('.before-promo');
var promo = document.querySelector('.promo');
var afterPromo = document.querySelector('.after-promo');
var newArrivals = document.querySelector('.new-arrivals');

console.log(newArrivals);
function sortByArrivals() {
    goods = _.orderBy(catalog, ['dateAdded'], ['desc']);
}
sortByArrivals();

function renderCatalog() {
    promo.innerHTML =
        "<h2>Last weekend" + "<span>extra 50%</span>" + "off on all reduced boots and shoulder bags" + "</h2>" +
        "<p>This offer is valid in-store and online. Prices displayed reflect this additional discount. " +
        "This offer ends at 11:59 GMT on March 1st 2019</p>";

    var htmlBeforePromo = '';
    for (var i = 0; i < 4; i++) {
        if (goods[i].hasNew) {
            htmlBeforePromo +=
                "<div class=\"catalog-item\">" +
                "<p class=\"new-icon\">new</p>" +
                "<div class=\"catalog-image\" data-id=\"" + goods[i].id + "\">" +
                "<a href=\"#\"><img src=\"" + goods[i].thumbnail + "\" alt=\"\">" +
                "<p>View item</p></a></div>" + "<div class=\"catalog-info\">" +
                "<h4>" + goods[i].title + "</h4><p>" + "£" + goods[i].price.toFixed(2) + "</p>" + "</div>" +
                "</div>"
            ;
        } else {
            htmlBeforePromo +=
            "<div class=\"catalog-item\">" +
            "<div class=\"catalog-image\" data-id=\"" + goods[i].id + "\">" +
            "<a href=\"#\"><img src=\"" + goods[i].thumbnail + "\" alt=\"\">" +
            "<p>View item</p></a></div>" + "<div class=\"catalog-info\">" +
            "<h4>" + goods[i].title + "</h4><p>" + "£" + goods[i].price.toFixed(2) + "</p>" + "</div>" +
            "</div>";
        }
    }
    beforePromo.innerHTML = htmlBeforePromo;

    var htmlAfterPromo = '';
    for (var i = 4; i < goods.length; i++) {
        if (goods[i].hasNew) {
            htmlAfterPromo +=
                "<div class=\"catalog-item\">" +
                "<p class=\"new-icon\">new</p>" +
                "<div class=\"catalog-image\" data-id=\"" + goods[i].id + "\">" +
                "<a href=\"#\"><img src=\"" + goods[i].thumbnail + "\" alt=\"\">" +
                "<p>View item</p></a></div>" + "<div class=\"catalog-info\">" +
                "<h4>" + goods[i].title + "</h4><p>" + "£" + goods[i].price.toFixed(2) + "</p>" + "</div>" +
                "</div>"
            ;
        } else {
            htmlAfterPromo +=
                "<div class=\"catalog-item\">" +
                "<div class=\"catalog-image\" data-id=\"" + goods[i].id + "\">" +
                "<a href=\"#\"><img src=\"" + goods[i].thumbnail + "\" alt=\"\">" +
                "<p>View item</p></a></div>" + "<div class=\"catalog-info\">" +
                "<h4>" + goods[i].title + "</h4><p>" + "£" + goods[i].price.toFixed(2) + "</p>" + "</div>" +
                "</div>";
        }
    }
    afterPromo.innerHTML = htmlAfterPromo;

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