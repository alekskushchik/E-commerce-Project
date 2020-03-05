"use strict";
var cartContainer = document.querySelector('.shopping-bag');
var shoppingCart = JSON.parse(localStorage.getItem('cartStorage'));

var burgerIcon = document.querySelector("#dropdown-button");
var closeBurgerIcon = document.querySelector("#close-dropdown");
var menuContainer = document.querySelector(".navigation-menu");

burgerIcon.addEventListener('click', toggleNavigationMenu);
closeBurgerIcon.addEventListener('click', toggleNavigationMenu);

function toggleNavigationMenu () {
    if (menuContainer.style.display === 'block') {
        menuContainer.style.display = 'none';
        burgerIcon.classList.toggle('hidden');
        closeBurgerIcon.classList.toggle('hidden')
    } else {
        menuContainer.style.display = 'block';
        document.querySelector('.navigation-menu').classList.add('openMenu');
        burgerIcon.classList.toggle('hidden');
        closeBurgerIcon.classList.toggle('hidden')
    }
}
(function onloadCartTotals() {
    var totals = localStorage.getItem('cartStorage');
    if (totals) {
        document.querySelector('#amount').textContent = "(" + shoppingCart.totalCount + ")";
        document.querySelector('#total-cost').textContent = "£" + shoppingCart.totalCost.toFixed(2);
    }
})();

function renderShoppingBag() {
    let htmlItem = '';
    for (var i = 0; i < shoppingCart.cart.length; i++) {
        htmlItem += `
    <div class="shopping-bag__item" data-id="${shoppingCart.cart[i].id}">
        <div class="shopping-bag__image">
            <img src="${shoppingCart.cart[i].thumbnail}" alt="">
        </div>
    <div class="shopping-bag__info">
        <h4 class="title">${shoppingCart.cart[i].title}</h4>
        <p class="price">£${shoppingCart.cart[i].price}</p>
        <p>Color: <span class="color">${shoppingCart.cart[i].colors}</span></p>
        <p>Size: <span class="size">${shoppingCart.cart[i].sizes}</span></p>
        <p>Quantity: &nbsp;<img class="quantity-minus" src="img/desktop/minus.png" alt="" data-id="${shoppingCart.cart[i].id}">&nbsp;<span class="quantity">${shoppingCart.cart[i].quantity}</span>&nbsp;<img class="quantity-plus" src="img/desktop/plus.png" alt="" data-id="${shoppingCart.cart[i].id}"></p>
        <a href="#" class="remove-item-from-bag">Remove item</a>
    </div>    
    </div>
</div>`;
    }
    cartContainer.innerHTML = htmlItem;

}
renderShoppingBag();

var removeButton = document.getElementsByClassName('remove-item-from-bag');
for (let i = 0; i < shoppingCart.cart.length; i++) {
    removeButton[i].addEventListener('click', function () {
        shoppingCart.totalCost -= shoppingCart.cart[i].price * shoppingCart.cart[i].quantity;
        shoppingCart.totalCount -= 1;
        shoppingCart.cart.splice(i, 1);
        if (shoppingCart.cart.length) {
            localStorage.setItem('cartStorage', JSON.stringify(shoppingCart));
        } else {
            var cart = {
                cart: [],
                totalCost: 0,
                totalCount: 0
            };
            localStorage.setItem('cartStorage', JSON.stringify(cart))
        }
        renderShoppingBag();
        location.reload()
    })
}

var emptyBag = document.querySelector('#clear-bag');
emptyBag.addEventListener('click', function () {
    let cart = {
        cart: [],
        totalCost: 0,
        totalCount: 0
    };
    localStorage.setItem('cartStorage', JSON.stringify(cart));
    renderShoppingBag();
    location.reload();
});

var plus = document.querySelectorAll('.quantity-plus');
for (var i =0; i < plus.length; i++) {
    plus[i].addEventListener('click', function () {
        shoppingCart.totalCost = 0;
        for (var j = 0; j < shoppingCart.cart.length; j++){
            if (+this.getAttribute('data-id') === shoppingCart.cart[j].id){
                shoppingCart.totalCount += 1;
                shoppingCart.cart[j].quantity += 1;
                shoppingCart.cart[j].sum = shoppingCart.cart[j].price * shoppingCart.cart[j].quantity;
                for (i = 0; i < shoppingCart.cart.length; i++){
                    shoppingCart.totalCost += shoppingCart.cart[i].sum;
                }
                localStorage.setItem('cartStorage', JSON.stringify(shoppingCart));
                renderShoppingBag();
                location.reload();
            }
        }
    })
}
var minus = document.querySelectorAll('.quantity-minus');
for (var i =0; i < minus.length; i++) {
    minus[i].addEventListener('click', function () {
        shoppingCart.totalCost = 0;
        for (var j = 0; j < shoppingCart.cart.length; j++){
            if (+this.getAttribute('data-id') === shoppingCart.cart[j].id){
                shoppingCart.totalCount--;
                shoppingCart.cart[j].quantity--;
                if (shoppingCart.cart[j].quantity < 0){
                    shoppingCart.cart[j].quantity = 0
                }
                if (shoppingCart.totalCount < 0){
                    shoppingCart.totalCount = 0
                }
                shoppingCart.cart[j].sum = shoppingCart.cart[j].price * shoppingCart.cart[j].quantity;
                for (i = 0; i < shoppingCart.cart.length; i++){
                    shoppingCart.totalCost -= shoppingCart.cart[i].sum;
                }
                localStorage.setItem('cartStorage', JSON.stringify(shoppingCart));
                renderShoppingBag();
                location.reload();
            }
        }
    })
}


var quantity = document.querySelectorAll('.quantity');
for (i = 0; i < quantity.length; i++){
    quantity[i].textContent = shoppingCart.cart[i].quantity;
}

var totalCartPrice = document.querySelector('#total-price');
totalCartPrice.textContent = `£${shoppingCart.totalCost.toFixed(2)}`;