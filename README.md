# Blue Orchid Restaurant — Premium Website Demo

A modern, high-converting, mobile-responsive restaurant website demonstration created by **NRK Digitals**. 

Built specifically to showcase to restaurant owners, cloud kitchens, and fine dining establishments how an elegant digital presence can drive table reservations, highlight signature dishes, and capture high-intent orders directly via WhatsApp.

---

## 🌟 Key Features & Highlights

- **Aesthetic Blue & White Palette**: Deep navy `#123B66`, secondary blue `#2878B5`, and clean white `#FFFFFF` tailored for luxury hospitality.
- **Sticky Responsive Navigation**: Smooth scrolling, active section highlight (ScrollSpy), and animated mobile hamburger drawer.
- **Interactive Menu with Category Filters**: Filter by *All Items, Starters, Main Course, Biryanis, Vegetarian, Desserts, and Beverages* with instant smooth transitions.
- **Direct "Order on WhatsApp" Flow**: Every dish features an FSSAI-style veg/non-veg indicator and a 1-click WhatsApp order button pre-filled with the exact dish name and price.
- **Online Table Reservation System**:
  - Full client-side validation (name, phone length, past-date prevention, guest counts, and meal slots).
  - Clear demo confirmation summary card explaining reservations require restaurant confirmation.
  - "Confirm via WhatsApp" button that formats and pre-fills all booking details into a ready-to-send WhatsApp message.
- **Interactive Photo Gallery with Lightbox**: Expandable high-resolution modal with previous/next controls, keyboard navigation (Esc, Arrow keys), and image counters.
- **Floating WhatsApp Button**: Persistent bottom-right floating chat button with animated pulse ring and desktop hover tooltip.
- **Zero Framework Overhead**: Built purely with semantic **HTML5**, **CSS3**, and **Vanilla JavaScript**. No React, Next.js, npm builds, or backend databases required.
- **SEO & Performance Ready**: Includes semantic meta tags, Open Graph preview data, image fallbacks, and mobile viewport optimization with zero horizontal overflow.

---

## 📁 File Structure

```text
restaurenty-demo/
├── index.html        # Complete semantic HTML structure & content
├── style.css         # Responsive styling, color variables, animations & layout
├── script.js         # Vanilla JS logic: WhatsApp links, filters, reservation form, lightbox
└── README.md         # Documentation, deployment instructions & customization guide
```

---

## 🚀 How to Preview Locally

Because this is a pure static website, you do not need to install Node.js, databases, or build tools.

### Option 1: Direct File Open
Simply double-click `index.html` in your file explorer, or right-click `index.html` and select **Open with Google Chrome** (or Edge, Safari, Firefox).

### Option 2: Live Server (VS Code / Cursor / Windsurf)
1. Open the project folder in your code editor.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Click **"Go Live"** in the bottom status bar or right-click `index.html` and choose **"Open with Live Server"**.
4. The website will open at `http://127.0.0.1:5500/`.

### Option 3: Python Simple Server
If you have Python installed, open your terminal inside this folder and run:

```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 🌐 How to Deploy for Free

### 1. Deploying to GitHub Pages
1. Create a new repository on [GitHub](https://github.com/) (e.g., `blue-orchid-restaurant-demo`).
2. Push your files (`index.html`, `style.css`, `script.js`, `README.md`) to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Premium restaurant demo by NRK Digitals"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. In your GitHub repository, navigate to **Settings** → **Pages**.
4. Under **Build and deployment > Source**, select `Deploy from a branch`.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. Within 1–2 minutes, your live demo link will be generated!

---

### 2. Deploying to Vercel (Zero Configuration)
1. Sign in to [Vercel](https://vercel.com/) with GitHub.
2. Click **Add New...** → **Project**.
3. Import your GitHub repository or drag and drop the folder using the [Vercel CLI](https://vercel.com/docs/cli).
4. In the Project Configuration settings:
   - **Framework Preset**: Select **Other**.
   - **Build Command**: Leave empty / disabled (no build required).
   - **Output Directory**: Leave empty or set to `.` (current directory).
5. Click **Deploy**.
6. Your live URL (e.g., `https://blue-orchid-restaurant.vercel.app`) will be deployed in seconds.

