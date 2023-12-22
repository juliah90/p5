fetch('http://localhost:3000/api/products')
  .then(data => {
    return data.json();
  })
  .then(products => {
    insertProductCards(products);
  });

/**
 * Insert product cards into the page
 * 
 * @param {[any]} products - array of product information
 */
function insertProductCards(products) {
  console.log(products);
  const itemHolder = document.getElementById('items');
  for (let i = 0; i < products.length; i++) {
    console.log(products[i]);
    const product = products[i];

    itemHolder.innerHTML += `
          <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>
        `;
  }

}
