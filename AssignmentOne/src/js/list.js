document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("productList");

    async function fetchProducts() {
        try {
            const response = await fetch('https://inft2202-server.onrender.com/api/products');

            const products = await response.json();
            console.log('Fetched products:', products.records);
            const records = products.records;
            console.log('Fetched records:', records);
            displayProducts(records);
        } catch (error) {
            
            console.error('Error fetching products:', error);
        }
    }

    function displayProducts(products) {
        if (products.length) {
            productList.innerHTML = products.map(product => `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text"><strong>Stock:</strong> ${product.stock}</p>
                            <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                            <button class="btn btn-warning" onclick="editProduct('${product.id}')">Edit</button>
                            <button class="btn btn-danger"value="${product.name}" id="deleteButton">Delete</button>
                        </div>
                    </div>
                </div>
            `).join('');
        } else {
            productList.innerHTML = "<p>No products available.</p>";
        }
    }
    




    fetchProducts(); // Fetch products when the page loads
});

document.addEventListener("DOMContentLoaded", function () {
    const deleteButton = document.getElementById("deleteButton");

    deleteButton.addEventListener("click", function () {
        const productName = deleteButton.getAttribute("value");
        deleteProduct(productName);
    });
});

const deleteProduct = async (productName) => {
    try {
        await fetch(`https://inft2202-server.onrender.com/api/products/${productName}`, {
            method: "DELETE",
        });
        console.log(`Product "${productName}" deleted successfully!`);
        location.reload();
    } catch (error) {
        console.error(`Error deleting product "${productName}": ${error.message}`);
    }
};