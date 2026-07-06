# 🏴‍☠️ Strawhat Spotlight - One Piece Crew Showcase

A premium, interactive single-page web showcase dedicated to the **Straw Hat Pirates** from the legendary anime and manga series *One Piece*. 

Built with modern web standards and responsive styling, the project features a sleek dark aesthetic, dynamic canvas particle effects, custom navigation scroll mapping, and an immersive **dual-layer mouse-tracked spotlight reveal** that uncovers secondary background graphics behind each crew member.

---

## 🌟 Interactive Demos & Key Features

- **Consolidated Single-File Architecture:** The entire website—HTML markup, custom CSS filters, keyframe animations, and interactive JavaScript engine—is unified in a single, high-performance [index.html](file:///c:/Users/Sarvesh%20Mariappan/Documents/One-Piece-Page/index.html) file.
- **Sleek Sidebar Navigation:** An interactive navigation sidebar on the left displays all 11 pages (Overview + 10 crew members, including Jinbe) distributed evenly along the vertical height of the screen. Supports active scroll spying and hash routing.
- **Immersive Spotlight Masking:** Hovering your mouse over any character section reveals a circular spotlight area that dynamically unmasks a hidden background scene underneath the foreground illustration.
- **Floating Particle System:** A high-performance `<canvas>` particle engine generates floating ash/dust particles colored dynamically to match the active character's theme.
- **Card Hover Image Reveal:** The glassmorphism content cards automatically fade out to `3%` opacity on hover (`hover:opacity-[0.03]`), instantly revealing the detailed background scenes behind them.
- **Responsive Layout:** Adaptive styling built via **Tailwind CSS v4** fits screens of all sizes, with a collapsible slide-out drawer navigation for mobile screens.

---

## 🛠️ Technology Stack

- **Core & Logic:** HTML5 + Vanilla JavaScript (ES6)
- **Styling & Layout:** Tailwind CSS v4 CDN
- **Typography:** Google Fonts (Cinzel for headings, Outfit for body text)
- **Visuals:** CSS Mask-Image, Mix-Blend-Mode, custom SVG graphics, and CSS WebKit Filters

---

## 📂 Project Structure

```bash
One-Piece-Page/
├── index.html          # Unified layout, styling system, and script engine
├── README.md           # Project documentation and specifications
└── assets/             # Optimized image assets
    ├── logo.png        # Custom transparent Sanji-themed logo
    ├── overview-bg.jpg # Pirate Island (Hachinosu) background
    ├── luffy-fg.jpg    # Luffy foreground (Wano)
    ├── luffy-bg.jpg    # Luffy background (Wano flames)
    ├── zoro-fg.jpg     # Zoro foreground (tied to post)
    ├── zoro-bg.jpg     # Zoro background (Wano attack stance)
    ├── nami-fg.jpg     # Nami foreground (back turned, map desk)
    ├── nami-bg.jpg     # Nami background (smiling close-up)
    ├── usopp-fg.jpg    # Usopp foreground (Sogeking)
    ├── usopp-bg.jpg    # Usopp background (cheering gladiators)
    ├── sanji-fg.jpg    # Sanji foreground (bowing at Baratie)
    ├── sanji-bg.jpg    # Sanji background (standing bruised face)
    ├── chopper-fg.jpg  # Chopper foreground (beaten close-up)
    ├── chopper-bg.jpg  # Chopper background (Monster Point)
    ├── robin-fg.jpg    # Robin foreground (crying face close-up)
    ├── robin-bg.jpg    # Robin background (giant limbs combat)
    ├── franky-fg.jpg   # Franky foreground (posing crew)
    ├── franky-bg.jpg   # Franky background (Franky close-up)
    ├── brook-fg.jpg    # Brook foreground (ice shards stance)
    ├── brook-bg.jpg    # Brook background (Soul King guitar performance)
    ├── jinbe-fg.jpg    # Jinbe foreground (purple cloak combat)
    └── jinbe-bg.jpg    # Jinbe background (laughing close-up face)
```

---

## 🎨 Creative Image Processing & Cleanups

All source screenshots have been processed to remove ugly text watermarks using localized horizontal and vertical pixel patches:
- **Zoro & Overview:** Patched horizontally using adjacent sky segments (`X: [130, 250], Y: [0, 30]`) to maintain perfect color gradients.
- **Chopper:** Cleaned using a vertical patch (`X: [9, 89], Y: [25, 46]` pasted at `(9, 4)`) to align the vertical folds and shading of Chopper's pink hat seamlessly.
- **Sanji:** Watermark removed from the dark blue flag using a vertical patch directly below the flag outline.
- **Robin & Usopp:** Coliseum beams and hat fur were restored seamlessly by shifting adjacent textures vertically and horizontally.

---

## 🚀 Running the Project Locally

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/sarveshmariappan/Strawhat-Spotlight.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Strawhat-Spotlight
   ```
3. Start a local development server. For example, using Python's built-in HTTP server:
   ```bash
   python -m http.server 8080
   ```
   Or using Node.js `http-server`:
   ```bash
   npx http-server -p 8080
   ```
4. Open your browser and navigate to **`http://localhost:8080`**.
