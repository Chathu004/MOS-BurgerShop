// Sample menu data with consistent image paths
const burgers = [
    { name: 'Cheese Burger', price: 550, image: 'images/p1.jpg', category: 'burgers' },
    { name: 'Chicken Burger', price: 600, image: 'images/p2.jpg', category: 'burgers' },
    { name: 'Double Beef Burger', price: 75, image: 'images/p3.jpg', category: 'burgers' },
    { name: 'Cheese Burger', price: 550, image: 'images/p4.jpg', category: 'burgers' },
    { name: 'Chicken Burger', price: 600, image: 'images/p5.jpg', category: 'burgers' },
    { name: 'Double Beef Burger', price: 750, image: 'images/p6.jpg', category: 'burgers' },
    { name: 'Cheese Burger', price: 550, image: 'images/p7.png', category: 'burgers' },
    { name: 'Chicken Burger', price: 600, image: 'images/p8.jpg', category: 'burgers' },
    { name: 'Double Beef Burger', price: 750, image: 'images/p9.jpg', category: 'burgers' },
    { name: 'Cheese Burger', price: 550, image: 'images/p10.jpg', category: 'burgers' },
    { name: 'Chicken Burger', price: 600, image: 'images/p11.jpg', category: 'burgers' },
    { name: 'Double Beef Burger', price: 750, image: 'images/p12.jpg', category: 'burgers' },
    { name: 'Cheese Burger', price: 550, image: 'images/p13.jpg', category: 'burgers' },
    { name: 'Chicken Burger', price: 600, image: 'images/p14.jpg', category: 'burgers' },
    { name: 'Double Beef Burger', price: 750, image: 'images/p15.jpg', category: 'burgers' },
    { name: 'Cheese Burger', price: 550, image: 'images/p16.jpg', category: 'burgers' },
];

const drinks = [
    { name: 'Coca-Cola', price: 150, image: 'images/d1.jpg', category: 'drinks' },
    { name: 'Pepsi', price: 150, image: 'images/d2.jpg', category: 'drinks' },
    { name: 'Iced Tea', price: 200, image: 'images/d3.jpg', category: 'drinks' },
    { name: 'Lemonade', price: 200, image: 'images/d4.jpg', category: 'drinks' },
    { name: 'Lemonade', price: 200, image: 'images/d5.jpg', category: 'drinks' },
    { name: 'Lemonade', price: 200, image: 'images/d6.jpg', category: 'drinks' },
    { name: 'Lemonade', price: 200, image: 'images/d7.jpg', category: 'drinks' },
    { name: 'Lemonade', price: 200, image: 'images/d8.jpg', category: 'drinks' }

];

// DOM Elements
const burgersMenu = document.getElementById('burgers-menu');
const drinksMenu = document.getElementById('drinks-menu');
const cartItems = document.getElementById('cart-items');
const totalDisplay = document.getElementById('total');
const cartCount = document.getElementById('cart-count');
const menuSearch = document.getElementById('menu-search');
const tabs = document.querySelectorAll('.tab');
//const burgerCount = document.querySelector('#burgers-menu + .item-count');
//const drinkCount = document.querySelector('#drinks-menu + .item-count');
const burgerCount = document.getElementById('burger-count');
const drinkCount = document.getElementById('drink-count');


// Initialize
renderMenu();
updateItemCounts();

// Render menu items
function renderMenu() {
    burgersMenu.innerHTML = '';
    drinksMenu.innerHTML = '';

    burgers.forEach(burger => {
        const item = document.createElement('div');
        item.className = 'menu-item';
        item.innerHTML = `
            <img src="${burger.image}" alt="${burger.name}">
            <h3>${burger.name}</h3>
            <p>Rs. ${burger.price}</p>
            <button onclick="addToCart('${burger.name}', ${burger.price})">Add to Cart</button>
        `;
        burgersMenu.appendChild(item);
    });

    drinks.forEach(drink => {
        const item = document.createElement('div');
        item.className = 'menu-item';
        item.innerHTML = `
            <img src="${drink.image}" alt="${drink.name}">
            <h3>${drink.name}</h3>
            <p>Rs. ${drink.price}</p>
            <button onclick="addToCart('${drink.name}', ${drink.price})">Add to Cart</button>
        `;
        drinksMenu.appendChild(item);
    });
}

// Update item counts display
function updateItemCounts() {
    burgerCount.textContent = `(${burgers.length} items)`;
    drinkCount.textContent = `(${drinks.length} items)`;
}

// Cart functionality
let cart = [];
let total = 0;

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCartDisplay();
}

function updateCartDisplay() {
    cartItems.innerHTML = '';
    total = 0;
    let itemCount = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>Rs. ${item.price * item.quantity}</span>
            <button class="remove-btn" data-name="${item.name}">×</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
        itemCount += item.quantity;
    });

    totalDisplay.textContent = total.toFixed(2);
    cartCount.textContent = `(${itemCount})`;
}

// Event delegation for remove buttons
document.getElementById('cart-items').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const itemName = e.target.dataset.name;
        const itemIndex = cart.findIndex(item => item.name === itemName);

        if (itemIndex > -1) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity--;
            } else {
                cart.splice(itemIndex, 1);
            }
            updateCartDisplay();
        }
    }
});

// Checkout function
document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const notes = document.getElementById('order-notes').value;
    alert(`Order Complete!\nTotal: Rs. ${total.toFixed(2)}\n${notes ? `Notes: ${notes}` : ''}`);

    // Reset cart
    cart = [];
    document.getElementById('order-notes').value = '';
    updateCartDisplay();
});

// Search functionality
menuSearch.addEventListener('input', () => {
    const searchTerm = menuSearch.value.toLowerCase();
    const items = document.querySelectorAll('.menu-item');

    items.forEach(item => {
        const name = item.querySelector('h3').textContent.toLowerCase();
        if (name.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// Tab filtering
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.dataset.category;
        const sections = document.querySelectorAll('.menu-section');

        sections.forEach(section => {
            if (category === 'all') {
                section.style.display = 'block';
            } else {
                const sectionCategory = section.querySelector('.menu-container').id.includes('burgers') ? 'burgers' : 'drinks';
                section.style.display = sectionCategory === category ? 'block' : 'none';
            }
        });
    });
});