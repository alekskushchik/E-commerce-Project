"use strict";

var products = window.catalog;
var shoppingCart = JSON.parse(localStorage.getItem('cartStorage'));
var burgerIcon = document.querySelector("#dropdown-button");
var closeBurgerIcon = document.querySelector("#close-dropdown");
var menuContainer = document.querySelector(".navigation-menu");

var _size, _color;

burgerIcon.addEventListener('click', toggleNavigationMenu);
closeBurgerIcon.addEventListener('click', toggleNavigationMenu);

function toggleNavigationMenu() {
    if (menuContainer.style.display === 'block') {
        menuContainer.style.display = 'none';
        burgerIcon.classList.toggle('hidden');
        closeBurgerIcon.classList.toggle('hidden');
    } else {
        menuContainer.style.display = 'block';
        document.querySelector('.navigation-menu').classList.add('openMenu');
        burgerIcon.classList.toggle('hidden');
        closeBurgerIcon.classList.toggle('hidden');
    }
}

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
                var size = "<span>Size:</span>\n                <button class=\"item-prop size\" type=\"button\" disabled>not in stock</button>";
                var color = "<span>Color:</span>\n                <button class=\"item-prop color\" type=\"button\" disabled>not in stock</button>";
                var addBtn = "<button class=\"bottom-section__button\" type=\"button\" disabled>Add to bag</button>";
            } else {
                size = "<span>Size:</span>\n                <button class=\"item-prop size chosen-prop\" type=\"button\" value=\"".concat(products[i].sizes[0], "\">").concat(products[i].sizes[0], "</button>");

                for (var j = 1; j < products[i].sizes.length; j++) {
                    size += "<button class=\"item-prop size\" type=\"button\" value=\"".concat(products[i].sizes[j], "\">").concat(products[i].sizes[j], "</button>");
                }

                color = "<span>Color:</span>\n            <button class=\"item-prop color chosen-prop\" type=\"button\" value=\"".concat(products[i].colors[0], "\">").concat(products[i].colors[0], "</button>");

                for (var k = 1; k < products[i].colors.length; k++) {
                    color += "<button class=\"item-prop color\" type=\"button\" value=\"".concat(products[i].colors[k], "\">").concat(products[i].colors[k], "</button>");
                }

                _size = products[i].sizes[0];
                _color = products[i].colors[0];
                addBtn = "<button class=\"bottom-section__button\" type=\"button\">Add to bag</button>";
            }

            out += "<div class=\"item-gallery\"><img class=\"item-image-full\" src=\"".concat(products[i].preview[0], "\" alt=\"\">" +
                "<div class=\"gallery-bar\"><img class=\"item-image-thumb active-thumb\" src=\"").concat(products[i].preview[0], "\" alt=\"\"><img class=\"item-image-thumb\" src=\"").concat(products[i].preview[1], "\" alt=\"\"><img class=\"item-image-thumb\" src=\"").concat(products[i].preview[2], "\" alt=\"\"></div></div>" +
                "<div class=\"item-info\" data-id=\"").concat(products[i].id, "\"><h4>").concat(products[i].title, "</h4><p>").concat(products[i].description, "</p><span>&#163;").concat(products[i].price.toFixed(2), "</span><div class=\"item-info__size\">").concat(size, "</div><div class=\"item-info__color\">").concat(color, "</div>").concat(addBtn, "</div>");
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
                }, 200);
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
            if (e.target.classList.contains('size')) {
                _size = e.target.value;
            } else if (e.target.classList.contains('color')) {
                _color = e.target.value;
            }

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
        window.updateTotals(window.cartStorage.totalCost, window.cartStorage.totalCount, window.cartStorage.totalDiscount);
        document.location.href = 'shopping-bag.html';
    });
}

function cloneObject(object) {
    var obj = {};
    var properties = Object.getOwnPropertyNames(object);

    for (var i = 0; i < properties.length; i++) {
        obj[properties[i]] = object[properties[i]];
    }

    obj['sizes'] = _size;
    obj['colors'] = _color;
    return obj;
}

function getItem() {
    var hash = window.location.hash;
    var id = hash.substring(4);

    for (var i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            setProperties(products[i]);
            return products[i];
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
    var cartStorage = {
        cart: storage.cartProps.cart || [],
        totalCost: storage.cartProps.totalCost || 0,
        totalCount: storage.cartProps.totalCount || 0,
        totalDiscount: storage.cartProps.totalDiscount || 0,
        addItemToCart: function addItemToCart(item) {
            item.id = this.cart.length;
            this.cart.push(item);
            item.quantity = 1;
            item.discount = 0;

            if (item.discountedPrice !== item.price) {
                item.sum = item.discountedPrice * item.quantity;
            } else {
                item.sum = item.price * item.quantity;
            }

            this.totalCost += item.sum;
            this.totalCount += 1;
            this.totalDiscount += (item.price - item.discountedPrice) * item.quantity;
            updateState(this.cart, this.totalCost, this.totalCount, this.totalDiscount);
        }
    };

    function updateState(cart, totalCost, totalCount, totalDiscount) {
        storage.cartProps = {
            cart: cart,
            totalCost: totalCost,
            totalCount: totalCount,
            totalDiscount: totalDiscount
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
