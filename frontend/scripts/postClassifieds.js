
document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.querySelector("#productForm");

    productForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form data
        const formData = new FormData(productForm);

        // Convert FormData to JSON object
        const productData = {};
        formData.forEach((value, key) => {
            productData[key] = value;
        });

        // You can now send productData to your server using fetch or another method
        console.log(productData);

        // Clear the form after submission
        productForm.reset();
    });
});
