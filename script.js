// ==================== PRODUCTOS: SUÉTERES ====================
// Esto es solo un catálogo (no se vende directo desde la página).
// Las imágenes vienen de tu carpeta "IMAGENES_ROPA" (debe estar en la
// misma carpeta que index.html cuando subas todo a GitHub).
//
// "images" es un arreglo: si el suéter tiene foto de frente Y reverso,
// pon las dos [frente, reverso] y aparecerá un botón para voltearla.
// Si solo tiene una vista, deja un solo elemento en el arreglo.
//
// "price" está en Quetzales (Q) — puse precios de ejemplo entre
// Q250 y Q300, ajústalos por el precio real de cada suéter.
const products = [
    {
        id: 1,
        name: "Suéter Los Ángeles Tie Dye",
        price: 265,
        sizes: ["S", "M", "L", "XL"],
        images: ["IMAGENES_ROPA/LOS-ANGELES%20SUETER.png"] // el %20 reemplaza el espacio del nombre
    },
    {
        id: 2,
        name: "Suéter Batman Crema",
        price: 280,
        sizes: ["S", "M", "L", "XL"],
        images: ["IMAGENES_ROPA/SUETER-BLANCO-BATMAN.png"]
    },
    {
        id: 3,
        name: "Suéter Money Bubble",
        price: 295,
        sizes: ["S", "M", "L", "XL"],
        images: ["IMAGENES_ROPA/SUETER-BLANCO-MONEY-ENFRENTE.png", "IMAGENES_ROPA/SUETER-BLANCO-MONEY.png"]
    },
    {
        id: 4,
        name: "Suéter Playa Palmera",
        price: 259,
        sizes: ["S", "M", "L", "XL"],
        images: ["IMAGENES_ROPA/SUETER-BLANCO-PLAYA-ENFRENTE.png", "IMAGENES_ROPA/SUETER-BLANCO-PLAYA.png"]
    },
    {
        id: 5,
        name: "Suéter California Vintage",
        price: 300,
        sizes: ["S", "M", "L", "XL"],
        // ⚠️ Revisa que este nombre coincida exacto con tu archivo de la vista de frente:
        images: ["IMAGENES_ROPA/SUETER-CALIFORNIA-CALIFORNIA-ENFRENTE.png", "IMAGENES_ROPA/SUETER-CALIFORNIA-CALIFORNIA-ATRAS.png"]
    },
    {
        id: 6,
        name: "Suéter Sakura Tokio",
        price: 270,
        sizes: ["S", "M", "L", "XL"],
        // ⚠️ Revisa que este nombre coincida exacto con tu archivo (frente y reverso en una sola imagen):
        images: ["IMAGENES_ROPA/SUETER-FLORES-ROSADAS-ATRAS-ENFRENTE.png"]
    },
    {
        id: 7,
        name: "Suéter Gris Hokkaido Wave",
        price: 275,
        sizes: ["S", "M", "L", "XL"],
        // Frente (texto pequeño) y reverso (la ola grande) son la misma sudadera:
        images: ["IMAGENES_ROPA/SUETER-GRIS-ENFRENTE.png", "IMAGENES_ROPA/SUETER-GRIS-OLAS-ESPALDA.png"]
    },
    {
        id: 8,
        name: "Suéter Mon Beige",
        price: 275,
        sizes: ["S", "M", "L", "XL"],
        images: ["IMAGENES_ROPA/SUETER-MON-ENFRENTE.png", "IMAGENES_ROPA/SUETER-MON-ESPALDA.png"]
    },
    {
        id: 9,
        name: "Suéter Negro Batman Cómic",
        price: 292,
        sizes: ["S", "M", "L", "XL"],
        images: ["IMAGENES_ROPA/SUETER-NEGRO-BATMAN.jpg"]
    },
    {
        id: 10,
        name: "Suéter Santa Cruz Donut",
        price: 262,
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
                <p class="price">Q${product.price}</p>
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

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupSearch();
});