---

## ✏️ How to Customize for Future Clients

This codebase was structured to make branding and menu handovers effortless:

### 1. Update the Restaurant's WhatsApp Number
Open [`script.js`](file:///c:/Users/charan/Downloads/restaurenty%20demo/script.js) and update the `RESTAURANT_CONFIG` object at line 18:

```javascript
const RESTAURANT_CONFIG = {
  // Replace with client's 10-digit number including country code (no + or spaces)
  whatsappNumber: '919876543210', 
  restaurantName: 'Blue Orchid Restaurant',
  phoneFormatted: '+91 98765 43210',
  email: 'info@blueorchidrestaurant-demo.com',
  defaultWaMessage: 'Hello Blue Orchid Restaurant! I am visiting your website and would like to make an enquiry.'
};
```
All floating chat buttons, dish ordering buttons, catering enquiry links, and reservation confirmation workflows will automatically adopt this number and name!

---

### 2. Edit Dishes, Prices & Images
All menu items are located in [`index.html`](file:///c:/Users/charan/Downloads/restaurenty%20demo/index.html) inside `<div class="menu-items-grid" id="menuItemsGrid">`.

To modify a dish or add a new one, replicate this structure:

```html
<article class="menu-item-card" data-category="starters vegetarian">
  <div class="menu-card-img-wrap">
    <img src="YOUR_IMAGE_URL" alt="Dish Name" class="menu-card-img" loading="lazy">
    <!-- Vegetarian Indicator (use non-veg-tag for non-veg) -->
    <div class="diet-tag veg-tag" title="Vegetarian"><span class="diet-indicator"></span></div>
    <span class="category-badge">Starter</span>
  </div>
  <div class="menu-card-body">
    <div class="card-head">
      <h3 class="dish-name">Your Dish Name</h3>
      <span class="dish-price">₹290</span>
    </div>
    <p class="dish-desc">Delicious description of ingredients and spices.</p>
    <div class="menu-card-action">
      <button 
        class="btn btn-menu-order btn-order-wa" 
        data-dish="Your Dish Name" 
        data-price="290"
      >
        <i class="fa-brands fa-whatsapp"></i> Order on WhatsApp
      </button>
    </div>
  </div>
</article>
```

Supported `data-category` values for filtering:
- `starters`
- `main-course`
- `biryanis`
- `vegetarian`
- `desserts`
- `beverages`

---

### 3. Change Colors & Branding
Open [`style.css`](file:///c:/Users/charan/Downloads/restaurenty%20demo/style.css) and customize the CSS custom properties at the top:

```css
:root {
  --primary-navy: #123B66;     /* Primary brand color */
  --secondary-blue: #2878B5;   /* Buttons, highlights & active tabs */
  --accent-light-blue: #E8F2FA;/* Pill badges & soft icon boxes */
  --bg-white: #FFFFFF;
  --bg-light: #F2F7FC;         /* Alternate section background */
  --text-dark: #172B3A;
  --text-muted: #556B7D;
}
```

---

### 4. Updating Contact Details & Address
In [`index.html`](file:///c:/Users/charan/Downloads/restaurenty%20demo/index.html), search for `id="contact"` and `site-footer` to replace the address, phone number, email, and Google Maps location URL with the client's actual details.

---

## 🛡️ Demo Content Disclaimer

All addresses, phone numbers, and testimonials featured in this demonstration are fictional and created solely to showcase layout hierarchy and conversion capabilities for client acquisition.

---

## 💼 Credits & Agency Information

- **Client Concept**: Blue Orchid Restaurant
- **Designed & Developed by**: **NRK Digitals**
- **Website**: [https://nrkdigitals.com/](https://nrkdigitals.com/)
