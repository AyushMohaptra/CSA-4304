/**
 * TechSavvy - Electronics Online Shopping Platform
 * Data Store & LocalStorage Controller
 */

// Default Categories ranked by popularity
const DEFAULT_CATEGORIES = [
  {
    id: "smartphones",
    name: "Smartphones",
    popularity: 1,
    code: "PHONE",
    description: "Latest 5G flagship phones, premium camera phones and budget champions.",
    subcategories: ["Flagship 5G", "Budget Android", "iOS iPhones"]
  },
  {
    id: "laptops",
    name: "Laptops & Computers",
    popularity: 2,
    code: "LAPTOP",
    description: "High-performance gaming rigs, sleek ultrabooks and productivity laptops.",
    subcategories: ["Gaming Laptops", "Ultrabooks", "Business Notebooks"]
  },
  {
    id: "tablets",
    name: "Tablets & E-Readers",
    popularity: 3,
    code: "TABLET",
    description: "Versatile tablets for digital art, entertainment and portable productivity.",
    subcategories: ["iPad Series", "Android Tablets", "Drawing Stylus Tablets"]
  },
  {
    id: "accessories",
    name: "Gadget Accessories",
    popularity: 4,
    code: "ACCESSORY",
    description: "True wireless earbuds, smartwatches, power banks, chargers and cables.",
    subcategories: ["Wireless Audio", "Smartwatches", "Fast Chargers & Cables"]
  }
];

