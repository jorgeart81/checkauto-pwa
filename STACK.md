# Tech Stack & Architecture - CheckAuto PWA

This document outlines the technology stack, tooling, architecture decisions, and operational standards used in the **CheckAuto PWA** project.

---

## 1. Core Framework & Runtime

| Technology     | Version   | Purpose                    | Notes                                                                                                                            |
| :------------- | :-------- | :------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| **Angular**    | `^22.2.0` | Core Application Framework | Standalone components, Zoneless change detection, native control flow (`@if`, `@for`, `@switch`), and Signal-based architecture. |
| **TypeScript** | `~6.0.2`  | Programming Language       | Strict type-checking enabled, path mapping via `@/*`.                                                                            |
| **RxJS**       | `~7.8.0`  | Reactive Event Handling    | Reserved for complex asynchronous streams; local and derived state uses Signals.                                                 |
| **Node.js**    | `>=20.x`  | Runtime Environment        | Modern JavaScript/TypeScript execution runtime.                                                                                  |

---

## 2. State Management & Reactivity

- **Signals First**: Local, shared, and derived UI states use Angular Signals (`signal()`, `computed()`, `linkedSignal()`).
- **Reactive Forms**: Form handling favors Signal Forms (`@angular/forms/signals`) and Reactive Forms over template-driven approaches.
- **Service Singletons**: Services leverage `providedIn: 'root'` and the functional `inject()` API without constructor injection.
- **Global UI Management**: Centralized reactive services (e.g. `ModalService`, `ToastService`, `FleetService`) manage global modal sheets, notification toasts, and active vehicle context.

---

## 3. Styling & Design System

| Technology           | Version   | Description                                                                                                                    |
| :------------------- | :-------- | :----------------------------------------------------------------------------------------------------------------------------- |
| **Tailwind CSS**     | `^4.1.12` | Utility-first CSS engine configured via PostCSS (`@tailwindcss/postcss`).                                                      |
| **PostCSS**          | `^8.5.3`  | CSS preprocessing and autoprefixing pipeline.                                                                                  |
| **Mobile-First PWA** | Custom    | Layout optimized for single-hand mobile usage (bottom navigation, fixed bottom sheets, touch-first targets, safe area insets). |

---

## 4. Routing & Navigation

- **Angular Router**: Lazy-loaded feature routes with `loadComponent()`:
  - `/home` - Fleet summary, hero odometer, expense tracking, and active alerts.
  - `/plan` - Scheduled preventive maintenance milestones and service intervals.
  - `/procedures` - Legal documents, SOAT, technical inspection, and expiration statuses.
  - `/garage` - Multi-vehicle catalog, vehicle switcher, and specification details.
- **Navigation Components**:
  - `BottomNavComponent` with `RouterLink` and `RouterLinkActive`.
  - Floating Action Button (FAB) for quick logging modal triggers.

---

## 5. Testing & Quality Assurance

| Tool              | Version       | Purpose                                                                               |
| :---------------- | :------------ | :------------------------------------------------------------------------------------ |
| **Vitest**        | `^5.0.0`      | High-performance unit test runner integrated via `@angular/build`.                    |
| **JSDOM**         | `^30.0.0`     | DOM simulation environment for headless unit test execution.                          |
| **Prettier**      | `^3.8.1`      | Automated code formatting engine with custom Angular template parser.                 |
| **Accessibility** | WCAG AA / AXE | Minimum WCAG AA compliance, semantic HTML, ARIA attributes, color contrast standards. |

---

## 6. Package Management & Tooling

| Tool                | Version / Details | Purpose                                                                                                  |
| :------------------ | :---------------- | :------------------------------------------------------------------------------------------------------- |
| **pnpm**            | `12.11.2`         | Fast, disk space-efficient package manager. Explicit build approval configured in `pnpm-workspace.yaml`. |
| **Angular CLI**     | `^22.2.2`         | Project scaffolding, compilation, dev server, and build pipeline.                                        |
| **Angular CLI MCP** | Enabled           | Model Context Protocol integration providing real-time best practice queries and architectural guidance. |

---

## 7. Project Commands

```bash
# Start local development server (http://localhost:4200)
pnpm start

# Run full production build
pnpm run build

# Run unit tests with Vitest
pnpm test

# Format all project files with Prettier
pnpm run format

# Verify formatting without modifying files
pnpm run format:check

# Run TypeScript type check
pnpm exec tsc --noEmit
```
