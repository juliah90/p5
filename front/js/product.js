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


//TODO send info to local storage from product page

//TODO if product color/id is same only add to quantity