// Default Initial Product Catalog
const DEFAULT_PRODUCTS = [
  // Smartphones
  {
    id: "sp-1",
    name: "Galaxy S24 Ultra 5G",
    category: "Smartphones",
    subcategory: "Flagship 5G",
    price: 119999,
    originalPrice: 129999,
    stock: 14,
    rating: 4.8,
    reviewsCount: 38,
    badge: "Best Seller",
    icon: "",
    imageColor: "#1d293d",
    description: "Snapdragon 8 Gen 3 flagship with 200MP Quad Telephoto Camera, titanium frame, built-in S-Pen, and Galaxy AI capabilities.",
    specs: {
      "Display": "6.8\" Dynamic AMOLED 2X, 120Hz",
      "Processor": "Snapdragon 8 Gen 3 for Galaxy",
      "RAM & Storage": "12GB RAM, 256GB NVMe",
      "Camera": "200MP + 50MP + 12MP + 10MP",
      "Battery": "5000 mAh, 45W Fast Charging",
      "Warranty": "1 Year Manufacturer Warranty"
    },
    reviews: [
      { user: "Aarav Sharma", rating: 5, date: "2026-09-12", comment: "The AI zoom and screen sharpness are unbelievable. Battery lasts almost 2 full days." },
      { user: "Priya Menon", rating: 4.5, date: "2026-09-20", comment: "S-Pen is very useful for digital signatures and notes. Worth the price." }
    ]
  },
  {
    id: "sp-2",
    name: "iPhone 16 Pro Max",
    category: "Smartphones",
    subcategory: "iOS iPhones",
    price: 144900,
    originalPrice: 154900,
    stock: 9,
    rating: 4.9,
    reviewsCount: 52,
    badge: "Trending",
    icon: "",
    imageColor: "#2a2826",
    description: "Featuring an advanced A18 Pro Bionic chip, Camera Control button, Grade 5 Titanium finish, and 48MP Fusion Camera system.",
    specs: {
      "Display": "6.9\" Super Retina XDR OLED, ProMotion",
      "Processor": "Apple A18 Pro 3nm Chip",
      "RAM & Storage": "8GB RAM, 256GB Storage",
      "Camera": "48MP Main + 48MP Ultra-Wide + 12MP 5x Telephoto",
      "Battery": "Up to 33 hours video playback",
      "Warranty": "1 Year Apple India Warranty"
    },
    reviews: [
      { user: "Vikram R.", rating: 5, date: "2026-10-01", comment: "The new camera control key feels like a dedicated DSLR shutter button. Super fast." }
    ]
  },
  {
    id: "sp-3",
    name: "Redmi Note 13 Pro 5G",
    category: "Smartphones",
    subcategory: "Budget Android",
    price: 24999,
    originalPrice: 28999,
    stock: 25,
    rating: 4.5,
    reviewsCount: 110,
    badge: "15% OFF",
    icon: "",
    imageColor: "#223b54",
    description: "Exceptional value smartphone with 200MP OIS camera, 1.5K 120Hz curved display, and 67W Turbo Charge.",
    specs: {
      "Display": "6.67\" 1.5K AMOLED 120Hz Display",
      "Processor": "Snapdragon 7s Gen 2",
      "RAM & Storage": "8GB RAM, 128GB Storage",
      "Camera": "200MP OIS Triple Camera",
      "Battery": "5100 mAh, 67W Charger in box",
      "Warranty": "1 Year Brand Warranty"
    },
    reviews: [
      { user: "Rohan Patel", rating: 4, date: "2026-08-15", comment: "Best budget phone under 25k. Display and haptics are top notch." }
    ]
  },
  {
    id: "sp-4",
    name: "Nothing Phone (2a) Plus",
    category: "Smartphones",
    subcategory: "Budget Android",
    price: 27999,
    originalPrice: 29999,
    stock: 0,
    rating: 4.4,
    reviewsCount: 42,
    badge: "Out of Stock",
    icon: "",
    imageColor: "#1a1a1a",
    description: "Iconic transparent Glyph Interface design with Dimensity 7350 Pro 5G chipset and clean Nothing OS 2.6.",
    specs: {
      "Display": "6.7\" Flexible AMOLED, 120Hz",
      "Processor": "MediaTek Dimensity 7350 Pro",
      "RAM & Storage": "8GB RAM, 256GB Storage",
      "Camera": "50MP Main + 50MP Ultra Wide + 50MP Selfie",
      "Battery": "5000 mAh, 50W Fast Charging",
      "Warranty": "1 Year Brand Warranty"
    },
    reviews: [
      { user: "Sneha K.", rating: 4, date: "2026-07-28", comment: "Glyph lights are super cool for timers and notifications." }
    ]
  },

  // Laptops
  {
    id: "lp-1",
    name: "ASUS ROG Zephyrus G16",
    category: "Laptops",
    subcategory: "Gaming Laptops",
    price: 189990,
    originalPrice: 209990,
    stock: 6,
    rating: 4.8,
    reviewsCount: 24,
    badge: "Top Pick",
    icon: "",
    imageColor: "#1e1e2d",
    description: "Ultra-thin gaming laptop powered by Intel Core Ultra 9 and NVIDIA RTX 4070 GPU with 2.5K 240Hz OLED ROG Nebula display.",
    specs: {
      "Display": "16\" 2.5K OLED 240Hz, 0.2ms response",
      "Processor": "Intel Core Ultra 9 185H (16 Cores)",
      "Graphics": "NVIDIA GeForce RTX 4070 8GB GDDR6",
      "RAM & Storage": "32GB LPDDR5X, 1TB Gen4 SSD",
      "Battery": "90WHr Battery with 240W Adapter",
      "Warranty": "1 Year Onsite ROG Warranty"
    },
    reviews: [
      { user: "Devansh G.", rating: 5, date: "2026-09-02", comment: "Blown away by the OLED 240Hz display. Cyberpunk runs smooth at max settings." }
    ]
  },
  {
    id: "lp-2",
    name: "MacBook Air 15\" M3",
    category: "Laptops",
    subcategory: "Ultrabooks",
    price: 134900,
    originalPrice: 144900,
    stock: 12,
    rating: 4.9,
    reviewsCount: 65,
    badge: "Staff Pick",
    icon: "",
    imageColor: "#202a36",
    description: "Impossibly thin design with Apple M3 chip, Liquid Retina display, fanless silent operation, and up to 18 hours of battery life.",
    specs: {
      "Display": "15.3\" Liquid Retina with True Tone",
      "Processor": "Apple M3 Chip (8-core CPU, 10-core GPU)",
      "RAM & Storage": "16GB Unified Memory, 512GB SSD",
      "Audio": "Six-speaker sound system with Spatial Audio",
      "Battery": "Up to 18 hours wireless web",
      "Warranty": "1 Year Apple Warranty"
    },
    reviews: [
      { user: "Neha Kapoor", rating: 5, date: "2026-09-18", comment: "Best laptop for students and coding. Completely silent and lasts all day." }
    ]
  },
  {
    id: "lp-3",
    name: "Lenovo ThinkPad E14 Gen 5",
    category: "Laptops",
    subcategory: "Business Notebooks",
    price: 68990,
    originalPrice: 79990,
    stock: 18,
    rating: 4.6,
    reviewsCount: 31,
    badge: "14% OFF",
    icon: "",
    imageColor: "#232323",
    description: "Legendary ThinkPad durability with MIL-STD-810H certification, ergonomic keyboard with TrackPoint, and TPM 2.0 enterprise security.",
    specs: {
      "Display": "14\" WUXGA IPS Anti-glare",
      "Processor": "AMD Ryzen 7 7730U 8-Core",
      "RAM & Storage": "16GB DDR4, 512GB NVMe SSD",
      "Security": "Fingerprint Reader, ThinkShutter Privacy",
      "Battery": "57Wh with 65W Rapid Charge",
      "Warranty": "3 Years Premier Onsite Support"
    },
    reviews: [
      { user: "Suresh Babu", rating: 4.5, date: "2026-08-30", comment: "Keyboard is unmatched. Great for heavy typing and daily office work." }
    ]
  },

  // Tablets
  {
    id: "tb-1",
    name: "Apple iPad Air 11\" M2",
    category: "Tablets",
    subcategory: "iPad Series",
    price: 59900,
    originalPrice: 64900,
    stock: 15,
    rating: 4.8,
    reviewsCount: 47,
    badge: "Popular",
    icon: "",
    imageColor: "#222c38",
    description: "Supercharged by the M2 chip with landscape 12MP Front Camera with Center Stage, Apple Pencil Pro support, and Wi-Fi 6E.",
    specs: {
      "Display": "11\" Liquid Retina Display with P3 Wide Color",
      "Processor": "Apple M2 8-core CPU & 9-core GPU",
      "RAM & Storage": "8GB RAM, 128GB Storage",
      "Stylus Support": "Supports Apple Pencil Pro & Magic Keyboard",
      "Battery": "28.93-watt-hour rechargeable battery",
      "Warranty": "1 Year Apple Warranty"
    },
    reviews: [
      { user: "Ananya Roy", rating: 5, date: "2026-09-25", comment: "Digital note-taking and illustration feel so natural. Perfect companion." }
    ]
  },
  {
    id: "tb-2",
    name: "Samsung Galaxy Tab S9 FE",
    category: "Tablets",
    subcategory: "Android Tablets",
    price: 36999,
    originalPrice: 44999,
    stock: 10,
    rating: 4.6,
    reviewsCount: 29,
    badge: "Includes S-Pen",
    icon: "",
    imageColor: "#2c342f",
    description: "IP68 water and dust resistant tablet bundled with low-latency S-Pen, 90Hz smooth screen, and Samsung DeX desktop mode.",
    specs: {
      "Display": "10.9\" 90Hz WQXGA Display",
      "Processor": "Exynos 1380 Octa-core",
      "RAM & Storage": "6GB RAM, 128GB expandable up to 1TB",
      "Accessories": "In-box IP68 rated S-Pen stylus",
      "Battery": "8000 mAh, 45W Fast Charging",
      "Warranty": "1 Year Samsung Warranty"
    },
    reviews: [
      { user: "Karan Johar", rating: 4.5, date: "2026-08-11", comment: "Water resistance is a lifesaver. S-Pen comes right inside the box!" }
    ]
  },
  {
    id: "tb-3",
    name: "Wacom One 13 Touch Display",
    category: "Tablets",
    subcategory: "Drawing Stylus Tablets",
    price: 49990,
    originalPrice: 56990,
    stock: 5,
    rating: 4.7,
    reviewsCount: 16,
    badge: "Creative Pro",
    icon: "",
    imageColor: "#332a3d",
    description: "Dedicated graphic pen display with multi-touch gestures, 4096 pressure levels, anti-glare glass, and full Adobe Creative Cloud support.",
    specs: {
      "Display": "13.3\" Full HD (1920x1080) AG Glass",
      "Pressure Levels": "4096 levels, battery-free pen",
      "Color Gamut": "99% sRGB color coverage",
      "Connectivity": "USB-C single cable plug and play",
      "Compatibility": "Windows, macOS, ChromeOS & Android",
      "Warranty": "2 Years Official Wacom Warranty"
    },
    reviews: [
      { user: "Meera Sen", rating: 5, date: "2026-07-19", comment: "Essential tool for UI/UX designers and 2D animators. Zero parallax." }
    ]
  },

  // Accessories
  {
    id: "ac-1",
    name: "Sony WH-1000XM5 Noise Cancelling",
    category: "Accessories",
    subcategory: "Wireless Audio",
    price: 26990,
    originalPrice: 34990,
    stock: 22,
    rating: 4.9,
    reviewsCount: 88,
    badge: "23% OFF",
    icon: "",
    imageColor: "#1f2421",
    description: "Industry-leading active noise cancellation with 8 microphones, Auto NC Optimizer, LDAC High-Res audio, and 30-hour battery life.",
    specs: {
      "Driver": "30mm precision-engineered carbon driver",
      "Noise Cancellation": "Dual Processor V1 + HD QN1 Chip",
      "Battery Life": "30 hours with ANC ON (3 min charge = 3 hrs)",
      "Microphones": "4 beamforming mics for crystal clear calls",
      "Weight": "250g ultra-lightweight soft fit leather",
      "Warranty": "1 Year Sony Warranty"
    },
    reviews: [
      { user: "Rajesh K.", rating: 5, date: "2026-10-04", comment: "Cancels out flight and office noise completely. Sound profile is warm and deep." }
    ]
  },
  {
    id: "ac-2",
    name: "Apple Watch Series 10 GPS",
    category: "Accessories",
    subcategory: "Smartwatches",
    price: 46900,
    originalPrice: 49900,
    stock: 11,
    rating: 4.7,
    reviewsCount: 34,
    badge: "New Release",
    icon: "",
    imageColor: "#282a36",
    description: "Thinnest Apple Watch ever with larger wide-angle OLED display, sleep apnea detection, water depth gauge, and ECG certification.",
    specs: {
      "Case Size": "46mm Jet Black Aluminium Case",
      "Sensors": "ECG, Blood Oxygen, Temperature, Depth Sensor",
      "Display": "Wide-angle OLED, up to 2000 nits peak",
      "Battery": "18 hours regular, 80% charge in 30 minutes",
      "Water Resistance": "50m swimproof with WR50 rating",
      "Warranty": "1 Year Apple Warranty"
    },
    reviews: [
      { user: "Tanya M.", rating: 4.5, date: "2026-10-08", comment: "Display angle viewing is noticeable improvement. Very light on wrist." }
    ]
  },
  {
    id: "ac-3",
    name: "Anker 100W GaN Fast Charger & Cable",
    category: "Accessories",
    subcategory: "Fast Chargers & Cables",
    price: 4499,
    originalPrice: 5999,
    stock: 40,
    rating: 4.8,
    reviewsCount: 95,
    badge: "Best Value",
    icon: "",
    imageColor: "#1d232a",
    description: "Compact 3-port GaNPrime high-speed charger capable of charging a MacBook Pro, iPhone, and iPad simultaneously with PowerIQ 4.0.",
    specs: {
      "Total Wattage": "100W Max Dynamic Power Delivery",
      "Ports": "2x USB-C (100W PD), 1x USB-A (22.5W)",
      "Technology": "GaNPrime III with ActiveShield 2.0 temperature sensor",
      "Included Cable": "1.5m 140W Braided Nylon USB-C to USB-C cable",
      "Compatibility": "Laptops, Tablets, Smartphones, Consoles",
      "Warranty": "24 Months Replacement Warranty"
    },
    reviews: [
      { user: "Arjun N.", rating: 5, date: "2026-09-14", comment: "Replaced 3 bulky brick chargers in my travel bag. Highly recommended!" }
    ]
  }
];

