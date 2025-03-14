document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    let name = document.getElementById("name").value.trim();
    let lastname = document.getElementById("last-name").value.trim();
    let address = document.getElementById("address").value.trim();
    let payment = document.getElementById("payment").value;

    if (name === "" || lastname=== "" || address === "" || payment === "") {
        document.getElementById("error-message").textContent = "Please fill in all fields!";
    } else {
        alert("Order placed successfully!");
        window.location.href = "index.html"; // Redirect to home page
    }
});