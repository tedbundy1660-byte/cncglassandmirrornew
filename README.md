# C&C Glass & Window Repair — Modern Website Project

A complete, high-performance, responsive clone and modern redesign of [cncglassandmirror.net](https://cncglassandmirror.net/). Built with clean semantic HTML5, modern Tailwind CSS, custom glassmorphism styling, and native JavaScript. Includes all 130 authentic media assets, service pages, mobile navigation, and interactive quote forms.

---

## 🌟 Key Features

- **Pixel-Perfect & Modernized**: Rebuilt from scratch with responsive typography (`Raleway` & `Plus Jakarta Sans`), crisp glassmorphism cards, and an accessible high-contrast palette.
- **130 Authentic Local Assets**: Scraped and archived all high-resolution images, original logos, and product graphics into `assets/images/` for zero broken links and instant offline viewing.
- **Complete Architecture & Pages**:
  - `index.html`: Full homepage with announcement bar, hero section, 10+ core service cards, Diamon-Fusion® technology spotlight, filterable portfolio showcase, client testimonials, and consultation form.
  - `shower-doors.html`: Dedicated deep-dive into Seamless Frameless Doors, Sliding Systems, Steam Enclosures, and hardware finish options (Chrome, Brushed Nickel, Matte Black, Satin Brass, Bronze).
  - `residential-glass.html`: Custom vanity mirrors, full wall & gym mirrors, moisture-proof shower windows, glass table tops, and architectural glass railings.
  - `commercial.html`: Commercial storefront glass, entrance doors, security glazing, and 24/7 emergency board-up services.
  - `repairs.html`: Foggy double-pane insulated window repair (IGU replacement), custom window screen rescreening/fabrication, and spiral/block window balance restoration.
  - `about.html`: Company mission, craftsmanship standards, SGCC/ANSI safety compliance, and regional coverage.
  - `contact.html`: Contact info, direct telephone links, emergency hotline callouts, and multi-field quote request form.
- **Interactive UI**:
  - Responsive mobile drawer menu with touch-friendly accordion submenus.
  - Interactive Quote & Consultation modal pre-fillable from any service card.
  - Lightbox full-screen viewer for portfolio imagery.
  - Filterable gallery tabs (All, Shower Doors, Mirrors, Commercial, Windows).
  - Instant client-side form validation with visual success toast notifications.
  - Click-to-call & click-to-email shortcuts optimized for mobile users.

---

## 📁 Project Structure

```
cnc-glass-and-mirror/
├── index.html                 # Complete Homepage
├── shower-doors.html          # Custom Shower Doors & Enclosures
├── residential-glass.html     # Custom Mirrors, Table Tops & Railings
├── commercial.html            # Storefront Glass & 24/7 Board-Up
├── repairs.html               # Glass Repair, Window Screens & Balances
├── about.html                 # About Us & Mission
├── contact.html               # Contact Details & Inquiry Form
├── README.md                  # Project documentation
└── assets/
    ├── css/
    │   └── style.css          # Glassmorphism, animations, custom scrollbar
    ├── js/
    │   └── main.js            # Mobile drawer, quote modal, lightbox, forms
    └── images/                # 130 authentic project images and logos
```

---

## 🚀 How to Run Locally

Because the project uses standard web technologies with no heavy build-step dependencies, you can run it immediately in multiple ways:

### Option 1: Direct File Launch
Double-click `index.html` in your file explorer to open it in any web browser.

### Option 2: Python Local Server (Recommended)
Open a terminal in this directory and run:
```bash
python -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000) in your browser.

### Option 3: Node.js / npx serve
```bash
npx serve .
```

---

## 🌐 Deployment
This project is static-ready and can be deployed with zero configuration to:
- **Netlify**: Drag and drop the `cnc-glass-and-mirror` folder directly into the Netlify dashboard.
- **Vercel**: Run `vercel` from the project directory.
- **GitHub Pages**: Push this directory to a repository and enable GitHub Pages in settings.
- **Traditional Apache / Nginx / cPanel**: Upload all files to the `public_html` directory.
