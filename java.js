const header = document.querySelector("header");

window.addEventListener("scroll",function(){
header.classList.toggle ("sticky",this.window.scrollY > 0)
})
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
cartIcon.addEventListener("click",() => cart.classList.add("active"));
cartClose.addEventListener("click",() => cart.classList.remove("active"));


document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.getElementById("cart-icon");
    const cart = document.querySelector(".cart");
    const closeCart = document.getElementById("cart-close");
    const cartContent = document.getElementById("cart-content");
    const totalPriceElement = document.querySelector(".total-price");
    const cartCounter = document.querySelector(".cartt span"); // Counter element

    cartIcon.addEventListener("click", () => {
        cart.classList.add("active");
    });

    closeCart.addEventListener("click", () => {
        cart.classList.remove("active");
    });

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", addToCart);
    });

    function addToCart(event) {
        event.preventDefault(); // Prevent page refresh
        let product = event.target.closest(".row");
        let title = product.querySelector(".price h4").innerText;
        let price = product.querySelector(".price p").innerText;
        let imageSrc = product.querySelector(".img-container img").src;

        let existingProduct = [...cartContent.getElementsByClassName("cart-product-title")].find(el => el.innerText === title);
        if (existingProduct) {
            let quantityElement = existingProduct.parentElement.querySelector(".number");
            quantityElement.innerText = parseInt(quantityElement.innerText) + 1;
        } else {
            let cartBox = document.createElement("div");
            cartBox.classList.add("cart-box");
            cartBox.innerHTML = `
                <img src="${imageSrc}" class="cart-img">
                <div class="cart-details">
                    <h2 class="cart-product-title">${title}</h2>
                    <span class="cart-price">${price}</span>
                    <div class="cart-quantity">
                        <button class="decrease">-</button>
                        <span class="number">1</span>
                        <button class="increase">+</button>
                    </div>
                </div>
                <i class="fi fi-rr-trash cart-remove"></i>
            `;
            cartContent.appendChild(cartBox);
            cartBox.querySelector(".cart-remove").addEventListener("click", removeItem);
            cartBox.querySelector(".increase").addEventListener("click", increaseQuantity);
            cartBox.querySelector(".decrease").addEventListener("click", decreaseQuantity);
        }
        updateCartCounter();
        updateTotal();
    }

    function removeItem(event) {
        event.target.parentElement.remove();
        updateCartCounter();
        updateTotal();
    }

    function increaseQuantity(event) {
        let quantityElement = event.target.previousElementSibling;
        quantityElement.innerText = parseInt(quantityElement.innerText) + 1;
        updateTotal();
    }

    function decreaseQuantity(event) {
        let quantityElement = event.target.nextElementSibling;
        if (parseInt(quantityElement.innerText) > 1) {
            quantityElement.innerText = parseInt(quantityElement.innerText) - 1;
        } else {
            event.target.closest(".cart-box").remove();
        }
        updateCartCounter();
        updateTotal();
    }

    function updateCartCounter() {
        let cartItems = cartContent.getElementsByClassName("cart-box").length;
        cartCounter.innerText = cartItems; // Update the cart count
    }

    function updateTotal() {
        let total = 0;
        cartContent.querySelectorAll(".cart-box").forEach(box => {
            let price = parseInt(box.querySelector(".cart-price").innerText.replace("DA", ""));
            let quantity = parseInt(box.querySelector(".number").innerText);
            total += price * quantity;
        });
        totalPriceElement.innerText = total + "DA";
    }
});
