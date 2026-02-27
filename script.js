function showPage(pageId) {
    console.log("Navigating to: " + pageId);

    const pages = document.querySelectorAll('.page');
    
    pages.forEach(page => {
        // Remove active class to stop any ongoing animations
        page.classList.remove('active');
        page.style.display = 'none';
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        // Small timeout ensures the "display: block" and "animation" 
        // trigger together for a fresh start
        targetPage.style.display = 'block';
        
        // Using requestAnimationFrame for maximum smoothness
        requestAnimationFrame(() => {
            targetPage.classList.add('active');
        });
    }
    // Inside your showPage function, add:
document.querySelectorAll('.nav-links span').forEach(link => {
    link.classList.remove('current');
    if(link.getAttribute('onclick').includes(pageId)) {
        link.classList.add('current');
    }
});
}

// 2. Cycle Logic
function calculateCycle() {
    const input = document.getElementById('period-start').value;
    if (!input) return;

    const startDate = new Date(input);
    const nextDate = new Date(startDate);
    nextDate.setDate(startDate.getDate() + 28);

    document.getElementById('next-date').innerText = nextDate.toDateString();
    
    const today = new Date();
    const diff = Math.ceil((nextDate - today) / (1000 * 60 * 60 * 24));
    document.getElementById('days-countdown').innerText = `That's ${diff} days from now! 💗`;

    renderCalendar(startDate.getDate());
}

function renderCalendar(highlightDay) {
    const grid = document.getElementById('calendar');
    grid.innerHTML = '';
    for (let i = 1; i <= 28; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.innerText = i;
        if (i >= highlightDay && i < highlightDay + 5) dayDiv.classList.add('period');
        grid.appendChild(dayDiv);
    }
}
const moodStyles = {
    Happy: { 
        name: "Happy Vibes", 
        colors: ["#FFD700", "#FF85A1", "#4ECDC4"], 
        desc: "Bright sunshine energy! ✨ Pair a yellow top with white jeans and coral accessories for a happy, radiant glow.",
        essentials: ["Flowy Skirts", "Sundresses", "Gold Hoops"]
    },
    Sad: { 
        name: "Gentle Comfort", 
        colors: ["#A2D2FF", "#BDE0FE", "#FFFFFF"], 
        desc: "It is okay to slow down. 💙 Embrace soft, comforting layers like oversized cashmere and silk pajamas to feel held and cozy.",
        essentials: ["Chunky Knitwear", "Silk Joggers", "Soft Pashmina"]
    },
    Confident: { 
        name: "Power Mode", 
        colors: ["#DC143C", "#000000", "#FFD700"], 
        desc: "Bold strength! 💪 Sharp blazers, red lipstick, and structured trousers to help you conquer the boardroom or the streets.",
        essentials: ["Tailored Blazer", "Bold Red Lip", "Power Heels"]
    },
    Calm: { 
        name: "Zen Peace", 
        colors: ["#E0F2F1", "#B2DFDB", "#80CBC4"], 
        desc: "Peaceful inner balance. 🧘 Think loose linens, sea-foam greens, and soft knits that feel like a warm hug.",
        essentials: ["Linen Pants", "Oversized Scarf", "Minimalist Slides"]
    },
    Romantic: { 
        name: "Love Glow", 
        colors: ["#F48FB1", "#F06292", "#AD1457"], 
        desc: "Soft and dreamy. 💕 Delicate lace, rose-gold accents, and floral textures create a timeless, feminine silhouette.",
        essentials: ["Lace Blouse", "Pearl Earring", "Midi Floral Dress"]
    },
    Energetic: { 
        name: "Active Pulse", 
        colors: ["#FF9100", "#FF3D00", "#3D5AFE"], 
        desc: "High-octane energy! ⚡ Electric neons paired with sleek activewear to keep you moving with speed and style.",
        essentials: ["Neon Windbreaker", "Sleek Leggings", "Statement Sneakers"]
    }
};
function selectMood(mood) {
    const data = moodStyles[mood];
    document.getElementById('style-mood-name').innerText = data.name;
    document.getElementById('style-description').innerText = data.desc;
    
    // Update Colors
    const colors = document.getElementById('style-colors');
    colors.innerHTML = data.colors.map(c => `<div class="bubble" style="background:${c}"></div>`).join('');
    
    // Update Essentials
    const essentials = document.getElementById('essentials-list');
    essentials.innerHTML = data.essentials.map(e => `<li>${e}</li>`).join('');
}
// 4. Grid Generation
function generateGrid(containerId, count, isSkin) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    
    const skinItems = ["Acne Relief", "Glowing Skin", "Oily Control", "Dry Patch", "Dark Circles", "Skin Bright"];
    const learnItems = ["Sanitary Pad", "Tampon", "Menstrual Cup", "Panty Liner", "Period Panty", "Heating Pad"];

    for (let i = 1; i <= count; i++) {
        const title = isSkin ? skinItems[i % skinItems.length] : learnItems[i % learnItems.length];
        const card = document.createElement('div');
        card.className = 'flip-card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-face front">
                    <img src="https://i.pinimg.com/originals/28/15/b1/2815b17710ba6e7e911b0154083213d3.gif" alt="icon">
                    <h4>${title}</h4>
                    <p style="font-size:0.7rem; color:#888;">Tap to flip</p>
                </div>
                <div class="card-face back">
                    <p>${isSkin ? "Remedy: Aloe Vera & Ice works best." : "Detail: High quality material for all-day comfort."}</p>
                </div>
            </div>`;
        card.onclick = function() { this.classList.toggle('flipped'); };
        grid.appendChild(card);
    }
}

// Start Up
window.onload = () => {
    showPage('home');
    renderCalendar(10);
    generateGrid('skin-grid', 12, true);
    generateGrid('learn-grid', 50, false);
};
// Data for Skin Page
const skinData = [
    { name: "Active Acne", img: "Productos recomendados deproductosantiacné.jpg", detail: "Apply a spot treatment with Salicylic Acid or a touch of tea tree oil. Avoid popping to prevent scarring! ✨" },
    { name: "Dullness", img: "Dull Skin_ This Serum Brings It Back to Life!.jpg", detail: "Exfoliate gently with BHAs and use a Vitamin C serum in the morning for that instant lit-from-within glow." },
    { name: "Dark Circles", img: "How to Get Rid of Dark Circles, Wrinkles & Bags Under Eyes.jpg", detail: "Use a caffeine-infused eye cream and try sleeping on your back with an extra pillow to drain fluids." },
    { name: "Dehydration", img: "download.jpg", detail: "Layer hyaluronic acid on damp skin and seal it with a lightweight gel moisturizer. Drink plenty of water! 💧" },
    { name: "Oily T-Zone", img: "Prevent enlarged pores_.jpg", detail: "Use Niacinamide to regulate oil production and carry blotting papers for a quick midday refresh." },
    { name: "Large Pores", img: "How to Get Rid of Large Pores on Your Face_ 9 Tips and Products.jpg", detail: "Keep pores clear with double cleansing (oil then water) and use a clay mask once a week to tighten them up." },
    { name: "Sunburn", img: "Why You Should Never, Ever Cover Up A Sunburn With Foundation.jpg", detail: "Cool down with pure Aloe Vera gel and keep the area hydrated. Avoid active acids until the redness fades." },
    { name: "Blackheads", img: "d8ab84f94aded02841ef753edfb36c42.jpg", detail: "Use an oil cleanser to dissolve sebum and look for products containing 2% BHA (Salicylic Acid)." },
    { name: "Redness", img: "cfc3bb8f85c102ea7654c590f0ef311f.jpg", detail: "Calm the storm with Centella Asiatica (Cica) or Mugwort extracts. Avoid hot water on your face! 🧊" },
    { name: "Uneven Tone", img: "ueven.jpg", detail: "Alpha Arbutin or Rice water extracts work wonders for fading dark spots and brightening the complexion." },
    { name: "Puffy Eyes", img: "puffy.jpg", detail: "Keep your eye cream in the fridge! The cold helps constrict blood vessels and reduces morning swelling." },
    { name: "Dry Patches", img: "drypatches.jpg", detail: "Slug those dry areas with a thin layer of petroleum jelly or a heavy ceramide balm at night. 🌙" },
    { name: "Texture", img: "oily.jpg", detail: "Introduce a gentle Retinoid or Lactic Acid to speed up cell turnover and smooth out tiny bumps." },
    { name: "Sensitivity", img: "sens.jpg", detail: "Stick to a 'skin-imalist' routine. Fragrance-free products with Ceramides will help repair your barrier." },
    { name: "Whiteheads", img: "white.jpg", detail: "Use hydrocolloid patches (pimple patches) overnight to suck out impurities without irritating the skin." },
    { name: "Fine Lines", img: "fine.jpg", detail: "Prevention is key! Use SPF 50 every single day and keep your skin plump with peptides." },
    { name: "Fungal Acne", img: "fungal.jpg", detail: "Avoid heavy oils and esters. Use a Ketoconazole-based wash as a 5-minute mask twice a week." },
    { name: "Post-Acne Marks", img: "post.jpg", detail: "Look for Tranexamic Acid or Azelaic Acid to fade those stubborn red or brown spots left behind." },
    { name: "Tired Skin", img: "tired.jpg", detail: "Give yourself a 5-minute facial massage or use a Gua Sha to boost circulation and lymphatic drainage." },
    { name: "Pollution Damage", img: "pollu.jpg", detail: "Use an antioxidant serum (like Ferulic Acid) to create a shield against city grime and free radicals. 🛡️" }
];

// Data for Learn Page
const learnData = [
    // --- Period Care Basics ---
    { name: "Regular Pad", img: "regpad.jpg", detail: "Standard absorbent liner for medium flow days. Features 'wings' to keep it secure. 🌸" },
    { name: "Overnight Pad", img: "overnight.jpg", detail: "Extra long and wide at the back to prevent leaks while sleeping." },
    { name: "Light Tampon", img: "light.jpg", detail: "Smallest size for light flow days. Ideal for those new to using internal protection." },
    { name: "Super Tampon", img: "super.jpg", detail: "Designed for heavy flow days. Offers higher absorbency for maximum security." },
    { name: "Menstrual Cup", img: "Menstrual.jpg", detail: "Reusable silicone cup. Eco-friendly, budget-friendly, and lasts for years! 🌿" },
    { name: "Menstrual Disc", img: "disc.jpg", detail: "Sits at the base of the cervix. Can be worn during intimacy and holds more than cups." },
    { name: "Panty Liners", img: "panty.jpg", detail: "Very thin liners for daily freshness, spotting, or as a backup for cups/tampons." },
    { name: "Organic Pads", img: "organic.jpg", detail: "Made from 100% organic cotton. Free from plastics, bleaches, and fragrances." },
    { name: "Bamboo Pads", img: "bamboo.jpg", detail: "Highly sustainable and naturally antibacterial. Softer on sensitive skin." },
    { name: "Reusable Cloth Pads", img: "cloth.jpg", detail: "Washable fabric pads. A great zero-waste alternative to disposables." },

    // --- Hygiene & Comfort ---
    { name: "Intimate Wash", img: "intimate.jpg", detail: "pH-balanced cleanser for the external area. Avoid using inside the vagina! ✨" },
    { name: "Biodegradable Wipes", img: "wipes.jpg", detail: "Flush-friendly wipes for quick freshening up during your cycle." },
    { name: "Heating Pad", img: "heating.jpg", detail: "Soothes menstrual cramps by relaxing the muscles of the uterus. ☕" },
    { name: "Cramp Relief Patch", img: "cramp.jpg", detail: "Discreet, wearable heat patches that stay warm for up to 8 hours." },
    { name: "Period Underwear", img: "underwear.jpg", detail: "Special absorbent fabric built into the gusset. Replaces pads entirely!" },
    { name: "Tampon Case", img: "tamponcase.jpg", detail: "A discreet, hard-shell container to keep tampons clean in your bag." },
    { name: "Disposal Bags", img: "bags.jpg", detail: "Opaque, scented bags for hygienic and discreet disposal of products." },
    { name: "Cup Sterilizer", img: "sterilizer.jpg", detail: "A small steam device or container to sanitize your menstrual cup quickly." },
    { name: "Interlabial Pads", img: "interlabial.jpg", detail: "Leaf-shaped fabric worn between the labia to direct flow into a pad." },
    { name: "Postpartum Pads", img: "postpartum.jpg", detail: "Extra large, soft pads designed for heavy bleeding after childbirth." },

    // --- Health & Wellness ---
    { name: "Basal Thermometer", img: "thermometer.jpg", detail: "Highly sensitive thermometer used to track ovulation via body temperature." },
    { name: "Ovulation Test", img: "ovulation.jpg", detail: "Detects the LH surge in urine to identify your most fertile days." },
    { name: "Pregnancy Test", img: "pregnancy.jpg", detail: "Measures HCG levels. Best used the day after a missed period." },
    { name: "pH Test Strips", img: "ph.jpg", detail: "Helps monitor your intimate pH to detect early signs of infections." },
    { name: "Iron Supplements", img: "iron.jpg", detail: "Often recommended for those with heavy flow to prevent anemia/fatigue." },
    { name: "Magnesium Balm", img: "magnesium.jpg", detail: "Rubbed on the skin to help reduce muscle tension and period cramps." },
    { name: "Evening Primrose Oil", img: "primrose.jpg", detail: "A natural supplement often used to reduce breast tenderness and PMS." },
    { name: "Raspberry Leaf Tea", img: "raspberry.jpg", detail: "Known as 'The Women's Herb,' it helps tone the uterus and soothe pain." },
    { name: "Essential Oil Roller", img: "essential-oil.jpg", detail: "Blends of Lavender and Clary Sage for hormonal balance and calm. 🧘" },
    { name: "Vitamin B6", img: "vitamin-b6.jpg", detail: "Helps regulate hormonal activity and can reduce PMS-related mood swings." },

    // --- Tech & Apparel ---
    { name: "Smart Cycle Tracker", img: "smart-cycle.jpg", detail: "Wearable tech that monitors your cycle automatically via skin data." },
    { name: "TENS Machine", img: "tens.jpg", detail: "Small device that sends tiny electrical pulses to block pain signals. ⚡" },
    { name: "Period Swimwear", img: "period-swimwear.jpg", detail: "Bikini bottoms with a hidden absorbent layer. No tampon needed!" },
    { name: "Absorbent Sleep Shorts", img: "sleep-shorts.jpg", detail: "Loose shorts with built-in protection for comfortable, leak-free nights." },
    { name: "Pelvic Floor Trainer", img: "pelvic-floor.jpg", detail: "Smart Kegel devices to strengthen muscles for better bladder control." },
    { name: "Breast Shells", img: "breast-shells.jpg", detail: "Protects sore nipples and collects leaking milk for nursing mothers." },
    { name: "Nipple Shields", img: "nipple-shields.jpg", detail: "Thin silicone covers to assist with breastfeeding challenges." },
    { name: "Compression Socks", img: "compression-socks.jpg", detail: "Helps reduce leg swelling often caused by hormonal water retention." },
    { name: "Silk Eye Mask", img: "silk-eye-mask.jpg", detail: "Promotes deep sleep, which is vital for hormonal regulation." },
    { name: "Belly Band", img: "belly-band.jpg", detail: "Provides support for the back and abdomen during and after pregnancy." },

    // --- Specialized Care ---
    { name: "Incontinence Liners", img: "incontinence-liners.jpg", detail: "Designed specifically for light bladder leaks, which differs from period flow." },
    { name: "Nipple Balm", img: "nipple-balm.jpg", detail: "Organic balms to soothe dry or cracked skin for nursing moms." },
    { name: "Maternity Pads", img: "maternity-pads.jpg", detail: "Super soft and chemical-free for the sensitive weeks after delivery." },
    { name: "Water-Based Lube", img: "water-based-lube.jpg", detail: "Hormone-safe hydration for intimate comfort and dryness relief." },
    { name: "Antifungal Cream", img: "antifungal-cream.jpg", detail: "Over-the-counter treatment for common yeast imbalances." },
    { name: "Boroc Acid Suppositories", img: "boroc-acid-suppositories.jpg", detail: "Used under medical advice to balance odor and vaginal flora." },
    { name: "Reusable Applicator", img: "reusable-applicator.jpg", detail: "A medical-grade plastic applicator used with non-app tampons to reduce waste." },
    { name: "Menstrual Sponge", img: "menstrual-sponge.jpg", detail: "A natural sea sponge used as an internal, plastic-free period product." },
    { name: "Hormone Balancing Tea", img: "hormone-balancing-tea.jpg", detail: "Blends like Spearmint or Dandelion root to support liver detoxification." },
    { name: "First Period Kit", img: "first-period-kit.jpg", detail: "A curated bag with a variety of products for someone's very first cycle. 💝" }
];

function generateProGrid(containerId, dataList, count) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    grid.innerHTML = '';

    // If count is higher than data, it will loop through the data
    for (let i = 0; i < count; i++) {
        const item = dataList[i % dataList.length];
        const card = document.createElement('div');
        card.className = 'flip-card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-face card-front">
                    <img src="${item.img}" alt="${item.name}">
                    <h4>${item.name}</h4>
                </div>
                <div class="card-face card-back">
                    <p>${item.detail}</p>
                </div>
            </div>
        `;
        card.onclick = function() {
            this.classList.toggle('flipped');
        };
        grid.appendChild(card);
    }
}

