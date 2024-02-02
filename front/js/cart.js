const totalQuantityElement = document.getElementById('totalQuantity');
const totalPriceElement = document.getElementById('totalPrice');
// Fetch product data from the server
fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(products => {
    const storedArrayString = localStorage.getItem('cart');

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
      const deleteButton = cartItemElement.querySelector('.deleteItem');
      // console.log(deleteButton)
      deleteButton.addEventListener('click', ($event) => {
        // console.log($event.target.closest('article').dataset.color)
        const indexToRemove = cart.findIndex(item => item.id === cartItem.id && item.selectedColor === cartItem.selectedColor);
        if (indexToRemove !== -1) {
          cart.splice(indexToRemove, 1);
          updateLocalStorage(cart);
          // console.log(updateLocalStorage)
        }

        cartItemElement.remove();

        updateTotals(product.price, -cartItem.selectedQuantity);
      });

      updateTotals(product.price, cartItem.selectedQuantity)

      cartContainer.appendChild(cartItemElement);
    }
    /**
     * 
     * @param {any} cartArray - update local storage with new item information
     */
    function updateLocalStorage(cartArray) {
      localStorage.setItem('cart', JSON.stringify(cartArray));
    }
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

function validateFirstNameElement(firstName, firstNameMessageElement) {
  const nameRegex = /^[a-zA-Z]+$/;
  if (nameRegex.test(firstName)) {
    firstNameMessageElement.innerText = '';
    return true;
  }
  else {
    firstNameMessageElement.innerText = 'Please enter a valid first name';
    return false;
  }
}

firstNameElement.addEventListener('change', ($event) => {
  const firstName = $event.target.value
  const firstNameElementValid = validateFirstNameElement(firstName, firstNameMessageElement)
  if (firstNameElementValid) {
    console.log('First Name is Valid')
  }
  else {
    console.log('First Name is Invalid')
  }
})
function validateLastNameElement(lastName, lastNameMessageElement) {
  const nameRegex = /^[a-zA-Z]+$/;
  if (nameRegex.test(lastName)) {
    lastNameMessageElement.innerText = '';
    return true;
  }
  else {
    lastNameMessageElement.innerText = 'Please enter a valid last name';
    return false;
  }
}
lastNameElement.addEventListener('change', ($event) => {
  const lastName = $event.target.value
  const lastNameElementValid = validateLastNameElement(lastName, lastNameMessageElement)
  if (lastNameElementValid) {
    console.log('Last Name is Valid');
  }
  else {
    console.log('Last Name is Invalid')
  }
})
function validateAddressElement(address, addressMessageElement) {
  const addressRegex = /^((\d)+) [a-zA-Z0-9\s,'.-]+$/;
  if (addressRegex.test(address)) {
    addressMessageElement.innerText = ''
    return true;
  }
  else {
    addressMessageElement.innerText = 'Please enter a valid street address'
    return false;
  }
}
addressElement.addEventListener('change', ($event) => {
  const address = $event.target.value
  const addressElementValid = validateAddressElement(address, addressMessageElement)
  if (addressElementValid) {
    console.log('Address is Valid')
  }
  else {
    console.log('Address is Invalid')
  }
})
function validateCityElement(city, cityMessageElement) {
  const cityRegex = /^[a-zA-Z\s,'.-]+$/;
  if (cityRegex.test(city)) {
    cityMessageElement.innerText = ''
    return true;
  }
  else {
    cityMessageElement.innerText = 'Please enter a valid city'
    return false;
  }
}
cityElement.addEventListener('change', ($event) => {
  const city = $event.target.value
  const cityElementValid = validateCityElement(city, cityMessageElement)
  if (cityElementValid) {
    console.log('City is Valid')
  }
  else {
    console.log('City is Invalid')
  }

})
function validateEmailElement(email, emailMessageElement) {
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  if (emailRegex.test(email)) {
    emailMessageElement.innerText = ''
    return true;
  }
  else {
    emailMessageElement.innerText = 'Please enter a valid email'
    return false;
  }
}
emailElement.addEventListener('change', ($event) => {
  const email = $event.target.value
  const emailElementValid = validateEmailElement(email, emailMessageElement)
  if (emailElementValid) {
    console.log('Email is Valid')
  }
  else {
    console.log('Email is Invalid')
  }
})

orderButton.addEventListener('click', function (event) {
  event.preventDefault()

  const firstName = firstNameElement.value
  const lastName = lastNameElement.value
  const address = addressElement.value
  const city = cityElement.value
  const email = emailElement.value
  const firstNameElementValid = validateFirstNameElement(firstName, firstNameMessageElement)
  const lastNameElementValid = validateLastNameElement(lastName, lastNameMessageElement)
  const addressElementValid = validateAddressElement(address, addressMessageElement)
  const cityElementValid = validateCityElement(city, cityMessageElement)
  const emailElementValid = validateEmailElement(email, emailMessageElement)
  const allFieldsValid = [firstNameElementValid, lastNameElementValid, addressElementValid, cityElementValid, emailElementValid]
  if (allFieldsValid.every(Boolean)) {
    console.log('All Fields Validated')
  }
  else {
    console.log('Please Correct Errors')
  }

  const order = {
    "contact": {
      "firstName": "Eddie",
      "lastName": "Spaghetti",
      "address": "123 lane st",
      "city": "silverdale",
      "email": "bob@yahoo.com"
    },
    "products": [
      "107fb5b75607497b96722bda5b504926"
    ]
  }
  const cart = JSON.parse(localStorage.getItem("cart")||"[]")
  // console.log(cart)
  const products = cart.map(item => item.id);
  const contact = {firstName, lastName, address, city, email}
  // console.log(products, contact)
  // userOrder.map(userOrderArray)
  const userOrder = [products, contact]
  console.log(userOrder)
  // array.map(function(currentValue, index, arr), thisValue)
  fetch(' https://localhost:3000/api/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userOrder),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })

  //TODO submit the order to the backend(use the javascript array map method to prepare the products array)
  //TODO get the order id from the response(fetch)
  //TODO clear the cart
  //TODO redirect the user to the confirmation page with the order id (location.assign)
});