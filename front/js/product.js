const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id)



fetch(`http://localhost:3000/api/products/${id}`)
    .then(data => {
        return data.json();
    })
    .then(product => {
        insertProductInformation(product);
    });


/**
 * 
 * @param {any} product - individual product information selected by user
 */
function insertProductInformation(product) {
    console.log(product)
    const productImage = document.querySelector('.item__img');
    productImage.innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`
    const productName = document.getElementById('title');
    productName.innerHTML += `${product.name}`
    const productPrice = document.getElementById('price');
    productPrice.innerHTML += `${product.price}`
    const productDescription = document.getElementById('description');
    productDescription.innerHTML += `${product.description}`
    const productColors = document.getElementById('colors');
    product.colors.forEach(color => {
        productColors.innerHTML += `<option value="${color}">${color}</option>`;
    });
}
const cartButton = document.getElementById('addToCart');

cartButton.addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const selectedColor = document.getElementById("colors").value;
    const selectedQuantity = parseInt(document.getElementById('quantity').value);

    // Create a new product object
    const newProduct = { id, selectedColor, selectedQuantity };

    // Find existing product in the cart based on selected color
    const existingProduct = cart.find((product) => product.selectedColor === newProduct.selectedColor);

    if (existingProduct) {
        // If existing product is found, update the quantity
        existingProduct.selectedQuantity += newProduct.selectedQuantity;
    } else {
        // If no existing product is found, add the new product to the cart
        cart.push(newProduct);
    }
    // Update the local storage with the modified cart
    localStorage.setItem('cart', JSON.stringify(cart));
});
