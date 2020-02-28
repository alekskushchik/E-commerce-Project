"use strict";
// getting variables
var products = window.catalog;
var beforePromo = document.querySelector('.before-promo');
var promo = document.querySelector('.promo');
var afterPromo = document.querySelector('.after-promo');
var items = document.getElementsByClassName('catalog-item');
var input = document.querySelector('input');
var filter = input.value.toUpperCase();

function sortByArrivals() {
    products = _.orderBy(catalog, ['dateAdded'], ['desc']);
}
sortByArrivals();

function renderCatalog() {
    //rendering catalog items above promobar
    var htmlBeforePromo = '';
    for (var i = 0; i < 4; i++) {
        if (products[i].hasNew) {
            htmlBeforePromo +=
                "<div class=\"catalog-item\" data-id=\"" + products[i].id + "\" data-fashion=\"" + products[i].fashion + "\">" +
                "<p class=\"new-icon\">new</p>" +
                "<div class=\"catalog-image\">" +
                "<a href=\"item.html#id=" + products[i].id + "\"><img src=\"" + products[i].thumbnail + "\" alt=\"\">" +
                "<p>View item</p></a></div>" + "<div class=\"catalog-info\">" +
                "<h4>" + products[i].title + "</h4><p>" + "£" + products[i].price.toFixed(2) + "</p>" + "</div>" +
                "</div>"
            ;
        } else {
            htmlBeforePromo +=
            "<div class=\"catalog-item\" data-id=\"" + products[i].id + "\" data-fashion=\"" + products[i].fashion + "\">" +
            "<div class=\"catalog-image\">" +
            "<a href=\"item.html#id=" + products[i].id + "\"><img src=\"" + products[i].thumbnail + "\" alt=\"\">" +
            "<p>View item</p></a></div>" + "<div class=\"catalog-info\">" +
            "<h4>" + products[i].title + "</h4><p>" + "£" + products[i].price.toFixed(2) + "</p>" + "</div>" +
            "</div>";
        }
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
        if (products[i].hasNew) {
            htmlAfterPromo +=
                "<div class=\"catalog-item\" data-id=\"" + products[i].id + "\" data-fashion=\"" + products[i].fashion + "\">" +
                "<p class=\"new-icon\">new</p>" +
                "<div class=\"catalog-image\">" +
                "<a href=\"item.html#id=" + products[i].id + "\"><img src=\"" + products[i].thumbnail + "\" alt=\"\">" +
                "<p>View item</p></a></div>" + "<div class=\"catalog-info\">" +
                "<h4>" + products[i].title + "</h4><p>" + "£" + products[i].price.toFixed(2) + "</p>" + "</div>" +
                "</div>"
            ;
        } else {
            htmlAfterPromo +=
                "<div class=\"catalog-item\" data-id=\"" + products[i].id + "\" data-fashion=\"" + products[i].fashion + "\">" +
                "<div class=\"catalog-image\">" +
                "<a href=\"item.html#id=" + products[i].id + "\"><img src=\"" + products[i].thumbnail + "\" alt=\"\">" +
                "<p>View item</p></a></div>" + "<div class=\"catalog-info\">" +
                "<h4>" + products[i].title + "</h4><p>" + "£" + products[i].price.toFixed(2) + "</p>" + "</div>" +
                "</div>";
        }
    }
    afterPromo.innerHTML = htmlAfterPromo;
}
renderCatalog();

function searchByStyle() {
    for (var i = 0; i < products.length; i++) {
        if (items[i].getAttribute('data-fashion').toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
}
function updateTotals (totalCost, totalCount) {
    var totalCostField = document.querySelector('#total-price');
    var totalCountField = document.querySelector('#amount');
      
    totalCostField.textContent = String.fromCharCode(163) + totalCost;
    totalCountField.textContent = '(' + totalCount + ')';
}
updateTotals(window.bagStorage.totalCost, window.bagStorage.totalCount);