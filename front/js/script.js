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
        // TODO Create a URLSearchParams object from the current URL
        // const urlParams = new URLSearchParams(window.location.search);

        // Get individual parameters
        // const id = urlParams.get('_id');

        itemHolder.innerHTML += `
          <a href="./product.html?id=42">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>
        `;
    }

}
