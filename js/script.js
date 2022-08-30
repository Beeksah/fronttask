const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
    autoplay: true,
    speed: 400,
    pagination: {
        el: '.swiper-pagination',
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

var productsSortButtonsOpener = document.getElementById('productsSortButtonsOpener');
productsSortButtonsOpener.addEventListener('click',sortListToggler);

function shoppingCartOpener(){
    document.getElementById('shoppingCartWrapper').classList.toggle('hidden');
}
var cardOpeners = document.getElementsByClassName('cart-switch');
for(let i=0;i<cardOpeners.length;i++){
    cardOpeners[i].addEventListener('click',shoppingCartOpener);
}

document.getElementById('mobileHeaderBurgerButton').addEventListener('click',function(){
    document.getElementById('mobileHeaderBottom').classList.toggle('hidden');
    let buttonIcons = document.getElementsByClassName('mobile-header-top-menu-button-pic');
    for(let i=0;i<buttonIcons.length;i++){
        buttonIcons[i].classList.toggle('hidden');
    }
});


var productsCategories = document.getElementsByClassName('products-category');
var mobileProductsCategories = document.getElementsByClassName('mobile-products-category');
for(let i=0;i<productsCategories.length;i++){
    productsCategories[i].addEventListener('click',function(){
        productsCategories[i].classList.toggle('active');
        mobileProductsCategories[i].classList.toggle('active');
    })
}
for(let i=0;i<mobileProductsCategories.length;i++){
    mobileProductsCategories[i].addEventListener('click',function(){
        mobileProductsCategories[i].classList.toggle('active');
        productsCategories[i].classList.toggle('active');
    })
}
var sortDarkBackground = document.getElementById('sortBg');

function sortListToggler(){
    document.getElementById('productsSortButtons').classList.toggle('hidden');
    sortDarkBackground.classList.toggle('hidden');
}

sortDarkBackground.addEventListener('click',sortListToggler);

function mobileProductsFilterToggle(){
    document.getElementById('mobileProductsCategoriesWrapper').classList.toggle('hidden');
}

document.getElementById('productsFilterButton').addEventListener('click',mobileProductsFilterToggle);
document.getElementById('mobileProductsCategoriesBackground').addEventListener('click',mobileProductsFilterToggle);


let filterFlags = {
    isNew: false,
    isInStock: false,
    isContracted: false,
    isExclusive: false,
    isOnSale: false
}

function filterByFlags(filterFlags){
    // console.log(filterFlags);
    return (product)=>{
        if(filterFlags.isNew && !product.isNew){
            return false;
        }
        if(filterFlags.isInStock && product.count==0){
            return false;
        }
        if(filterFlags.isContracted && !product.isContracted){
            return false;
        }
        if(filterFlags.isExclusive && !product.isExclusive){
            return false;
        }
        if(filterFlags.isOnSale&& !product.isSale){
            return false;
        }
        if(filterFlags.newFirst && !product.newFirst){
            return false;
        }
        return true;
    }
}

let sortType = 'expensiveFirst'; 
let renderedProducts = [];

function sortFilter(sortType){
    switch (sortType){
        case 'expensiveFirst':
        return (a,b)=>{
            return b.price-a.price;
            
        };
        break;
        case 'cheapFirst':
        return (a,b)=>{
            return a.price-b.price
        }
        break;
        case 'popularFirst':
        return (a,b)=>{
            return b.popularity-a.popularity;
        }
        break;
        case 'newFirst':
        return (a,b)=>{
            if(a.isNew && b.isNew==false){
                return -1;
            }
            if(!a.isNew && b.isNew){
                return 1;
            }
            return 0;
        };
        break;
        default:
            debugger; 
        break;
    }
}

var filterIsNewButton = document.getElementById('filterIsNew');
var filterIsNewCheckbox = document.getElementById('filterIsNewCheckbox');
var mobileFilterIsNewButton = document.getElementById('mobileFilterIsNew');
var mobileFilterIsNewCheckbox = document.getElementById('mobileFilterIsNewCheckbox');
filterIsNewCheckbox.checked=filterFlags.isNew;
mobileFilterIsNewCheckbox=filterFlags.isNew;

var filterIsInStockButton = document.getElementById('filterIsInStock');
var filterIsInStockCheckbox = document.getElementById('filterIsInStockCheckbox');
var mobileFilterIsInStockButton = document.getElementById('mobileFilterIsInStock');
var mobileFfilterIsInStockCheckbox = document.getElementById('mobileFilterIsInStockCheckbox');
filterIsInStockCheckbox.checked=filterFlags.isInStock;
mobileFilterIsInStockCheckbox.checked=filterFlags.isInStock;

var filterIsContractedButton = document.getElementById('filterIsContracted');
var filterIsContractedCheckbox = document.getElementById('filterIsContractedCheckbox');
var mobileFilterIsContractedButton = document.getElementById('mobileFilterIsContracted');
var mobileFilterIsContractedCheckbox = document.getElementById('mobileFilterIsContractedCheckbox');
filterIsContractedCheckbox.checked=filterFlags.isContracted;
mobileFilterIsContractedCheckbox.checked=filterFlags.isContracted;

var filterIsExclusiveButton = document.getElementById('filterIsExclusive');
var filterIsExclusiveCheckbox = document.getElementById('filterIsExclusiveCheckbox');
var mobileFilterIsExclusiveButton = document.getElementById('mobileFilterIsExclusive');
var mobileFilterIsExclusiveCheckbox = document.getElementById('mobileFilterIsExclusiveCheckbox');
filterIsExclusiveCheckbox.checked=filterFlags.isExclusive;
mobileFilterIsExclusiveCheckbox.checked=filterFlags.isExclusive;

var filterIsOnSaleButton = document.getElementById('filterIsOnSale');
var filterIsOnSaleCheckbox = document.getElementById('filterIsOnSaleCheckbox');
var mobileFilterIsOnSaleButton = document.getElementById('mobileFilterIsOnSale');
var mobileFilterIsOnSaleCheckbox = document.getElementById('mobileFilterIsOnSaleCheckbox');
filterIsOnSaleCheckbox.checked=filterFlags.isOnSale;
mobileFilterIsOnSaleCheckbox.checked=filterFlags.isOnSale;



filterIsNewButton.addEventListener('click',()=>{
    filterFlags.isNew = !filterFlags.isNew;
    refreshProductCards();
});
filterIsInStockButton.addEventListener('click',()=>{
    filterFlags.isInStock = !filterFlags.isInStock;
    refreshProductCards();
});
filterIsContractedButton.addEventListener('click',()=>{
    filterFlags.isContracted = !filterFlags.isContracted;
    refreshProductCards();
});
filterIsExclusiveButton.addEventListener('click',()=>{
    filterFlags.isExclusive = !filterFlags.isExclusive;
    refreshProductCards();
});
filterIsOnSaleButton.addEventListener('click',()=>{
    filterFlags.isOnSale = !filterFlags.isOnSale;
    refreshProductCards();
});
mobileFilterIsNewButton.addEventListener('click',()=>{
    filterFlags.isNew = !filterFlags.isNew;
    refreshProductCards();
});
mobileFilterIsInStockButton.addEventListener('click',()=>{
    filterFlags.isInStock = !filterFlags.isInStock;
    refreshProductCards();
});
mobileFilterIsContractedButton.addEventListener('click',()=>{
    filterFlags.isContracted = !filterFlags.isContracted;
    refreshProductCards();
});
mobileFilterIsExclusiveButton.addEventListener('click',()=>{
    filterFlags.isExclusive = !filterFlags.isExclusive;
    refreshProductCards();
});
mobileFilterIsOnSaleButton.addEventListener('click',()=>{
    filterFlags.isOnSale = !filterFlags.isOnSale;
    refreshProductCards();
});







function renderProductCard(product){
    let productCardTemplate = document.getElementById('productCardTemplate').content;
    let container = document.createElement('div');
    let productCard = productCardTemplate.cloneNode(true);
    insertData(product,productCard);
    let productsCards = document.getElementById('productsCards');
    container.appendChild(productCard);
    productsCards.appendChild(container);
    return container;
}

function refreshProductCards(){
    let productsCards = document.getElementById('productsCards');
    renderedProducts.forEach(a=>productsCards.removeChild(a));
    let filteredProducts = Products.filter(filterByFlags(filterFlags)).sort(sortFilter(sortType));
    // console.log(filteredProducts);
    renderedProducts = filteredProducts.map(a=>renderProductCard(a));
    productCount = document.getElementById('productsCount');
    if(renderedProducts.length==1){
        productCount.innerText=renderedProducts.length + ' ТОВАР'
    }
    else
    if(renderedProducts.length==2||renderedProducts.length==3||renderedProducts.length==4){
        productCount.innerText=renderedProducts.length + ' ТОВАРА'
    }
    else{
        productCount.innerText=renderedProducts.length + ' ТОВАРОВ'
    }
}

var expensiveFirstButton = document.getElementById('expensiveFirst');
var cheapFirstButton = document.getElementById('cheapFirst');
var popularFirstButton = document.getElementById('popularFirst');
var newFirstButton = document.getElementById('newFirst');
let productsSortButtons = document.getElementsByClassName('products-sort-button');

function sortButtonsClear(){
    for(let i=0;i<productsSortButtons.length;i++){
        productsSortButtons[i].classList.remove('active');
    }
}

expensiveFirstButton.addEventListener('click',()=>{
    sortType="expensiveFirst";
    productsSortButtonsOpener.innerText="СНАЧАЛА ДОРОГИЕ";
    sortButtonsClear();
    expensiveFirstButton.classList.add('active');
    refreshProductCards();
});
cheapFirstButton.addEventListener('click',()=>{
    sortType="cheapFirst";
    productsSortButtonsOpener.innerText="СНАЧАЛА ДЕШЁВЫЕ";
    sortButtonsClear();
    cheapFirstButton.classList.add('active');
    refreshProductCards();
});
popularFirstButton.addEventListener('click',()=>{
    sortType="popularFirst";
    productsSortButtonsOpener.innerText="СНАЧАЛА ПОПУЛЯРНЫЕ";
    sortButtonsClear();
    popularFirstButton.classList.add('active');
    refreshProductCards();
});
newFirstButton.addEventListener('click',()=>{
    sortType="newFirst";
    productsSortButtonsOpener.innerText="СНАЧАЛА НОВЫЕ";
    sortButtonsClear();
    newFirstButton.classList.add('active');
    refreshProductCards();
});
refreshProductCards();









function insertData(product,card){
    card.querySelector('.product-card-pic').src=product.img;
    card.querySelector('.product-card-name').innerText=product.name;
    card.querySelector('.product-card-price').innerText=product.price;
    card.querySelector('.product-card-add').addEventListener('click',()=>{
        let shoppingCartItem = productCart.find(a=>a.product.id==product.id);
        if(shoppingCartItem==null){
            productCart.push({product:product,count:1});
        }
        else{
            shoppingCartItem.count++;
        }
        refreshShoppingCart();
    })
}
let productCart = JSON.parse(localStorage.getItem('cart')??'[]');
let renderedCartProducts = [];
function insertCartData(cartItem,card){
    let product = cartItem.product;
    card.querySelector('.shopping-cart-product-pic').src=product.img;
    card.querySelector('.shopping-cart-product-name').innerText=product.name;
    card.querySelector('.shopping-cart-product-price').innerText=product.price;
    card.querySelector('.quantity').innerText=cartItem.count;
    card.querySelector('.plus').addEventListener('click',()=>{
        cartItem.count++;
        refreshShoppingCart()
    });
    card.querySelector('.minus').addEventListener('click',()=>{
        cartItem.count--;
        if (cartItem.count==0){
            let index = productCart.indexOf(cartItem);
            productCart.splice(index,1);
        }
        refreshShoppingCart()
    });
    card.querySelector('.delete').addEventListener('click',()=>{
        let shoppingCartItem = productCart.find(a=>a.product.id==product.id);
        let index = productCart.indexOf(shoppingCartItem);
        productCart.splice(index,1);
        refreshShoppingCart()
    });
}
function renderCartProduct(cartItem){
    let product = cartItem.product;
    let shoppingCartItemTemplate = document.getElementById('shoppingCartItemTemplate').content;
    let container = document.createElement('div');
    let productCard = shoppingCartItemTemplate.cloneNode(true);
    insertCartData(cartItem,productCard);
    let productsCards = document.getElementById('shoppingCartProducts');
    container.appendChild(productCard);
    productsCards.appendChild(container);
    return container;
}
document.getElementById('shoppingCartErase').addEventListener('click',function(){
    renderedCartProduct = [];
    productCart = [];
    refreshShoppingCart();
})


function refreshShoppingCart(){
    let shoppingCartProducts = document.getElementById('shoppingCartProducts');
    renderedCartProducts.forEach(a=>shoppingCartProducts.removeChild(a));
    renderedCartProducts = productCart.map(a=>renderCartProduct(a));
    localStorage.setItem('cart',JSON.stringify(productCart));
    document.getElementById('shoppingCartTotalPrice').innerText = productCart.reduce((a,b)=>a+b.product.price*b.count,0)+' ₽';
    let count = productCart.reduce((a,b)=>a+b.count,0);
    document.getElementById('shoppingCartCount').innerText = count+' товаров';
    document.getElementById('desktopHeaderCartButton').innerText = count;
    document.getElementById('mobileHeaderCartButton').innerText = count;
}
refreshShoppingCart();