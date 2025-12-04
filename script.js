document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            nav.style.padding = '0.5rem 0';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.padding = '1rem 0';
        }
    });

    // Language Translations
    const translations = {
        es: {
            nav_home: "Inicio",
            nav_catalog: "Vehículos",
            nav_about: "Nosotros",
            nav_services: "Servicios",
            nav_sales: "Últimas ventas",
            nav_contact: "Contacto",
            nav_location: "Ubicación",
            hero_title: "Excelencia en Movimiento",
            hero_subtitle: "Descubre nuestra selección exclusiva de vehículos premium, deportivos y de lujo en Andorra. 30 años de experiencia a tu servicio.",
            hero_btn_view: "Ver Vehículos",
            hero_btn_contact: "Contactar",
            featured_title: "Vehículos Destacados",
            filter_all: "Todos",
            filter_sport: "Deportivos",
            filter_suv: "SUV / 4x4",
            filter_sedan: "Berlina",
            btn_consult: "Consultar",
            btn_view_all: "Ver todos los vehículos",
            about_title: "Quiénes Somos",
            about_text_1: "En <strong>KARS Automòbils</strong>, llevamos más de 30 años dedicados a la pasión por el motor. Somos un concesionario multimarca independiente especializado en vehículos premium, deportivos y de lujo.",
            about_text_2: "Nuestra filosofía se basa en la transparencia, la confianza y una atención totalmente personalizada. Ofrecemos una selección de coches revisados sistemáticamente y garantizados, para que solo te preocupes de disfrutar de la conducción.",
            feature_warranty_title: "Garantía Premium",
            feature_warranty_desc: "12 meses de cobertura amplia.",
            feature_direct_title: "Trato Directo",
            feature_direct_desc: "Sin intermediarios innecesarios.",
            services_title: "Nuestros Servicios",
            service_sales_title: "Venta de Vehículos",
            service_sales_desc: "Amplio stock de vehículos nuevos, semi-nuevos y de ocasión de las marcas más prestigiosas.",
            service_import_title: "Importación a la Carta",
            service_import_desc: "Si buscas un modelo específico, lo encontramos e importamos para ti con todas las garantías.",
            service_workshop_title: "Taller Especializado",
            service_workshop_desc: "Servicio post-venta, mantenimiento y reparaciones con mecánicos expertos en alta gama.",
            service_warranty_title: "Garantía y Gestoría",
            service_warranty_desc: "Nos encargamos de todos los trámites y ofrecemos garantías complementarias para tu tranquilidad.",
            service_multilingual_title: "Atención Personalizada",
            service_multilingual_desc: "Atención personalizada en 6 idiomas (Català, Castellano, Francés, Inglés, Italiano, Portugués)",
            service_tradein_title: "Vehículos como Parte de Pago",
            service_tradein_desc: "Aceptamos tu vehículo como parte de pago, incluido depósito venta",
            service_instant_title: "Compra Instantánea",
            service_instant_desc: "Proceso de compra rápido y eficiente para tu comodidad",
            service_exclusive_title: "Productos Exclusivos",
            service_exclusive_desc: "Acceso a vehículos exclusivos y ediciones limitadas",
            contact_title: "Contacto y Ubicación",
            contact_title_only: "Contacto",
            location_title: "Ubicación",
            contact_visit_title: "Visítanos",
            contact_call_title: "Llámanos",
            contact_write_title: "Escríbenos",
            form_name: "Nombre",
            form_email: "Email",
            form_phone: "Teléfono",
            form_message: "Mensaje o vehículo de interés",
            form_submit: "Enviar Mensaje",
            form_title: "Envíanos un mensaje",
            sales_title: "Últimas Ventas",
            sales_subtitle: "Vehículos recientemente vendidos a clientes satisfechos",
            footer_desc: "Tu concesionario de confianza en Andorra para vehículos premium y deportivos.",
            footer_links: "Enlaces Rápidos",
            footer_schedule: "Horario",
            schedule_week: "Lunes - Jueves: 09:00 - 13:30 / 15:00 - 19:00",
            schedule_sat: "Viernes: 09:00 - 15:00",
            schedule_sun: "",
            footer_powered: "powered by"
        },
        ca: {
            nav_home: "Inici",
            nav_catalog: "Vehicles",
            nav_about: "Nosaltres",
            nav_services: "Serveis",
            nav_sales: "Últimes vendes",
            nav_contact: "Contacte",
            nav_location: "Ubicació",
            hero_title: "Excel·lència en Moviment",
            hero_subtitle: "Descobreix la nostra selecció exclusiva de vehicles prèmium, esportius i de luxe a Andorra. 30 anys d'experiència al teu servei.",
            hero_btn_view: "Veure Vehicles",
            hero_btn_contact: "Contactar",
            featured_title: "Vehicles Destacats",
            filter_all: "Tots",
            filter_sport: "Esportius",
            filter_suv: "SUV / 4x4",
            filter_sedan: "Berlina",
            btn_consult: "Consultar",
            btn_view_all: "Veure tots els vehicles",
            about_title: "Qui Som",
            about_text_1: "A <strong>KARS Automòbils</strong>, portem més de 30 anys dedicats a la passió pel motor. Som un concessionari multimarca independent especialitzat en vehicles prèmium, esportius i de luxe.",
            about_text_2: "La nostra filosofia es basa en la transparència, la confiança i una atenció totalment personalitzada. Oferim una selecció de cotxes revisats sistemàticament i garantits, perquè només et preocupis de gaudir de la conducció.",
            feature_warranty_title: "Garantia Prèmium",
            feature_warranty_desc: "12 mesos de cobertura àmplia.",
            feature_direct_title: "Tracte Directe",
            feature_direct_desc: "Sense intermediaris innecessaris.",
            services_title: "Els Nostres Serveis",
            service_sales_title: "Venda de Vehicles",
            service_sales_desc: "Ampli estoc de vehicles nous, semi-nous i d'ocasió de les marques més prestigioses.",
            service_import_title: "Importació a la Carta",
            service_import_desc: "Si busques un model específic, el trobem i importem per a tu amb totes les garanties.",
            service_workshop_title: "Taller Especialitzat",
            service_workshop_desc: "Servei post-venda, manteniment i reparacions amb mecànics experts en alta gamma.",
            service_warranty_title: "Garantia i Gestoria",
            service_warranty_desc: "Ens encarreguem de tots els tràmits i oferim garanties complementàries per a la teva tranquil·litat.",
            service_multilingual_title: "Atenció Personalitzada",
            service_multilingual_desc: "Atenció personalitzada en 6 idiomes (Català, Castellà, Francès, Anglès, Italià, Portuguès)",
            service_tradein_title: "Vehicles com a Part de Pagament",
            service_tradein_desc: "Acceptem el teu vehicle com a part de pagament, inclòs dipòsit venda",
            service_instant_title: "Compra Instantània",
            service_instant_desc: "Procés de compra ràpid i eficient per a la teva comoditat",
            service_exclusive_title: "Productes Exclusius",
            service_exclusive_desc: "Accés a vehicles exclusius i edicions limitades",
            contact_title: "Contacte i Ubicació",
            contact_title_only: "Contacte",
            location_title: "Ubicació",
            contact_visit_title: "Visita'ns",
            contact_call_title: "Truca'ns",
            contact_write_title: "Escriu-nos",
            form_name: "Nom",
            form_email: "Email",
            form_phone: "Telèfon",
            form_message: "Missatge o vehicle d'interès",
            form_submit: "Enviar Missatge",
            form_title: "Envia'ns un missatge",
            sales_title: "Últimes Vendes",
            sales_subtitle: "Vehicles recentment venuts a clients satisfets",
            footer_desc: "El teu concessionari de confiança a Andorra per a vehicles prèmium i esportius.",
            footer_links: "Enllaços Ràpids",
            footer_schedule: "Horari",
            schedule_week: "Dilluns - Dijous: 09:00 - 13:30 / 15:00 - 19:00",
            schedule_sat: "Divendres: 09:00 - 15:00",
            schedule_sun: "",
            footer_powered: "powered by"
        },
        fr: {
            nav_home: "Accueil",
            nav_catalog: "Véhicules",
            nav_about: "À Propos",
            nav_services: "Services",
            nav_sales: "Dernières ventes",
            nav_contact: "Contact",
            nav_location: "Localisation",
            hero_title: "L'Excellence en Mouvement",
            hero_subtitle: "Découvrez notre sélection exclusive de véhicules premium, sportifs et de luxe en Andorre. 30 ans d'expérience à votre service.",
            hero_btn_view: "Voir Véhicules",
            hero_btn_contact: "Nous Contacter",
            featured_title: "Véhicules en Vedette",
            filter_all: "Tous",
            filter_sport: "Sportifs",
            filter_suv: "SUV / 4x4",
            filter_sedan: "Berline",
            btn_consult: "Consulter",
            btn_view_all: "Voir tous les véhicules",
            about_title: "Qui Sommes-Nous",
            about_text_1: "Chez <strong>KARS Automòbils</strong>, nous nous consacrons depuis plus de 30 ans à la passion automobile. Nous sommes un concessionnaire multimarque indépendant spécialisé dans les véhicules premium, sportifs et de luxe.",
            about_text_2: "Notre philosophie repose sur la transparence, la confiance et une attention totalement personnalisée. Nous proposons une sélection de voitures systématiquement révisées et garanties, pour que vous n'ayez qu'à profiter de la conduite.",
            feature_warranty_title: "Garantie Premium",
            feature_warranty_desc: "12 mois de couverture étendue.",
            feature_direct_title: "Traitement Direct",
            feature_direct_desc: "Sans intermédiaires inutiles.",
            services_title: "Nos Services",
            service_sales_title: "Vente de Véhicules",
            service_sales_desc: "Large stock de véhicules neufs, semi-neufs et d'occasion des marques les plus prestigieuses.",
            service_import_title: "Importation à la Carte",
            service_import_desc: "Si vous cherchez un modèle spécifique, nous le trouvons et l'importons pour vous avec toutes les garanties.",
            service_workshop_title: "Atelier Spécialisé",
            service_workshop_desc: "Service après-vente, entretien et réparations avec des mécaniciens experts en haut de gamme.",
            service_warranty_title: "Garantie et Gestion",
            service_warranty_desc: "Nous nous occupons de toutes les démarches et offrons des garanties complémentaires pour votre tranquillité.",
            service_multilingual_title: "Attention Personnalisée",
            service_multilingual_desc: "Attention personnalisée en 6 langues (Catalan, Espagnol, Français, Anglais, Italien, Portugais)",
            service_tradein_title: "Véhicules en Reprise",
            service_tradein_desc: "Nous acceptons votre véhicule en échange, y compris dépôt-vente",
            service_instant_title: "Achat Instantané",
            service_instant_desc: "Processus d'achat rapide et efficace pour votre confort",
            service_exclusive_title: "Produits Exclusifs",
            service_exclusive_desc: "Accès à des véhicules exclusifs et éditions limitées",
            contact_title: "Contact et Localisation",
            contact_title_only: "Contact",
            location_title: "Localisation",
            contact_visit_title: "Visitez-nous",
            contact_call_title: "Appelez-nous",
            contact_write_title: "Écrivez-nous",
            form_name: "Nom",
            form_email: "Email",
            form_phone: "Téléphone",
            form_message: "Message ou véhicule d'intérêt",
            form_submit: "Envoyer Message",
            form_title: "Envoyez-nous un message",
            sales_title: "Dernières Ventes",
            sales_subtitle: "Véhicules récemment vendus à des clients satisfaits",
            footer_desc: "Votre concessionnaire de confiance en Andorre pour véhicules premium et sportifs.",
            footer_links: "Liens Rapides",
            footer_schedule: "Horaires",
            schedule_week: "Lundi - Jeudi: 09:00 - 13:30 / 15:00 - 19:00",
            schedule_sat: "Vendredi: 09:00 - 15:00",
            schedule_sun: "",
            footer_powered: "powered by"
        },
        en: {
            nav_home: "Home",
            nav_catalog: "Vehicles",
            nav_about: "About Us",
            nav_services: "Services",
            nav_sales: "Recent Sales",
            nav_contact: "Contact",
            nav_location: "Location",
            hero_title: "Excellence in Motion",
            hero_subtitle: "Discover our exclusive selection of premium, sports, and luxury vehicles in Andorra. 30 years of experience at your service.",
            hero_btn_view: "View Vehicles",
            hero_btn_contact: "Contact Us",
            featured_title: "Featured Vehicles",
            filter_all: "All",
            filter_sport: "Sports",
            filter_suv: "SUV / 4x4",
            filter_sedan: "Sedan",
            btn_consult: "Inquire",
            btn_view_all: "View all vehicles",
            about_title: "Who We Are",
            about_text_1: "At <strong>KARS Automòbils</strong>, we have been dedicated to the passion for motoring for over 30 years. We are an independent multi-brand dealership specializing in premium, sports, and luxury vehicles.",
            about_text_2: "Our philosophy is based on transparency, trust, and fully personalized attention. We offer a selection of systematically checked and guaranteed cars, so you only have to worry about enjoying the drive.",
            feature_warranty_title: "Premium Warranty",
            feature_warranty_desc: "12 months of comprehensive coverage.",
            feature_direct_title: "Direct Dealing",
            feature_direct_desc: "No unnecessary intermediaries.",
            services_title: "Our Services",
            service_sales_title: "Vehicle Sales",
            service_sales_desc: "Wide stock of new, semi-new, and pre-owned vehicles from the most prestigious brands.",
            service_import_title: "Custom Import",
            service_import_desc: "If you are looking for a specific model, we find and import it for you with all guarantees.",
            service_workshop_title: "Specialized Workshop",
            service_workshop_desc: "After-sales service, maintenance, and repairs with expert mechanics in high-end cars.",
            service_warranty_title: "Warranty & Management",
            service_warranty_desc: "We handle all paperwork and offer complementary warranties for your peace of mind.",
            service_multilingual_title: "Personalized Attention",
            service_multilingual_desc: "Personalized attention in 6 languages (Catalan, Spanish, French, English, Italian, Portuguese)",
            service_tradein_title: "Trade-In Vehicles",
            service_tradein_desc: "We accept your vehicle as part of payment, including consignment sale",
            service_instant_title: "Instant Purchase",
            service_instant_desc: "Fast and efficient purchase process for your convenience",
            service_exclusive_title: "Exclusive Products",
            service_exclusive_desc: "Access to exclusive vehicles and limited editions",
            contact_title: "Contact & Location",
            contact_title_only: "Contact",
            location_title: "Location",
            contact_visit_title: "Visit Us",
            contact_call_title: "Call Us",
            contact_write_title: "Write Us",
            form_name: "Name",
            form_email: "Email",
            form_phone: "Phone",
            form_message: "Message or vehicle of interest",
            form_submit: "Send Message",
            form_title: "Send us a message",
            sales_title: "Recent Sales",
            sales_subtitle: "Vehicles recently sold to satisfied customers",
            footer_desc: "Your trusted dealership in Andorra for premium and sports vehicles.",
            footer_links: "Quick Links",
            footer_schedule: "Opening Hours",
            schedule_week: "Monday - Thursday: 09:00 - 13:30 / 15:00 - 19:00",
            schedule_sat: "Friday: 09:00 - 15:00",
            schedule_sun: "",
            footer_powered: "powered by"
        }
    };

    function updateLanguage(lang) {
        // Update Text Content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // Check if it has HTML content (like bold tags)
                if (translations[lang][key].includes('<')) {
                    element.innerHTML = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });

        // Update Placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }

    // Language Selector Logic
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // Update Active State
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Get selected language
            const lang = btn.textContent.toLowerCase();

            // Apply translation
            updateLanguage(lang);
        });
    });

    // Initialize with Catalan as default language
    updateLanguage('ca');


    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


});
