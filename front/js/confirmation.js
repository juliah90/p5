const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');

console.log('Order ID from URL:', orderId);

const orderIdElement = document.getElementById('orderId')
console.log(orderIdElement)

orderIdElement.innerText = `${orderId}`

