// Корзина - состояние
let cartItems = [];
let cartCount = 0;

// Обновление счетчика корзины
function updateCartCount() {
    document.getElementById('cartCount').textContent = cartCount;
}

// Добавление товара в корзину
function addToCart(name, price) {
    const existingItem = cartItems.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: Date.now(),
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    cartCount += 1;
    updateCartCount();
    renderCartItems();
}

// Удаление товара из корзины
function removeFromCart(itemId) {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cartCount -= cartItems[itemIndex].quantity;
        cartItems.splice(itemIndex, 1);
        updateCartCount();
        renderCartItems();
    }
}

// Изменение количества товара
function updateQuantity(itemId, change) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            cartCount += change;
            updateCartCount();
            renderCartItems();
        }
    }
}

// Отрисовка товаров в корзине
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const emptyCart = document.getElementById('emptyCart');
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '';
        cartTotal.style.display = 'none';
        checkoutBtn.style.display = 'none';
        emptyCart.style.display = 'block';
    } else {
        emptyCart.style.display = 'none';
        cartTotal.style.display = 'block';
        checkoutBtn.style.display = 'block';
        
        cartItemsContainer.innerHTML = cartItems.map(item => `
            <div class="cart-item-figma">
                <button class="remove-item-figma" onclick="removeFromCart(${item.id})">×</button>
                <div class="cart-item-image-figma"></div>
                <div class="cart-item-details-figma">
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString()} ₽</p>
                </div>
                <div class="cart-item-controls-figma">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
        `).join('');
        
        const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        document.getElementById('totalPrice').textContent = totalPrice.toLocaleString();
    }
}

// Открытие модального окна
function openModal(type, data) {
    const modals = {
        'cart': 'cartModal',
        'history': 'historyModal',
        'feature': 'featureModal'
    };
    
    if (type === 'feature' && data) {
        const features = {
            'water': {
                title: 'Мягкая вода',
                content: 'Подземные воды реки Содигава — вода которая бережно относится к пряже и материалу полотенца и позволяет получить нежные и яркие цвета, подчеркивая естественную мягкость используемого хлопка.'
            },
            'craft': {
                title: 'Богатый опыт',
                content: 'Различные ремесленные навыки можно увидеть в деталях каждого этапа производства полотенца, включая обработку пряжи, ткачество, состав красителя и уникальную технику Sakizarashi Sakizome.'
            },
            'standards': {
                title: 'Стандарты качества',
                content: 'У нас есть свои собственные методы проверки качества. Например, есть «правило пяти секунд». Оно проверяет, тонет ли полотенце после того, как его положили на воду в течение пяти секунд.'
            }
        };
        
        const feature = features[data];
        if (feature) {
            document.getElementById('featureTitle').textContent = feature.title;
            document.getElementById('featureContent').textContent = feature.content;
        }
    }
    
    const modalId = modals[type];
    if (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
}

// Закрытие модального окна
function closeModal() {
    const modals = ['cartModal', 'historyModal', 'featureModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    });
    document.body.style.overflow = 'auto';
}

// Закрытие модального окна при клике на ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    renderCartItems();
});