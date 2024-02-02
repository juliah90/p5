const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');

const confirmationId = localStorage.getItem('orderId');
if (confirmationId) {
    console.log('Order ID:', confirmationId);
} else {
    console.error('Order ID not found in localStorage.');
}

console.log('Order ID from URL:', orderId);

const orderIdElement = document.getElementById('orderId')
console.log(orderIdElement)

orderIdElement.innerText=`${orderId}`

