# Aditya Vishwakarma — Interactive 3D Portfolio

<div align="center">

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Flutter Specialist](https://img.shields.io/badge/Domain-Flutter_%26_Fintech-02569B?style=for-the-badge&logo=flutter&logoColor=white)](https://flutter.dev/)

<br />

**A high-performance, immersive 3D engineering portfolio showcasing production Flutter applications, institutional fintech systems, and mobile architecture.**

[**Explore Live Portfolio ↗**](https://imaditya-31-portfolio.vercel.app) • [**View Verified Resume**](#-executive-resume-engine) • [**Get in Touch**](#-contact--connect)

</div>

---

## 🌟 Key Features & Architecture

### 📱 1. Interactive 3D Smartphone Device Mockup
- **Realistic Hardware Chassis**: Continuous curvature squircle geometry (`rounded-[48px]` to `rounded-[41px]`), titanium side rail accents, specular chamfer rim lighting, and dual ambient depth drop shadows.
- **Dynamic Island Status Capsule**: Spring-animated interactive pill with camera aperture and optical sensor glow that expands with contextual app status.
- **4 Live Fintech App Flows**:
  - **Peys App**: BBPS-powered utility payment hub with real-time balance cards (`₹48,250.75`), 4 tactile quick actions (Pay, AEPS, DMT, Scan), utility shortcuts, and live transaction ledger.
  - **PR Fin Hub**: Institutional digital credit engine with SVG radial gauge limit meter (`₹3,50,000` available), repayment tracker, and disbursal pipeline.
  - **AathifRupay**: High-throughput merchant POS terminal with 7-day sparkline revenue chart, Soundbox telemetry, and instant biometric settlement stream.
  - **WowPe**: Consumer UPI 2.0 wallet with cashback reward banners, 4 UPI grid actions, and transaction feed.
- **Floating iOS 26 Glass Dock**: Translucent glass dock with active droplet indicator and home gesture indicator.
- **Physics Tilt & Touch Safeguards**: 3D interactive gyroscope/mouse tilt on desktop, automatically disabled on touch devices for fluid scrolling.

### 💎 2. Apple iOS 26 / VisionOS Liquid Glass Navbar
- **Invisible Rest State**: Completely borderless and transparent at the top of the viewport, eliminating harsh lines over the hero section.
- **Liquid Glass on Scroll**: Materializes with high translucency (`bg-white/45` / `bg-[#07090E]/45`), `backdrop-blur-3xl`, `backdrop-saturate-[190%]`, hairline specular rim highlights, and refraction shadows.
- **Docking Brand Identity**: Smooth entrance animation for avatar, name, and role title as the user scrolls past the Hero identity card.

### ⚡ 3. Executive Technical Matrix
- **Structured Specification Board**: Clean hairline-divided master ledger (`divide-y divide-slate-200/80 dark:divide-white/[0.07]`) replacing noisy simulation widgets.
- **6 Domain Categories & 38 Authentic Technologies**:
  1. *Languages & Frameworks*: Flutter, Dart, Java, Kotlin, Android, iOS.
  2. *State Management & Architecture*: GetX, BLoC, Cubit, MVC, Clean Architecture, Dependency Injection.
  3. *Backend, API, & Cloud*: REST APIs, WebSockets, Dio, Firebase, Google Cloud Platform.
  4. *Fintech Specialization*: AEPS, BBPS, DMT, QR Codes, Payment Gateways, Travel Bookings, Wallets, Native SDKs.
  5. *Development & Release*: Git (GitHub, GitLab, Bitbucket), Android Studio, Xcode, Crashlytics, Play Console, App Store Connect, Postman, Swagger, Jira.
  6. *Additional Technologies*: React, JavaScript, Node.js, MySQL, MongoDB Atlas, Figma.
- **Brand-Accurate SVG Vectors**: Official SVGs via Simple Icons and custom vector marks with zero beeping dots.

### 📄 4. Strict 2-Page Executive Resume Engine
- **Authentic PDF Synchronization**: Direct download links to the verified 2-page curriculum vitae.
- **Dedicated Print Engine (`@media print`)**:
  - Suppresses all website chrome (`#root`, navbar, hero, background layers, footer).
  - Explicit A4 page margins (`8mm 12mm`).
  - Strict page breaks (`break-after: page`) enforcing an exact 2-page layout matching the physical document.
  - Page 1: Header, Professional Summary, Technical Skills, Work Experience, Projects (Peys, PR Fin, WowPe).
  - Page 2: Projects (AathifRupay, S3Lifestyle, Portfolio), Education (MCS, BCS).

### 🌓 5. Flicker-Free Dark & Light Mode System
- Explicit root color-scheme painting and stable scrollbar gutters (`scrollbar-gutter: stable`), completely preventing right-edge subpixel canvas flickering during theme switching.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Core Framework** | [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/) |
| **Build & Bundler** | [Vite 6 / 8](https://vitejs.dev/) |
| **3D Graphics** | [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei) |
| **Motion & Physics** | [Framer Motion](https://www.framer.com/motion/) |
| **Styling & System** | [Tailwind CSS 3.4](https://tailwindcss.com/), PostCSS, Autoprefixer |
| **Icons & Brand Marks** | [Lucide React](https://lucide.dev/), [React Icons (Simple Icons)](https://react-icons.github.io/react-icons/) |
| **Hosting & CI/CD** | [Vercel](https://vercel.com/) |

---

## 📂 Project Structure

```text
3D_website/
├── public/
│   └── assets/
│       ├── photo.jpg          # Profile avatar
│       └── resume.pdf         # Authentic 2-page PDF document
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── DeviceCanvas.tsx            # Three.js Canvas container
│   │   │   ├── HeroSpotlight.tsx           # Ambient interactive mouse spotlight
│   │   │   ├── InteractivePhoneMockup.tsx  # iOS 26 Squircle Phone with 4 Fintech apps
│   │   │   └── Smartphone3D.tsx            # 3D device model rendering
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                  # Liquid Glass floating navigation
│   │   │   └── Footer.tsx                  # Gradient horizon footer with Apple fade
│   │   ├── sections/
│   │   │   ├── Hero.tsx                    # Hero introduction & action triggers
│   │   │   ├── MetricsBar.tsx              # Quantitative engineering impact stats
│   │   │   ├── Projects.tsx                # Filterable production projects grid
│   │   │   ├── SkillsBento.tsx             # Executive Technical Matrix (6 domains)
│   │   │   ├── Experience.tsx              # Spinal timeline career history
│   │   │   ├── Education.tsx               # Academic degree credentials
│   │   │   └── Contact.tsx                 # 24h SLA contact form & direct channels
│   │   └── ui/
│   │       ├── Badge.tsx                   # Glassmorphic tag pills
│   │       ├── Button.tsx                  # Interactive micro-animated buttons
│   │       ├── ProjectModal.tsx            # Deep-dive project modal (React Portal)
│   │       └── ResumeModal.tsx             # 2-Page Executive CV modal (React Portal)
│   ├── data/
│   │   ├── experience.ts                   # Career timeline dataset
│   │   ├── projects.ts                     # Production projects dataset
│   │   └── skills.ts                       # Categorized 38-skill technology ledger
│   ├── lib/
│   │   └── utils.ts                        # Tailwind class merge utilities
│   ├── App.tsx                             # Main layout assembly
│   ├── index.css                           # Liquid glass, dark/light, & @media print CSS
│   └── main.tsx                            # Root React 19 entrypoint
├── index.html                              # HTML entry & SEO metadata
├── tailwind.config.js                      # Custom themes, colors & utilities
├── tsconfig.json                           # TypeScript compiler configuration
└── vite.config.ts                          # Vite build & chunking configuration
```

---

## 💻 Local Development

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/imaditya-31/new-portfolio.git
   cd new-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The optimized production bundle will be output to the `dist/` directory.

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 📬 Contact & Connect

**Aditya Vishwakarma**  
*Mobile Application Engineer (Flutter, Android, iOS, Fintech)*  
📍 Pune, Maharashtra, India  

- **Email**: [adityavishwakarma355@gmail.com](mailto:adityavishwakarma355@gmail.com)
- **LinkedIn**: [linkedin.com/in/aditya-vishwakarma-0903a01b5](https://www.linkedin.com/in/aditya-vishwakarma-0903a01b5)
- **GitHub**: [github.com/imaditya-31](https://github.com/imaditya-31)
- **Portfolio**: [imaditya-31-portfolio.vercel.app](https://imaditya-31-portfolio.vercel.app)

---

<div align="center">
  <sub>Designed & Developed by Aditya Vishwakarma • Built with React 19, Three.js, & Tailwind CSS</sub>
</div>

