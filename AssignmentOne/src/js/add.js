console.log('add.js loaded');
import Product from "../modal/product.js";
console.log("Product loaded");
const saveButton = document.getElementById('productForm');
console.log(saveButton);   
saveButton.addEventListener('submit', async function (event) {
    event.preventDefault();
    console.log('Form submitted');
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const stock = parseInt(document.getElementById('productStock').value);
    const price = parseFloat(document.getElementById('productPrice').value);
    console.log(name, description, stock, price);
    if (!validateForm(name, description, stock, price)) {
        return;
    }
    
    const product = new Product(name, description, stock, price);
    console.log(product,"product");
    await addProduct(product);
    console.log('Product added successfully!');
})





const addProduct = async(product)=>{
    try {
        const response = await fetch('https://inft2202-server.onrender.com/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                name: product.name,
                description: product.description,
                price: parseFloat(product.price),
                stock: parseInt(product.stock)
            })
        });
        const result = await response.json();
        console.dir(result);
        if (response.ok) {
            alert('Product added successfully!');
            fetchProducts(); // Refresh the product list
        } else {
            alert('Failed to add product. Please try again.');
        }
    } catch (error) {
        console.error('Error adding product:', error);    
        alert(error.message);  
    }
        }


const validateForm = (name, description, stock, price) => {
    if (!name || !description || stock <= 0 || price <= 0) {
        alert('Please fill in all fields and ensure stock and price are valid.');
        return false;
    }
    return true;
}