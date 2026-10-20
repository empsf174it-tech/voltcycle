# Voltcycle — Electric Bike Buying Guide

> **Site #4: Compact Multi-Page Edition (4 Pages Total)**
> Plain HTML / CSS / Vanilla JS Review & Guide Portal.
> Built with bold-urban charcoal aesthetics, electric lime accents, and sporty typography.

---

## ⚡ Overview & Baseline Scope

Voltcycle is a comprehensive, production-ready electric bicycle review and buyer advisory platform designed to deliver transparent, laboratory-tested guidance. All marketing hype is replaced with standardized dyno bench metrics, real-world cold weather modifiers, and honest payload telemetry.

### Exactly 4 HTML Pages
1. [index.html](file:///f:/OCTOBER%20WEBSITE/Voltcycle/index.html) — Animated Speed-Line Hero, Bike Types pre-filter, Range & Budget Matcher, Top-Rated Models Grid & Feature Matrix, Motor & Battery Explainer, Verified Owner Reviews, FAQ, and CTA.
2. [about.html](file:///f:/OCTOBER%20WEBSITE/Voltcycle/about.html) — Origin story, Test Riders team bios, 10-Point Review Methodology (`#methodology`), and Editorial Independence & Affiliate Statement.
3. [services.html](file:///f:/OCTOBER%20WEBSITE/Voltcycle/services.html) — Pre-Purchase Printable Checklist (`#guides`), Custom Model Comparison Request (`#comparisons`), Test-Ride Partner Finder with map (`#test-ride`), Maintenance & Battery Safety Guide (`#safety`), and Consultation Tiers (`#plans`).
4. [contact.html](file:///f:/OCTOBER%20WEBSITE/Voltcycle/contact.html) — Direct engineering enquiry form (client-side validated with live character counter), Contact Details, Seattle Proving Ground map block, and quick resources.

---

## 🛠️ File Structure

```
Voltcycle/
├── index.html                 ← Home page hosting all signature tools
├── about.html                 ← Testing story, test team, methodology, independence
├── services.html              ← Printable checklist, comparisons, test-ride finder, safety
├── contact.html               ← Dedicated 4th page with validated contact form & map
├── assets/
│   ├── css/
│   │   └── style.css          ← Single design system token source, CSS variables, typography
│   └── js/
│       ├── main.js            ← Navbar, drawer, accordions, scroll-spy
│       ├── data.js            ← Single source of truth (models, reviews, test centers)
│       ├── matcher.js         ← Real-world range calculation engine with visible formula
│       ├── models.js          ← Filter/sort, compare tray, matrix modal, detail modal, JSON-LD
│       ├── explainer.js       ← Hub vs Mid-drive SVGs, torque/watts, Wh = V × Ah calculator
│       ├── reviews.js         ← Verified reviews rating breakdown, distribution bars, filters
│       ├── contact.js         ← Contact form validation, character counter, success alert
│       └── affiliate.js       ← Delegated click tracking → window.dataLayer + toast feedback
└── README.md
```

---

## 🎨 Design System & Visual Identity

- **Color Palette (Max 3 Tokens)**:
  - **Primary**: Deep Carbon Charcoal (`#0D1117`, surface `#161B22`, cards `#1B212A`)
  - **Secondary**: Slate Graphite (`#94A3B8`, borders `#2B3340`)
  - **Accent**: Electric Lime (`#CCFF00`, hover `#B5E600`, glow `rgba(204, 255, 0, 0.28)`)
- **Typography**:
  - Headings: `Space Grotesk`, sans-serif (Sporty, modern technical)
  - Body: `Plus Jakarta Sans`, sans-serif (High legibility)
  - Heading Weights: H1 = 560, H2 = 530, H3 = 510 (Strictly under 580, never 600+)
  - Body Weight: 410 (Strictly within 400–430)
  - Tabular Numerals: Enabled globally for prices, scores, ranges, and specs.
- **Global Alignment**:
  - All section headers and subtext are centered (`text-align: center`).
  - Single global border radius (`--radius-global: 10px`).
  - Single global shadow (`--shadow-global: 0 12px 32px rgba(0, 0, 0, 0.45)`).

---

## 🚀 Key Functional Features

### 1. Range & Budget Matcher
- **Inputs**: Daily distance (miles/km toggle with validated range), route terrain profile (flat, mixed, hilly), rider weight + cargo (lbs/kg toggle), electric assist mode (light, balanced, max), budget slider, bike architecture selector, and must-have toggles (torque sensor, removable battery, lights, rack mounts, hydraulic disc brakes).
- **Formula Display**: Visually shows `Estimated Range = (Battery Wh / Assist Consumption) × Weight Factor × Terrain Factor`.
- **Ranked Output**: Models sorted by match percentage with dynamic, plain-English "Why" reasoning and empty-state filter relaxations.

### 2. Top-Rated Models & Compare Matrix
- 9 rich fictional models across Commuter, eMTB, Folding, and Cargo architectures.
- Dual scoring system: Voltcycle Editorial Score (/10) vs Verified Owner Rating (/5).
- Interactive Compare Tray (floating bottom bar) allowing 2 to 4 models to be compared side-by-side.
- Sticky header and first column on mobile with horizontal scrolling within container.

### 3. Accessible Model Detail Modal
- 4-tab tabbed interface: Overview (score breakdown), Pros & Cons (grouped by category + verdict box: who it's for / who should skip), Verified Reviews, and Technical Specs.
- Accessible focus trap, keyboard Esc dismiss, and backdrop close.
- Dynamically injects schema.org `Product` + `Review` + `AggregateRating` JSON-LD for the active model.

### 4. Motor & Battery Explainer
- Interactive Hub Motor vs Mid-Drive switcher featuring custom inline SVGs.
- Plain-English breakdown of Torque (Nm) vs Power (Watts).
- Live Watt-Hour Calculator (`Wh = V × Ah`) with real-world estimated range preview.
- Directional environmental range modifiers (temperature, grade, wind, tires, weight, cadence).
- Battery charging safety protocols and legal class classifications.

### 5. Delegated Affiliate Tracking
- All "Check price" buttons carry UTM tracking parameters, `data-affiliate-id`, `data-product`, `data-placement`, and `rel="sponsored noopener"`.
- Delegated click listener dispatches events to `window.dataLayer` and displays an on-screen toast notification.
- Disclosure lines displayed near every affiliate button cluster and in the site footer.

### 6. Test-Ride Partner Finder
- Searchable directory of partner proving grounds (Seattle, Denver, SF, Austin, Chicago, Portland) with available models and track profile details.
- Embedded Google Maps iframe placeholder.

### 7. Validated Contact Form
- Real-time character counter for messages (min 20, max 1000).
- Strict email regex and name length validation.
- Mandatory privacy consent checkbox preventing submission until checked.
- Inline simulated success notification (no page refresh).