// Seed Sample Customer Checkout Orders
const DEFAULT_ORDERS = [
  {
    orderId: "TS-89421",
    customer: {
      name: "Rohit Verma",
      email: "rohit.verma@example.com",
      phone: "+91 98765 43210",
      address: "Flat 402, Green Palms, MG Road, Bengaluru, Karnataka - 560001",
      paymentMethod: "Credit Card (Visa ending 4242)"
    },
    items: [
      { id: "sp-1", name: "Galaxy S24 Ultra 5G", price: 119999, quantity: 1 }
    ],
    totalAmount: 119999,
    status: "Delivered",
    date: "2026-10-10 11:45 AM"
  },
  {
    orderId: "TS-89422",
    customer: {
      name: "Deepika Singh",
      email: "deepika.s@example.com",
      phone: "+91 91234 56789",
      address: "B-12, Sector 62, Noida, Uttar Pradesh - 201301",
      paymentMethod: "UPI (Google Pay)"
    },
    items: [
      { id: "ac-1", name: "Sony WH-1000XM5 Noise Cancelling", price: 26990, quantity: 1 },
      { id: "ac-3", name: "Anker 100W GaN Fast Charger & Cable", price: 4499, quantity: 1 }
    ],
    totalAmount: 31489,
    status: "Shipped",
    date: "2026-10-13 03:20 PM"
  }
];

