"use strict";
var products = window.catalog;
var shoppingCart = JSON.parse(localStorage.getItem('cartStorage'));

(function onloadCartTotals() {
    var totals = localStorage.getItem('cartStorage');
    if (totals) {
        document.querySelector('#amount').textContent = "(" + shoppingCart.totalCount + ")";
        document.querySelector('#total-cost').textContent = "£" + shoppingCart.totalCost.toFixed(2);
    }
})();

(function renderItemFullView() {
    var id = window.location.hash.substr(4);
    var itemPage = document.querySelector(".item");
    var out = '';
    for (var i = 0; i < products.length; i++) {
        if (id === products[i].id) {
            if (products[i].colors.length === 0 || products[i].sizes.length === 0) {
                var size = `<span>Size:</span>
                <button class="item-prop size" type="button" disabled>not in stock</button>`;
                var color = `<span>Color:</span>
                <button class="item-prop color" type="button" disabled>not in stock</button>`;
            } else {
                size = `<span>Size:</span>
                <button class="item-prop size chosen-prop" type="button" value="${products[i].sizes[0]}">${products[i].sizes[0]}</button>`;
                for (var j = 1; j < products[i].sizes.length; j++) {
                    size += `<button class="item-prop size" type="button" value="${products[i].sizes[j]}">${products[i].sizes[j]}</button>`;
                }
                color = `<span>Color:</span>
            <button class="item-prop color chosen-prop" type="button" value="${products[i].colors[0]}">${products[i].colors[0]}</button>`;
                for (var k = 1; k < products[i].colors.length; k++) {
                    color += `<button class="item-prop color" type="button" value="${products[i].colors[k]}">${products[i].colors[k]}</button>`;
                }
            }
            out += `
       <div class="item-gallery">
            <img class="item-image-full" src="${products[i].preview[0]}" alt="">
            <div class="gallery-bar">
                <img class="item-image-thumb active-thumb" src="${products[i].preview[0]}" alt="">
                <img class="item-image-thumb" src="${products[i].preview[1]}" alt="">
                <img class="item-image-thumb" src="${products[i].preview[2]}" alt="">
            </div>
        </div>
        <div class="item-info" data-id="${products[i].id}">
            <h4>${products[i].title}</h4>
            <p>${products[i].description}</p>
            <span>&#163;${products[i].price.toFixed(2)}</span>
            <div class="item-info__size">${size}</div>
            <div class="item-info__color">${color}</div>
            <button class="bottom-section__button" type="button">Add to bag</button>
        </div>`;
        }
    }
    itemPage.innerHTML = out;
    viewGallery();
})();

function viewGallery() {
    var galleryBar = document.querySelector('.gallery-bar');
    var fullImage = document.querySelector('.item-image-full');
    if (galleryBar) {
        galleryBar.addEventListener('click', function (e) {
            if (e.target.classList.contains('item-image-thumb')) {
                setTimeout(function () {
                    var thumbnail = e.target;
                    var thumbnailsGrid = document.querySelectorAll('.item-image-thumb');
                    removeFilters(thumbnailsGrid, 'active-thumb');
                    thumbnail.classList.add('active-thumb');
                    if (thumbnail.getAttribute('src')) {
                        var preview = thumbnail.getAttribute('src');
                        fullImage.setAttribute('src', preview);
                    }
                }, 200)
            }
        });
    }
}

function removeFilters(thumbnailsGrid, filterClass) {
    for (var i = 0; i < thumbnailsGrid.length; i += 1) {
        thumbnailsGrid[i].classList.remove(filterClass);
    }
}

var buttonsContainer = document.querySelector('.item-info');
if (buttonsContainer) {
    buttonsContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('item-prop')) {
            changeActiveButton(e.target);
        }
    });
}

function changeActiveButton(target) {
    var buttons = target.parentNode.querySelectorAll('.item-prop');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('chosen-prop');
    }
    target.classList.add('chosen-prop');
}

var addItemButton = document.querySelector('.bottom-section__button');
if (addItemButton) {
    addItemButton.addEventListener('click', function () {
        window.cartStorage.addItemToCart(cloneObject(getItem()));
        window.updateTotals(window.cartStorage.totalCost, cartStorage.totalCount);
        document.location.href = 'shopping-bag.html';
    })
}

function cloneObject(object) {
    var obj = {};
    var properties = Object.getOwnPropertyNames(object);
    for (var i = 0; i < properties.length; i++) {
        obj[properties[i]] = object[properties[i]]
    }
    return obj;
}

function getItem() {
    var hash = window.location.hash;
    var id = hash.substring(4);
    for (var i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            setProperties(products[i]);
            return products[i]
        }
    }
}

function setProperties(item) {
    var properties = document.querySelectorAll('.item-prop');
    for (var i = 0; i < properties.length; i++) {
        if (properties[i].classList.contains('size')) {
            item.sizes = properties[i].value;
        }
        if (properties[i].classList.contains('color')) {
            item.colors = properties[i].value;
        }
    }
}

var storage = {
    get cartProps() {
        var properties = JSON.parse(localStorage.getItem('cartStorage')) || {};
        return properties;
    },

    set cartProps(uploadedStats) {
        localStorage.setItem('cartStorage', JSON.stringify(uploadedStats));
    }
};

(function () {
         var cartStorage =  {
            cart: storage.cartProps.cart || [],
            totalCost: storage.cartProps.totalCost || 0,
            totalCount: storage.cartProps.totalCount || 0,
            addItemToCart:
                function(item) {
                    item.id = this.cart.length;
                    item.quantity = 1;
                    item.sum = item.price * item.quantity;
                    this.cart.push(item);
                    this.totalCost += item.sum;
                    this.totalCount += 1;
                    updateState(this.cart, this.totalCost, this.totalCount);
                }
        };

    function updateState(cart, totalCost, totalCount) {
        storage.cartProps = {
            cart: cart,
            totalCost: totalCost,
            totalCount: totalCount
        };
    }
    window.cartStorage = cartStorage;
})();

window.updateTotals = function (totalCost, totalCount) {
    var totalCostField = document.querySelector('#total-cost');
    var totalCountField = document.querySelector('#amount');
    totalCostField.textContent = String.fromCharCode(163) + totalCost;
    totalCountField.textContent = '(' + totalCount + ')';
};

updateTotals(cartStorage.totalCost, cartStorage.totalCount);