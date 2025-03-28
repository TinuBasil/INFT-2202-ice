console.log('add.js loaded');

document.getElementById('productForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission
    console.log('Form submitted');

    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productStock = document.getElementById('productStock').value;
    const productPrice = document.getElementById('productPrice').value;

    const productData = {
        name: productName,
        description: productDescription,
        stock: productStock,
        price: productPrice
    };

    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        if (response.ok) {
            const newProduct = await response.json();
            alert(`Product added successfully: ${newProduct.name}`);
            // Optionally, redirect to the product list page
            window.location.href = 'list.html';
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was a problem adding the product.');
    }
});