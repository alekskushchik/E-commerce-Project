"use strict";
var products = window.catalog;

(function renderItemFullView() {
    var id = window.location.hash.substr(4);
    var itemPage = document.querySelector(".item");
    var out = '';
    for (var i = 0; i < products.length; i++) {
        if (id === products[i].id) {
            var size = `<span>Size:</span>
            <button class="item-prop chosen-prop" type="button" value="${products[i].sizes[0]}">${products[i].sizes[0]}</button>`;
            for (var j = 1; j < products[i].sizes.length; j++) {
                size += `<button class="item-prop" type="button" value="${products[i].sizes[j]}">${products[i].sizes[j]}</button>`;
            }
            var color = `<span>Color:</span>
            <button class="item-prop chosen-prop" type="button" value="${products[i].colors[0]}">${products[i].colors[0]}</button>`;
            for (var k = 1; k < products[i].colors.length; k++) {
                color += `<button class="item-prop" type="button" value="${products[i].colors[k]}">${products[i].colors[k]}</button>`;
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
        <div class="item-info">
            <h4>${products[i].title}</h4>
            <p>${products[i].description}</p>
            <span>&#163;${products[i].price.toFixed(2)}</span>
            <div class="item-info__size">${size}</div>
            <div class="item-info__color">${color}</div>
            <a class="bottom-section__button" href="shopping-bag.html">Add to bag</a>
        </div>`;
        }
    }
    itemPage.innerHTML = out;
    viewGallery();
})();

function getItem() {
    var id = window.location.hash.substring(4);
        for (var i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                setProperties(products[i]);
                return products[i];
            }
        }
}

function setProperties(item) {
    var properties = document.querySelectorAll('.chosen-prop');
    for(var i = 0; i < properties.length; i++) {
        if (properties[i].classList.contains('item-prop')) {
            item.sizes = properties[i].value;
        }

        if (properties[i].classList.contains('item-prop')) {
            item.colors = properties[i].value;
        }
    }
}

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

if(addItemButton) {
    addItemButton.addEventListener('click', function () {
        window.bagStorage.addItemToBag(cloneObject( getItem() ));
        window.updateTotals(window.bagStorage.totalCost, window.bagStorage.totalCount);
    });
}

function cloneObject(object) {
    var clonedObj = {};
    var properties = Object.getOwnPropertyNames(object);
    for(var i = 0; i < properties.length; i += 1) {
        clonedObj[properties[i]] = object[properties[i]];
    }
    return clonedObj;
}

var storage = {

    get bagParams() {
        var params = JSON.parse(window.localStorage.getItem('cart')) || {};
        return params;
    },

    set bagParams(uploadedStats) {
        localStorage.setItem('cart', JSON.stringify(uploadedStats));
    }
};

(function() {
    var bagStorage =  {
        bag: storage.bagParams.bag || [],
        totalCost: storage.bagParams.totalCost || 0,
        totalCount: storage.bagParams.totalCount || 0,
        addItemToBag: function(item) {
            if( getIndexOfItem(this.bag, item) !== -1) {
                this.bag[getIndexOfItem(this.bag, item)].quantity += 1;
            } else {
                item.id = this.bag.length;
                this.bag.push(item);
            }

            this.totalCost += item.price;
            this.totalCount += 1;
            updateState(this.bag, this.totalCost, this.totalCount);
        },
        clearBag: function() {
            this.bag = [];
                this.totalCount = 0;
            this.totalCost = 0;
            updateState(this.bag, this.totalCost, this.totalCount);
        },
        removeItem: function(itemId) {
            for(var i = 0; i < this.bag.length; i += 1) {
                if(this.bag[i].id === itemId) {
                    var item = this.bag[i];
                    var index = i;
                }
            }
            if(item.quantity > 1) {
                item.quantity -= 1;
            } else {
                this.bag.splice(index, 1);
            }

            this.totalCost -= item.price;
            this.totalCount -= 1;
            updateState(this.bag, this.totalCost, this.totalCount);
        }
    };

    function getIndexOfItem(array, item) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i].name === item.name && array[i].size === item.size && array[i].color === item.color) {
                return i;
            }
        }

        return -1;
    }

    function updateState(bag, totalCost, totalCount) {
        storage.bagParams = {
            bag: bag,
            totalCost: totalCost,
            totalCount: totalCount
        };
    }

    window.bagStorage = bagStorage;
})();