const totalQuantityElement = document.getElementById('totalQuantity');
const totalPriceElement = document.getElementById('totalPrice');
// Fetch product data from the server
fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(products => {
    // Retrieve the array from local storage
    const storedArrayString = localStorage.getItem('cart');

    // Parse the string into a JavaScript array
    const cart = JSON.parse(storedArrayString) || [];
    // console.log(storedArray)
    const cartContainer = document.getElementById('cart__items');
    // console.log(cartContainer)

    /**
     * 
     * @param {any}  -   Function to create and insert a cart item element
     */
    function createCartItem(cartItem) {
      const product = products.find(p => cartItem.id === p._id)
      // console.log(product)
      const cartItemElement = document.createElement('article');
      cartItemElement.classList.add('cart__item');
      cartItemElement.setAttribute('data-id', cartItem.id);
      cartItemElement.setAttribute('data-color', cartItem.selectedColor);
      // console.log(cartItem)
      cartItemElement.innerHTML = `
          <div class="cart__item__img">
              <img src="${product.imageUrl}" alt="${product.altTxt}">
          </div>
          <div class="cart__item__content">
              <div class="cart__item__content__description">
                  <h2>${product.name}</h2>
                  <p>${cartItem.selectedColor}</p>
                  <p>${product.price}</p>
              </div>
              <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                      <p>Quantity : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItem.selectedQuantity}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Delete</p>
                  </div>
              </div>
          </div>`;
      // addEventListener to button that changes item quantity
      const quantityInput = cartItemElement.querySelector('.itemQuantity');

      quantityInput.addEventListener('change', () => {
        const initialQuantity = cartItem.selectedQuantity
        const newQuantity = parseInt(quantityInput.value)
        const quantityUpdate = newQuantity - initialQuantity;

        cartItem.selectedQuantity = newQuantity;

        updateLocalStorage(cart);

        updateTotals(product.price, quantityUpdate);
        // console.log(updateTotals)
      });
      // addEventListener to delete button
      const deleteButton = cartItemElement.querySelector('.deleteItem');
      // console.log(deleteButton)
      deleteButton.addEventListener('click', ($event) => {
        // console.log($event.target.closest('article').dataset.color)
        // delete item from cart
        const indexToRemove = cart.findIndex(item => item.id === cartItem.id && item.selectedColor === cartItem.selectedColor);
        if (indexToRemove !== -1) {
          cart.splice(indexToRemove, 1);
          updateLocalStorage(cart);
          // console.log(updateLocalStorage)
        }

        // Remove item from page
        cartItemElement.remove();

        // Update totals after delete
        updateTotals(product.price, -cartItem.selectedQuantity);
      });

      updateTotals(product.price, cartItem.selectedQuantity)

      cartContainer.appendChild(cartItemElement);
    }//its working, gotta figure out update
    /**
     * 
     * @param {any} cartArray - update local storage with new item information
     */
    function updateLocalStorage(cartArray) {
      localStorage.setItem('cart', JSON.stringify(cartArray));
    }// local storage update for sure this time
    // console.log(updateLocalStorage)
    // Insert each item from the storedArray into the cartContainer
    cart.forEach(createCartItem);
  })
/**
 * 
 * @param {any} price - update total price in webpage and local storage
 * @param {any} quantity - update total quantity in webpage and local storage
 */
function updateTotals(price, quantity) {
  // Get the current values from page
  const currentQuantity = parseInt(totalQuantityElement.innerText) || 0;
  const currentPrice = parseFloat(totalPriceElement.innerText.replace('€', '')) || 0;

  // Update the values
  const newQuantity = currentQuantity + quantity;
  const newPrice = currentPrice + price * quantity;

  // Set the updated values to the page
  totalQuantityElement.innerText = newQuantity;
  totalPriceElement.innerText = `${newPrice.toFixed(2)}`;
  console.log(totalQuantityElement.innerText)
  console.log(totalPriceElement.innerText)
}

const orderButton = document.getElementById('order')
const firstNameElement = document.getElementById('firstName')
const lastNameElement = document.getElementById('lastName')
const addressElement = document.getElementById('address')
const cityElement = document.getElementById('city')
const emailElement = document.getElementById('email')
const firstNameMessageElement = document.getElementById('firstNameErrorMsg')
const lastNameMessageElement = document.getElementById('lastNameErrorMsg')
const addressMessageElement = document.getElementById('addressErrorMsg')
const cityMessageElement = document.getElementById('cityErrorMsg')
const emailMessageElement = document.getElementById('emailErrorMsg')

firstNameElement.addEventListener('change', ($event) => {
  const firstName = $event.target.value
  const nameRegex = /^[a-zA-Z]+$/;
  if (nameRegex.test(firstName)) {
    firstNameMessageElement.innerText = '';
  }
  else {
    firstNameMessageElement.innerText = 'Please enter a valid first name';
  }
  console.log(nameRegex.test(firstName));
})
lastNameElement.addEventListener('change', ($event) => {
  const lastName = $event.target.value
  const nameRegex = /^[a-zA-Z]+$/;
  if (nameRegex.test(lastName)) {
    lastNameMessageElement.innerText = '';
  }
  else {
    lastNameMessageElement.innerText = 'Please enter a valid last name'
  }
})
addressElement.addEventListener('change', ($event) => {
  const address = $event.target.value
  const addressRegex = /^((\d)+) [a-zA-Z0-9\s,'.-]+$/;
  if (addressRegex.test(address)) {
    addressMessageElement.innerText = ''
  }
  else {
    addressMessageElement.innerText = 'Please enter a valid street address'
  }
})
cityElement.addEventListener('change', ($event) => {
  const city = $event.target.value
  const cityRegex = /^[a-zA-Z\s,'.-]+$/;
  if (cityRegex.test(city)) {
    cityMessageElement.innerText = ''
  }
  else {
    cityMessageElement.innerText = 'Please enter a valid city'
  }
})
emailElement.addEventListener('change', ($event) => {
  const email = $event.target.value
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  if (emailRegex.test(email)) {
    emailMessageElement.innerText = ''
  }
  else {
    emailMessageElement.innerText = 'Please enter a valid email'
  }
})
// const filledFormElements = ()

orderButton.addEventListener('click', function (event) {
  event.preventDefault()
  // if(filledFormElements){
  //   console.log('okay')
  // }
  // else{
  //   console.log('nope')
  // }

  //TODO validate fields when clicked
  //TODO submit the order to the backend(use the javascript array map method to prepare the products array)
  //TODO get the order id from the response(fetch)
  //TODO clear the cart
  //TODO redirect the user to the confirmation page with the order id (location.assign)
});