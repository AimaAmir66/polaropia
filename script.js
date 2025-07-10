 // Search Functionality
function searchProduct() {
  let input = document.getElementById('searchInput').value.toLowerCase();
  let result = '';

  if (input.includes('abstract')) {
    result = 'Check out "Abstract Dreams" in Products or Polaroids!';
  } else if (input.includes('modern')) {
    result = 'Have a look at "Modern Muse" in our collection!';
  } else if (input.includes('vintage')) {
    result = 'You might like "Vintage Vibes"!';
  } else {
    result = 'No matching art found. Try another interest!';
  }

  document.getElementById('searchResult').innerText = result;
}

// Cart Storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add product to cart
function addToCart(productName, price) {
  cart.push({ productName, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(productName + " added to your cart!");
}

// Confirm Order Function
function confirmOrder() {
  if (cart.length === 0) {
    document.getElementById('orderMessage').innerText = "Your cart is empty. Add products first!";
    return;
  }

  let email = document.getElementById('email').value.trim();
  let phone = document.getElementById('phone').value.trim();
  let address = document.getElementById('address').value.trim();

  if (email === "" || phone === "" || address === "") {
    document.getElementById('orderMessage').innerText = "Please fill in all delivery details!";
    return;
  }

  document.getElementById('orderMessage').innerHTML = `
    ✅ Thank you for your order!<br>
    📧 Email: ${email}<br>
    📱 Phone: ${phone}<br>
    📍 Address: ${address}<br>
    🖼️ Your art will arrive soon.`;

  cart = [];
  localStorage.removeItem('cart');
  updateCartDisplay();

  // Clear form fields
  document.getElementById('email').value = "";
  document.getElementById('phone').value = "";
  document.getElementById('address').value = "";
}

// Function to update cart display (if used in order.html)
function updateCartDisplay() {
  let cartItems = document.getElementById('cartItems');
  let totalAmount = document.getElementById('totalAmount');

  if (!cartItems || !totalAmount) return;

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    cartItems.innerHTML += `<p>${item.productName} — Rs ${item.price}</p>`;
    total += item.price;
  });

  totalAmount.innerText = `Total: Rs ${total}`;
}

// Submit Feedback
function submitFeedback() {
  let feedbackText = document.getElementById('feedback').value;
  let ratingOptions = document.getElementsByName('rating');
  let selectedRating = '';

  for (let option of ratingOptions) {
    if (option.checked) {
      selectedRating = option.value;
      break;
    }
  }

  if (feedbackText === '' || selectedRating === '') {
    document.getElementById('feedbackMessage').innerText = 'Please provide feedback and select a rating!';
  } else {
    document.getElementById('feedbackMessage').innerText = 'Thank you for your feedback! ❤️';
    document.getElementById('feedbackForm').reset();
  }
}

// Help Desk Response Function
function getHelp() {
  let issue = document.getElementById('helpSelect').value;
  let response = document.getElementById('helpResponse');

  if (issue === "") {
    response.innerHTML = "<strong>Please select an issue from the dropdown.</strong>";
  } else if (issue === "order") {
    response.innerHTML = "<strong>Order Help Desk:</strong><br>Your order should arrive within 5 working days. If delayed, email us at <strong>orders@polaropia.com</strong> with your order ID.";
  } else if (issue === "payment") {
    response.innerHTML = "<strong>Payment Support:</strong><br>Facing payment issues? Contact <strong>billing@polaropia.com</strong> with transaction details.";
  } else if (issue === "product") {
    response.innerHTML = "<strong>Product Complaints:</strong><br>If you received a faulty product, email images and details to <strong>complaints@polaropia.com</strong> for immediate assistance.";
  } else if (issue === "others") {
    response.innerHTML = "<strong>General Inquiries:</strong><br>Contact <strong>support@polaropia.com</strong> for any other queries. We’re here to help!";
  }
}
