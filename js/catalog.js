"use strict";
var goods = catalog;
console.log(goods);
var beforePromo = document.querySelector('.before-promo');
var promo = document.querySelector('.promo');
var afterPromo = document.querySelector('.after-promo');

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
                "<div class=\"catalog-item\" data-fashion=\"" + goods[i].fashion + "\">" +
                "<p class=\"new-icon\">new</p>" +
                "<div class=\"catalog-image\">" +
                "<a href=\"#\"><img src=\"" + goods[i].thumbnail + "\" alt=\"\">" +
                "<p>View item</p></a></div>" + "<div class=\"catalog-info\">" +
                "<h4>" + goods[i].title + "</h4><p>" + "£" + goods[i].price.toFixed(2) + "</p>" + "</div>" +
                "</div>"
            ;
        } else {
            htmlBeforePromo +=
            "<div class=\"catalog-item\" data-fashion=\"" + goods[i].fashion + "\">" +
            "<div class=\"catalog-image\">" +
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
                "<div class=\"catalog-item\" data-fashion=\"" + goods[i].fashion + "\">" +
                "<p class=\"new-icon\">new</p>" +
                "<div class=\"catalog-image\">" +
                "<a href=\"#\"><img src=\"" + goods[i].thumbnail + "\" alt=\"\">" +
                "<p>View item</p></a></div>" + "<div class=\"catalog-info\">" +
                "<h4>" + goods[i].title + "</h4><p>" + "£" + goods[i].price.toFixed(2) + "</p>" + "</div>" +
                "</div>"
            ;
        } else {
            htmlAfterPromo +=
                "<div class=\"catalog-item\" data-fashion=\"" + goods[i].fashion + "\">" +
                "<div class=\"catalog-image\">" +
                "<a href=\"#\"><img src=\"" + goods[i].thumbnail + "\" alt=\"\">" +
                "<p>View item</p></a></div>" + "<div class=\"catalog-info\">" +
                "<h4>" + goods[i].title + "</h4><p>" + "£" + goods[i].price.toFixed(2) + "</p>" + "</div>" +
                "</div>";
        }
    }
    afterPromo.innerHTML = htmlAfterPromo;
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