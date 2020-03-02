"use strict";
var cartContainer = document.querySelector('.shopping-bag');
var shoppingCart = JSON.parse(localStorage.getItem('cartStorage'));

(function onloadCartTotals() {
    var totals = localStorage.getItem('cartStorage');
    if (totals) {
        document.querySelector('#amount').textContent = "(" + shoppingCart.totalCount + ")";
        document.querySelector('#total-cost').textContent = "£" + shoppingCart.totalCost;
    }
})();
window.updateTotals = function (totalCost, totalCount) {
    var totalCostField = document.querySelector('#total-cost');
    var totalCountField = document.querySelector('#amount');
    totalCostField.textContent = String.fromCharCode(163) + totalCost;
    totalCountField.textContent = '(' + totalCount + ')';
};
function renderShoppingBag() {
        let htmlItem = '';
        for (var i = 0; i < shoppingCart.cart.length; i++) {
            htmlItem += `
    <div class="shopping-bag__item">
    <div class="shopping-bag__image">
        <img src="${shoppingCart.cart[i].thumbnail}" alt="">
    </div>
    <div class="shopping-bag__info">
        <h4 class="title">${shoppingCart.cart[i].title}</h4>
        <p class="price">£${shoppingCart.cart[i].price}</p>
        <p>Color: <span class="color">${shoppingCart.cart[i].colors}</span></p>
        <p>Size: <span class="size">${shoppingCart.cart[i].sizes}</span></p>
        <p>Quantity: &nbsp;<img src="img/desktop/minus.png" alt="">&nbsp;<span>1</span>&nbsp;<img src="img/desktop/plus.png" alt=""></p>
        <a href="#" class="remove-item-from-bag" data-set-id="${shoppingCart.cart[i].id}">Remove item</a>
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
var totalCartPrice = document.querySelector('#total-price');
    totalCartPrice.textContent = `£${shoppingCart.totalCost.toFixed(2)}`;