// Update your window.onload to use these new functions
window.onload = () => {
    showPage('home');
    renderCalendar(23);
    selectMood('Happy');
    
    // Generate 12 skin cards and 50 learn cards
    generateProGrid('skin-grid', skinData, 20);
    generateProGrid('learn-grid', learnData, 50);
};
/**
 * Filters the grid based on search input
 * @param {string} gridId - The ID of the container (skin-grid or learn-grid)
 * @param {string} inputId - The ID of the search box
 * @param {Array} dataList - The full array of data (skinData or learnData)
 */
function filterGrid(gridId, inputId, dataList) {
    const searchTerm = document.getElementById(inputId).value.toLowerCase();
    
    // Filter the original data list based on the name or details
    const filteredData = dataList.filter(item => 
        item.name.toLowerCase().includes(searchTerm) || 
        item.detail.toLowerCase().includes(searchTerm)
    );

    // Re-run the grid generator with only the filtered items
    // If you want the search to always show at least a few items, use filteredData.length
    // or set a static number like 12.
    const displayCount = searchTerm === "" ? (gridId === 'learn-grid' ? 50 : 12) : filteredData.length;
    
    renderFilteredGrid(gridId, filteredData, displayCount);
}

// Helper to render only the searched items
function renderFilteredGrid(containerId, dataList, count) {
    const grid = document.getElementById(containerId);
    if (!grid || dataList.length === 0) {
        grid.innerHTML = '<p style="text-align:center; width:100%; color:#888;">No matches found... Try another keyword! ✨</p>';
        return;
    }
    
    grid.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const item = dataList[i % dataList.length];
        const card = document.createElement('div');
        card.className = 'flip-card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-face card-front">
                    <img src="${item.img || 'https://api.dicebear.com/7.x/icons/svg?seed=' + item.name}" alt="${item.name}">
                    <h4>${item.name}</h4>
                </div>
                <div class="card-face card-back">
                    <p>${item.detail}</p>
                </div>
            </div>
        `;
        card.onclick = function() { this.classList.toggle('flipped'); };
        grid.appendChild(card);
    }
}
function changeTheme(themeName) {
    // 1. Remove all existing theme classes
    document.body.classList.remove('theme-energetic', 'theme-relaxed', 'theme-power', 'theme-period');
    
    // 2. Add the new one (unless it's default)
    if (themeName !== 'default') {
        document.body.classList.add('theme-' + themeName);
    }
    
    // 3. Optional: Save her preference in the browser
    localStorage.setItem('userMoodTheme', themeName);
    
    console.log("App theme shifted to: " + themeName);
}

// 4. Load saved theme on startup
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('userMoodTheme');
    if (savedTheme) changeTheme(savedTheme);
});
