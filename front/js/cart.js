// Retrieve the array from local storage
const storedArrayString = localStorage.getItem('cart');
// console.log(storedArrayString)
// Parse the string into a JavaScript array
const storedArray = JSON.parse(storedArrayString);
console.log(storedArray)
// 'storedArray' contains the array retrieved from local storage
//TODO Create and insert the elements on the cart page
