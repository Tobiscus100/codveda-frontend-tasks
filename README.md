### Level 1 - Task 1: Responsive Tech Agency Landing Page (ApexSphere Dynamics)

A modern, high-performance landing page for a digital engineering agency built using semantic HTML5, modern CSS3 (Flexbox & CSS Grid), and vanilla JavaScript. 

Key Technical Highlights:
- Semantic Structure & Accessibility: Fully structured using HTML5 landmark elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) and WCAG-compliant color contrast.
- Mobile-First & Fluid Layout: Engineered with CSS Grid and Flexbox for fluid responsiveness across mobile (<768px), tablet, and desktop viewports.
- Interactive Vanilla JavaScript: Features an accessible slide-out mobile navigation drawer, an active scroll-spy navigation highlighter, dynamic header background blur on scroll, and a smooth scroll-to-top button.
- Zero-Dependency Vector Assets: Built with inline SVG icons and a custom mock terminal card for fast load times and clean cross-device rendering.

- ---

### Level 1 - Task 2: Interactive Developer Registration Form (ApexPortal)

A validated developer registration portal built with semantic HTML5, modern CSS3, and vanilla JavaScript.

**Key Technical Highlights:**
- **Client-Side Real-Time Validation:** Dynamic regex validation evaluating required fields, RFC-compliant email formats, and international telephone numbers without full page reloads.
- **Dynamic Password Strength Algorithm:** 4-tier complexity scoring engine checking character length ($\ge 8$), uppercase letters, numeric digits, and special characters, complete with an animated visual meter bar.
- **Form State & UX Enhancements:** Password visibility toggle (Show/Hide), dynamic focus rings, inline error indicators, and accessible status iconography.
- **Accessible Confirmation Workflow:** Submission event intercept with custom modal overlay confirmations and ARIA live region (`aria-live="polite"`) announcements.


---

### Level 2 - Task 2: REST API User Explorer (DevFinder)

A client-side developer profile explorer consuming the official public GitHub v3 REST API.

**Key Technical Highlights:**
- **Dynamic Asynchronous Fetching:** Connects to GitHub's public user endpoints using modern `async/await` and robust HTTP response parsing.
- **Stateful UI Lifecycles:** Features dedicated CSS shimmer skeleton loaders during active network requests, dynamic error handling banners, and fully populated profile views.
- **Editorial Design System:** Warm paper/terracotta aesthetic styled with custom tokens, responsive CSS Grid layout, and accessible iconography.

---

## Level 2 (Intermediate)

### Task 2: REST API User Explorer (DevFinder)
A lightweight developer profile search client consuming the official public GitHub v3 REST API.
- **Asynchronous Data Layer:** Built using `fetch()` and `async/await` with dedicated error handling for invalid handles (404) and rate limits (403).
- **Interactive UI Lifecycles:** Features shimmer skeleton loaders during active network calls, dynamic error alert banners, and populated user metrics.
- **Design System:** Warm editorial paper/terracotta aesthetic with custom layout tokens and responsive CSS Grid.

### Task 3: Modern SaaS Metrics Dashboard (PulseTrack)
An analytics dashboard interface constructed entirely with the Tailwind CSS utility framework.
- **Utility-First Architecture:** Leverages Tailwind arbitrary values, responsive grid breakpoints, and custom extended theme tokens (`brand`, `lavender`, `surface`).
- **Dynamic Data Filtering:** Client-side JavaScript filtering on recent transaction tables and interactive timeline buttons.
- **Component Design:** Stat cards with trend indicators, custom sidebar navigation, status badges, and table layouts.
