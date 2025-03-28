// js/list.js

// Function to fetch products from the API and display them
async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayProducts(data.products);
    } catch (error) {
        console.error('Error fetching products:', error);
        document.getElementById('productList').innerHTML = '<p class="text-danger">Failed to load products.</p>';
    }
}

// Function to display products in the HTML
function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Price: $${product.price}</p>
                        <p class="card-text">${product.description}</p>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard; // Append product card to the list
    });
}

// Call the fetchProducts function when the page loads
window.onload = fetchProducts;