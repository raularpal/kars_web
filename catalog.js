document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('catalog-grid');
    const countElement = document.getElementById('vehicle-count');
    const applyBtn = document.getElementById('apply-filters');
    const resetBtn = document.getElementById('reset-filters');
    const sortSelect = document.getElementById('sort-select');

    // Get vehicles from sync system
    let vehicles = [];

    function loadVehicles() {
        if (window.karsSync) {
            vehicles = window.karsSync.getAvailableVehicles();
        } else {
            // Fallback to mock data
            vehicles = [
                {
                    id: 1,
                    name: "Porsche Cayenne Turbo GT",
                    price: 185000,
                    km: 15000,
                    year: 2023,
                    hp: 640,
                    type: "suv",
                    fuel: "gasolina",
                    image: "assets/car1.png",
                    dateAdded: "2023-10-01"
                },
                {
                    id: 2,
                    name: "Mercedes-Benz S 580",
                    price: 142900,
                    km: 5000,
                    year: 2024,
                    hp: 503,
                    type: "berlina",
                    fuel: "hibrido",
                    image: "assets/car2.png",
                    dateAdded: "2023-11-15"
                },
                {
                    id: 3,
                    name: "Ferrari Roma",
                    price: 230000,
                    km: 2500,
                    year: 2022,
                    hp: 620,
                    type: "deportivo",
                    fuel: "gasolina",
                    image: "assets/car3.png",
                    dateAdded: "2023-09-20"
                }
            ];
        }
        filterVehicles();
    }

    // Update catalog function for sync system
    window.updateCatalog = function(newVehicles) {
        vehicles = newVehicles;
        filterVehicles();
    };

    // Render Vehicles
    function renderVehicles(data) {
        grid.innerHTML = '';
        countElement.textContent = data.length;

        if (data.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No se encontraron vehículos con estos filtros.</p>';
            return;
        }

        data.forEach(vehicle => {
            const card = document.createElement('div');
            card.className = 'vehicle-card';
            
            // Handle multiple images
            const images = vehicle.images || [{ dataUrl: vehicle.image }];
            
            card.innerHTML = `
                <div class="card-image">
                    ${images.length > 1 ? `
                        <div class="image-gallery">
                            <div class="gallery-main">
                                <img src="${images[0].dataUrl}" alt="${vehicle.brand || ''} ${vehicle.model || ''}" id="main-${vehicle.id}">
                                ${images.length > 1 ? `
                                    <button class="gallery-nav gallery-prev" onclick="window.changeImage(${vehicle.id}, -1)">
                                        <i class="fa-solid fa-chevron-left"></i>
                                    </button>
                                    <button class="gallery-nav gallery-next" onclick="window.changeImage(${vehicle.id}, 1)">
                                        <i class="fa-solid fa-chevron-right"></i>
                                    </button>
                                ` : ''}
                            </div>
                            ${images.length > 1 ? `
                                <div class="gallery-thumbnails">
                                    ${images.map((img, index) => `
                                        <div class="gallery-thumbnail ${index === 0 ? 'active' : ''}" 
                                             onclick="window.setMainImage(${vehicle.id}, ${index})"
                                             id="thumb-${vehicle.id}-${index}">
                                            <img src="${img.dataUrl}" alt="${vehicle.brand} ${vehicle.model} ${index + 1}">
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    ` : `
                        <img src="${vehicle.image}" alt="${vehicle.brand || ''} ${vehicle.model || ''}">
                    `}
                    <div class="card-price-overlay">
                        ${vehicle.discounted_price ? `
                            <div>
                                <span style="text-decoration: line-through; opacity: 0.7; font-size: 0.8rem;">
                                    ${vehicle.price.toLocaleString('de-DE')} €
                                </span>
                                <div style="font-weight: 700;">
                                    ${vehicle.discounted_price.toLocaleString('de-DE')} €
                                </div>
                            </div>
                        ` : `
                            ${vehicle.price.toLocaleString('de-DE')} €
                        `}
                    </div>
                </div>
                <div class="card-details">
                    <div class="card-header">
                        <h3>${vehicle.brand ? `${vehicle.brand} ${vehicle.model}` : vehicle.name}</h3>
                    </div>
                    <div class="card-specs">
                        <span><i class="fa-solid fa-gauge-high"></i> ${vehicle.km.toLocaleString()} km</span>
                        <span><i class="fa-solid fa-calendar"></i> ${vehicle.year}</span>
                        <span><i class="fa-solid fa-horse"></i> ${vehicle.hp} cv</span>
                    </div>
                    <div class="card-actions">
                        <a href="https://wa.me/376800100?text=Hola, me interesa el ${vehicle.brand ? `${vehicle.brand} ${vehicle.model}` : vehicle.name}" 
                           class="btn btn-whatsapp btn-block" target="_blank"><i class="fa-brands fa-whatsapp"></i> Consultar</a>
                    </div>
                </div>
            `;
            
            // Store gallery data globally
            if (!window.galleryData) window.galleryData = {};
            window.galleryData[vehicle.id] = {
                images: images,
                currentIndex: 0
            };
            
            grid.appendChild(card);
        });
    }

    // Gallery functions
    window.changeImage = function(vehicleId, direction) {
        const gallery = window.galleryData[vehicleId];
        if (!gallery || gallery.images.length <= 1) return;
        
        gallery.currentIndex = (gallery.currentIndex + direction + gallery.images.length) % gallery.images.length;
        window.setMainImage(vehicleId, gallery.currentIndex);
    };

    window.setMainImage = function(vehicleId, index) {
        const gallery = window.galleryData[vehicleId];
        if (!gallery) return;
        
        gallery.currentIndex = index;
        
        // Update main image
        const mainImg = document.getElementById(`main-${vehicleId}`);
        if (mainImg) {
            mainImg.src = gallery.images[index].dataUrl;
        }
        
        // Update thumbnails
        gallery.images.forEach((_, i) => {
            const thumb = document.getElementById(`thumb-${vehicleId}-${i}`);
            if (thumb) {
                thumb.classList.toggle('active', i === index);
            }
        });
    };

    // Filter and Sort Logic
    function filterVehicles() {
        // Get selected types
        const selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);

        // Get selected fuels
        const selectedFuels = Array.from(document.querySelectorAll('input[name="fuel"]:checked')).map(cb => cb.value);

        // Get HP range
        const minHp = parseInt(document.getElementById('min-hp').value) || 0;
        const maxHp = parseInt(document.getElementById('max-hp').value) || 9999;

        // Get Price range
        const minPrice = parseInt(document.getElementById('min-price').value) || 0;
        const maxPrice = parseInt(document.getElementById('max-price').value) || 99999999;

        // Get Sort Option
        const sortOption = sortSelect ? sortSelect.value : 'date-desc';

        let filtered = vehicles.filter(vehicle => {
            // Type filter
            if (selectedTypes.length > 0 && !selectedTypes.includes(vehicle.type)) return false;

            // Fuel filter
            if (selectedFuels.length > 0 && !selectedFuels.includes(vehicle.fuel)) return false;

            // HP filter
            if (vehicle.hp < minHp || vehicle.hp > maxHp) return false;

            // Price filter
            if (vehicle.price < minPrice || vehicle.price > maxPrice) return false;

            return true;
        });

        // Sorting
        filtered.sort((a, b) => {
            if (sortOption === 'price-asc') {
                return a.price - b.price;
            } else if (sortOption === 'price-desc') {
                return b.price - a.price;
            } else if (sortOption === 'date-desc') {
                return new Date(b.dateAdded) - new Date(a.dateAdded);
            }
            return 0;
        });

        renderVehicles(filtered);
    }

    // Event Listeners
    if (applyBtn) {
        applyBtn.addEventListener('click', filterVehicles);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Reset checkboxes
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            // Reset inputs
            document.querySelectorAll('input[type="number"]').forEach(input => input.value = '');
            // Reset sort
            if (sortSelect) sortSelect.value = 'date-desc';
            filterVehicles();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', filterVehicles);
    }

    // Load vehicles when page loads
    if (grid) {
        // Wait for sync system to load
        setTimeout(() => {
            loadVehicles();
        }, 500);
    }
});
