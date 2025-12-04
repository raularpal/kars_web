// Sync script for main KARS website to read admin data
class KarsSync {
    constructor() {
        this.vehicles = [];
        this.lastSync = null;
        this.init();
    }

    init() {
        this.loadSyncData();
        this.setupSyncListener();
    }

    // Load data from admin panel
    loadSyncData() {
        try {
            // Try to get data from localStorage (admin panel)
            const syncData = localStorage.getItem('kars_sync_data');
            if (syncData) {
                const data = JSON.parse(syncData);
                this.vehicles = data.vehicles || [];
                this.lastSync = data.timestamp;
                console.log('Loaded sync data:', this.vehicles.length, 'vehicles');
                return;
            }

            // Fallback: try direct admin localStorage
            const adminData = localStorage.getItem('kars_vehicles');
            if (adminData) {
                this.vehicles = JSON.parse(adminData);
                this.lastSync = new Date().toISOString();
                console.log('Loaded admin data directly:', this.vehicles.length, 'vehicles');
                return;
            }

            // Final fallback: use mock data
            this.vehicles = this.getMockData();
            this.lastSync = null;
            console.log('Using mock data');
        } catch (error) {
            console.error('Error loading sync data:', error);
            this.vehicles = this.getMockData();
        }
    }

    // Listen for sync updates from admin panel
    setupSyncListener() {
        // Check for updates every 5 seconds
        setInterval(() => {
            const currentSync = localStorage.getItem('kars_sync_data');
            if (currentSync) {
                const data = JSON.parse(currentSync);
                if (data.timestamp !== this.lastSync) {
                    this.loadSyncData();
                    this.updateUI();
                    this.showSyncNotification();
                }
            }
        }, 5000);

        // Listen for storage events (cross-tab sync)
        window.addEventListener('storage', (e) => {
            if (e.key === 'kars_sync_data' || e.key === 'kars_vehicles') {
                this.loadSyncData();
                this.updateUI();
                this.showSyncNotification();
            }
        });
    }

    // Get mock data for fallback
    getMockData() {
        return [
            {
                id: 1,
                brand: "Porsche",
                model: "Cayenne Turbo GT",
                price: 185000,
                km: 15000,
                year: 2023,
                hp: 640,
                type: "suv",
                fuel: "gasolina",
                image: "assets/car1.png",
                dateAdded: "2023-10-01",
                status: "available"
            },
            {
                id: 2,
                brand: "Mercedes-Benz",
                model: "S 580",
                price: 142900,
                km: 5000,
                year: 2024,
                hp: 503,
                type: "berlina",
                fuel: "hibrido",
                image: "assets/car2.png",
                dateAdded: "2023-11-15",
                status: "available"
            },
            {
                id: 3,
                brand: "Ferrari",
                model: "Roma",
                price: 230000,
                km: 2500,
                year: 2022,
                hp: 620,
                type: "deportivo",
                fuel: "gasolina",
                image: "assets/car3.png",
                dateAdded: "2023-09-20",
                status: "available"
            }
        ];
    }

    // Get available vehicles only
    getAvailableVehicles() {
        return this.vehicles.filter(v => v.status === 'available');
    }

    // Get vehicle by ID
    getVehicleById(id) {
        return this.vehicles.find(v => v.id === id);
    }

    // Update UI with new data
    updateUI() {
        // Update catalog if on catalog page
        if (typeof updateCatalog === 'function') {
            updateCatalog(this.getAvailableVehicles());
        }

        // Update featured vehicles if on home page
        if (typeof updateFeaturedVehicles === 'function') {
            updateFeaturedVehicles(this.getAvailableVehicles().slice(0, 3));
        }

        // Update sales page if needed
        if (typeof updateSalesPage === 'function') {
            updateSalesPage(this.vehicles.filter(v => v.status === 'sold'));
        }
    }

    // Show sync notification
    showSyncNotification() {
        const notification = document.createElement('div');
        notification.className = 'sync-notification';
        notification.innerHTML = `
            <i class="fa-solid fa-sync"></i>
            <span>Catálogo actualizado</span>
        `;
        
        if (!document.querySelector('#sync-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'sync-notification-styles';
            style.textContent = `
                .sync-notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: var(--accent-color);
                    color: var(--primary-color);
                    padding: 12px 20px;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-weight: 500;
                    z-index: 1000;
                    animation: slideUp 0.3s ease;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize sync system
let karsSync;
document.addEventListener('DOMContentLoaded', () => {
    karsSync = new KarsSync();
    
    // Make available globally
    window.karsSync = karsSync;
    
    // Update existing pages after sync loads
    setTimeout(() => {
        karsSync.updateUI();
    }, 100);
});

// Export functions for use in other scripts
window.getAvailableVehicles = () => karsSync.getAvailableVehicles();
window.getAllVehicles = () => karsSync.vehicles;
