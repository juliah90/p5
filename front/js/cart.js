
//TODO get product info from local storage

const productInfo = localStorage.getItem('cart');
const items = localStorage.length;

function pullProductInformation (cart){
    const cartItems = document.getElementById('cart__items');

    cartItems.innerHTML +=`
    <!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photo of a sofa">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Name of the product</h2>
                    <p>Green</p>
                    <p>€42.00</p>
                </div>
              </article> -->
    `
}