// Promotional Discounts & Exclusive Offers
const PROMO_OFFERS = [
  { code: "TECHSAVVY10", discountPercent: 10, title: "Electronics Fest", description: "Get instant 10% discount up to Rs. 5,000 on all orders above Rs. 20,000" },
  { code: "GADGET5", discountPercent: 5, title: "Student Gadget Pass", description: "Special 5% off on Laptops and Tablets with code GADGET5" },
  { code: "FREESHIP", discountPercent: 0, title: "Free Express Shipping", description: "Free doorstep courier on every prepaid electronic gadget order" }
];

/**
 * Storage Controller Utilities
 */
const Storage = {
  // Products
  getProducts() {
    const raw = localStorage.getItem("techsavvy_products");
    if (!raw) {
      localStorage.setItem("techsavvy_products", JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
    try {
      const parsed = JSON.parse(raw);
      // Clean any legacy emoji icons if stored in browser
      return parsed.map(p => {
        if (p.icon && /[\uD800-\uDBFF\uDC00-\uDFFF\u2600-\u27BF]/.test(p.icon)) {
          p.icon = "";
        }
        return p;
      });
    } catch (e) {
      return DEFAULT_PRODUCTS;
    }
  },
  saveProducts(products) {
    localStorage.setItem("techsavvy_products", JSON.stringify(products));
  },
  getProductById(id) {
    const products = this.getProducts();
    return products.find(p => p.id === id) || null;
  },

  // Cart
  getCart() {
    const raw = localStorage.getItem("techsavvy_cart");
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return parsed.map(item => {
        if (item.icon && /[\uD800-\uDBFF\uDC00-\uDFFF\u2600-\u27BF]/.test(item.icon)) {
          item.icon = "";
        }
        return item;
      });
    } catch (e) {
      return [];
    }
  },
  saveCart(cart) {
    localStorage.setItem("techsavvy_cart", JSON.stringify(cart));
  },

  // Wishlist
  getWishlist() {
    const raw = localStorage.getItem("techsavvy_wishlist");
    return raw ? JSON.parse(raw) : [];
  },
  saveWishlist(wishlist) {
    localStorage.setItem("techsavvy_wishlist", JSON.stringify(wishlist));
  },

  // Orders
  getOrders() {
    const raw = localStorage.getItem("techsavvy_orders");
    if (!raw) {
      localStorage.setItem("techsavvy_orders", JSON.stringify(DEFAULT_ORDERS));
      return DEFAULT_ORDERS;
    }
    return JSON.parse(raw);
  },
  saveOrders(orders) {
    localStorage.setItem("techsavvy_orders", JSON.stringify(orders));
  },

  // Current Logged-in User Session
  getCurrentUser() {
    const raw = localStorage.getItem("techsavvy_session");
    return raw ? JSON.parse(raw) : null;
  },
  setCurrentUser(user) {
    if (user) {
      localStorage.setItem("techsavvy_session", JSON.stringify(user));
    } else {
      localStorage.removeItem("techsavvy_session");
    }
  },

  // Registered Users list
  getRegisteredUsers() {
    const raw = localStorage.getItem("techsavvy_registered_users");
    const defaults = [
      { name: "John Customer", email: "customer@techsavvy.com", password: "password123", role: "customer", phone: "+91 98888 77777" },
      { name: "System Administrator", email: "admin@techsavvy.com", password: "admin123", role: "admin", phone: "+91 90000 11111" }
    ];
    if (!raw) {
      localStorage.setItem("techsavvy_registered_users", JSON.stringify(defaults));
      return defaults;
    }
    return JSON.parse(raw);
  },
  saveRegisteredUsers(users) {
    localStorage.setItem("techsavvy_registered_users", JSON.stringify(users));
  },

  // Format Indian Currency
  formatCurrency(num) {
    return "Rs. " + Number(num).toLocaleString("en-IN");
  },

  // Reset to default sample catalog
  resetAllData() {
    localStorage.removeItem("techsavvy_products");
    localStorage.removeItem("techsavvy_cart");
    localStorage.removeItem("techsavvy_wishlist");
    localStorage.removeItem("techsavvy_orders");
    localStorage.removeItem("techsavvy_session");
    localStorage.removeItem("techsavvy_registered_users");
    sessionStorage.removeItem("techsavvy_promo");
    location.reload();
  }
};

// Initialize if empty on first load
(function initLocalStorage() {
  if (!localStorage.getItem("techsavvy_products")) {
    localStorage.setItem("techsavvy_products", JSON.stringify(DEFAULT_PRODUCTS));
  }
  if (!localStorage.getItem("techsavvy_orders")) {
    localStorage.setItem("techsavvy_orders", JSON.stringify(DEFAULT_ORDERS));
  }
  if (!localStorage.getItem("techsavvy_registered_users")) {
    Storage.getRegisteredUsers();
  }
  if (!localStorage.getItem("techsavvy_session")) {
    Storage.setCurrentUser({
      name: "Demo Customer",
      email: "demo@techsavvy.com",
      role: "customer",
      phone: "+91 98765 00000"
    });
  }
})();
