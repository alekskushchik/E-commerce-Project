"use strict";
const ROOT_CATALOG = document.querySelector('.catalog');
const NEW_ARRIVALS = document.querySelector('.bottom-section__items');
let goods = Array.from(catalog);

// getting the products
class Products {
    render() {
        sortByArrivals();
        let htmlCatalog = '';
        goods.forEach(({id, title, price, thumbnail, hasNew}) => {
            if (hasNew) {
                htmlCatalog += `
            <div class="catalog-item">
                <p class="new-icon">new</p>
                <div class="catalog-image" data-id="${id}">
                    <a href="#"><img src="${thumbnail}" alt="">
                    <p>View item</p></a>
                </div>
                <div class="catalog-info">
                    <h4>${title}</h4>
                    <p>£${price.toFixed(2)}</p>
                </div>
            </div>`
            } else {
                htmlCatalog += `
            <div>
                <div class="catalog-image" data-id="${id}">
                    <a href="#"><img src="${thumbnail}" alt="">
                    <p>View item</p></a>
                </div>
                <div class="catalog-info">
                    <h4>${title}</h4>
                    <p>£${price.toFixed(2)}</p>
                </div>
            </div>`
            }
        });
        ROOT_CATALOG.innerHTML = htmlCatalog;
    }
    renderByArrivals() {
        for (let i = 0; i < 4; i++) {
            let out = '';
            out += `<div>
                    <p class="new-icon">new</p>
                    <img src="${goods[i].thumbnail}" alt="">
                    <p class="items__title">${goods[i].title}</p>
                    <p class="items__price">£${goods[i].price.toFixed(2)}</p>
                </div>`;
            NEW_ARRIVALS.innerHTML = out;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const products = new Products();
    products.render();
    products.renderByArrivals();
    Storage.saveProducts(catalog);
});

function sortByArrivals() {
    goods = _.orderBy(catalog, ['dateAdded'], ['desc']);
}
// Local Storage
class Storage {
    static saveProducts(catalog) {
        localStorage.setItem("products", JSON.stringify(catalog))
    }

    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id === id)
    }

    static saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    static getCart() {
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    }
}

