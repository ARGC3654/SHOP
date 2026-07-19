// ==================== PRODUCTOS: SUÉTERES ====================
// Las imágenes vienen de tu carpeta "IMAGENES_ROPA" (debe estar en la
// misma carpeta que index.html cuando subas todo a GitHub).
//
// "images" es un arreglo: si el suéter tiene foto de frente Y reverso,
// pon las dos [frente, reverso] y aparecerá un botón para voltearla.
// Si solo tiene una vista, deja un solo elemento en el arreglo.
//
// ⚠️ AJUSTA "price" y "sizes" de cada producto — puse valores de
// ejemplo, cámbialos por el precio real y las tallas que manejas.
const products = [
    {
        id: 1,
        name: "Suéter Los Ángeles",
        price: 0,
        sizes: ["S", "M", "L", "XL"],
        images: ["IMAGENES_ROPA/LOS-ANGELES%20SUETER.png"] // el %20 reemplaza el espacio del nombre
    },
    {
        id: 2,
        name: "Suéter Blanco Batman",
        price: 0,
        sizes: ["S", "M", "L", "XL"],
        images: ["IMAGENES_ROPA/SUETER-BLANCO-BATMAN.png"]
    },
    {
        id: 3,
        name: "Suéter Blanco Money",
        price: 0,
        sizes: ["S", "M", "L", "XL"],
        images: ["IMAGENES_ROPA/SUETER-BLANCO-MONEY-ENFRENTE.png", "IMAGENES_ROPA/SUETER-BLANCO-MONEY.png"]
    },
    {
        id: 4,
        name: "Suéter Blanco Playa",
        price: 0,
        sizes: ["S", "M", "L", "XL"],
        images: ["IMAGENES_ROPA/SUETER-BLANCO-PLAYA-ENFRENTE.png", "IMAGENES_ROPA/SUETER-BLANCO-PLAYA.png"]
    },
    {
        id: 5,
        name: "Suéter California",
        price: 0,
        sizes: ["S", "M", "L", "XL"],
        // ⚠️ Revisa que este nombre coincida exacto con tu archivo de la vista de frente:
        images: ["IMAGENES_ROPA/SUETER-CALIFORNIA-CALIFORNIA-ENFRENTE.png", "IMAGENES_ROPA/SUETER-CALIFORNIA-CALIFORNIA-ATRAS.png"]
    },
    {
        id: 6,
        name: "Suéter Flores Rosadas",
        price: 0,
        sizes: ["S", "M", "L", "XL"],
        // ⚠️ Revisa que este nombre coincida exacto con tu archivo (frente y reverso en una sola imagen):
        images: ["IMAGENES_ROPA/SUETER-FLORES-ROSADAS-ATRAS-ENFRENTE.png"]
    },
    {
        id: 7,
        name: "Suéter Gris",
        price: 0,
        sizes: ["S", "M", "L", "XL"],
        images: ["IMAGENES_ROPA/SUETER-GRIS-ENFRENTE.png"]
    },
    {
        id: 8,
        name: "Suéter Gris Olas",
        price: 0,
        sizes: ["S", "M", "L", "XL"],
        images: ["IMAGENES_ROPA/SUETER-GRIS-OLAS-ESPALDA.png"]
    },
    {
        id: 9,
        name: "Suéter Mon",
        price: 0,
        sizes: ["S", "M", "L", "XL"],
        images: ["IMAGENES_ROPA/SUETER-MON-ENFRENTE.png", "IMAGENES_ROPA/SUETER-MON-ESPALDA.png"]
    },
    {
        id: 10,
        name: "Suéter Negro Batman",
        price: 0,
        sizes: ["S", "M", "L", "XL"],
        images: ["IMAGENES_ROPA/SUETER-NEGRO-BATMAN.jpg"]
    },
    {
        id: 11,
        name: "Suéter Santa Cruz",
        price: 0,
        sizes: ["S", "M", "L", "XL"],
        images: ["IMAGENES_ROPA/SUETER-SANTA-CRUZ.png"]
    }
    // Agrega más suéteres aquí siguiendo el mismo formato ↑
];

// El resto del código (no lo modifiques a menos que sepas JS)
function renderProducts(list = products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    list.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        const hasBack = product.images.length > 1;

        card.innerHTML = `
            <div class="product-image-wrap">
                <img src="${product.images[0]}" alt="${product.name}" data-index="0">
                ${hasBack ? `<button class="flip-btn" title="Ver reverso"><i class="fas fa-sync-alt"></i></button>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="sizes">
                    ${product.sizes.map(size => `<span>${size}</span>`).join('')}
                </div>
                <p class="price">$${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">Agregar al Carrito</button>
            </div>
        `;
        grid.appendChild(card);

        if (hasBack) {
            const img = card.querySelector('img');
            card.querySelector('.flip-btn').addEventListener('click', () => {
                const current = parseInt(img.getAttribute('data-index'));
                const next = current === 0 ? 1 : 0;
                img.src = product.images[next];
                img.setAttribute('data-index', next);
            });
        }
    });

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            addToCart(id);
        });
    });
}

// Buscador: filtra el catálogo por nombre mientras el cliente escribe
function setupSearch() {
    const input = document.getElementById('search-input');
    input.addEventListener('input', () => {
        const term = input.value.trim().toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(term));
        renderProducts(filtered);
    });
}

// ... (el resto del código del carrito se mantiene igual)
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartCount();
    showNotification(`${product.name} agregado al carrito`);
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function showCart() {
    const modal = document.getElementById('cart-modal');
    const itemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    itemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div><strong>${item.name}</strong><br>$${item.price} x ${item.quantity}</div>
            <div style="text-align: right;">
                $${itemTotal.toFixed(2)}
                <button onclick="removeFromCart(${index})" style="color: #ff6b6b;">Eliminar</button>
            </div>
        `;
        itemsContainer.appendChild(div);
    });
    
    totalElement.textContent = total.toFixed(2);
    modal.style.display = 'block';
}

function removeFromCart(index) {
    cart.splice(index, 1);
    showCart();
    updateCartCount();
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#222;color:white;padding:15px 25px;border-radius:8px;z-index:300;';
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2500);
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupSearch();
    document.querySelector('.cart').addEventListener('click', showCart);
    
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('cart-modal').style.display = 'none';
    });
    
    document.querySelector('.checkout').addEventListener('click', () => {
        if (cart.length > 0) {
            alert('¡Gracias por tu compra! (Esto es una demostración)');
            cart = [];
            updateCartCount();
            document.getElementById('cart-modal').style.display = 'none';
        }
    });
});