"use strict";
var cartContainer = document.querySelector('.shopping-bag');
var shoppingCart = JSON.parse(localStorage.getItem('cartStorage'));

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
    <div class="shopping-bag__item" data-id="${shoppingCart.cart[i].id}>
    <div class="shopping-bag__image">
        <img src="${shoppingCart.cart[i].thumbnail}" alt="">
    </div>
    <div class="shopping-bag__info">
        <h4 class="title">${shoppingCart.cart[i].title}</h4>
        <p class="price">£${shoppingCart.cart[i].price}</p>
        <p>Color: <span class="color">${shoppingCart.cart[i].colors}</span></p>
        <p>Size: <span class="size">${shoppingCart.cart[i].sizes}</span></p>
        <p>Quantity: &nbsp;<img class="quantity-minus" src="img/desktop/minus.png" alt="">&nbsp;<span class="quantity">1</span>&nbsp;<img class="quantity-plus" src="img/desktop/plus.png" alt=""></p>
        <a href="#" class="remove-item-from-bag">Remove item</a>
    </div>
</div>`;
        }
        cartContainer.innerHTML = htmlItem;
}
renderShoppingBag();

    var removeButton = document.getElementsByClassName('remove-item-from-bag');
    for (let i = 0; i < shoppingCart.cart.length; i++) {
        removeButton[i].addEventListener('click', function () {
            shoppingCart.totalCost -= shoppingCart.cart[i].price;
            shoppingCart.totalCount -= 1;
            shoppingCart.cart.splice(i, 1);
            if (shoppingCart.cart.length) {
                localStorage.setItem('cartStorage', JSON.stringify(shoppingCart));
            } else {
                let cart = {
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



var quantity = +document.querySelector('.quantity').textContent;
console.log(quantity);
var plus = document.querySelectorAll('.quantity-plus');

for (var i =0; i < plus.length; i++) {
    plus[i].addEventListener('click', function () {
        for (var j = 0; j < shoppingCart.cart.length; j++){
            shoppingCart.cart[j].quantity += 1;
            shoppingCart.cart[j].sum = shoppingCart.cart[j].price * shoppingCart.cart[j].quantity;
                shoppingCart.totalCost = 0;
                shoppingCart.totalCost +=  shoppingCart.cart[j].sum;
            shoppingCart.totalCount += 1;
            localStorage.setItem('cartStorage', JSON.stringify(shoppingCart));
            location.reload();
        }
    })
}

var totalCartPrice = document.querySelector('#total-price');
    totalCartPrice.textContent = `£${shoppingCart.totalCost.toFixed(2)}`;

