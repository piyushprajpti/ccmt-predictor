# Project Development Rules

## 1. Architecture & Modularization
- Maintain a strictly modular structure. Never write all logic in a single file.
- Create reusable components and utilize them consistently across the application.

## 2. Code Quality & Performance
- All code must meet high industry standards: scalable, readable, maintainable, and resilient to bugs or crashes.
- Optimization is mandatory. Ensure application performance is never compromised.
- Cover all the edge cases and handle them gracefully.
- Use proper error handling and display user-friendly error messages.
- Ensure proper loading states and skeleton screens for better user experience.

## 3. Design System & Aesthetics
- **Colors**: Always use tokens from [globals.css](app/globals.css). Never hardcode color values.
- **Theme Compatibility**: All elements must be dual-theme compatible (Light/Dark). Ensure perfect contrast and accessibility in both modes.
- **Typography**: Keep typography professional and balanced. Avoid excessively large font sizes.

## 4. Responsiveness & Adaptive UI
- Optimize designs for all resolutions: Desktop, Tablet, and Mobile.
- Avoid hardcoded values that fix layouts to specific screen sizes. The UI must be fluid and adaptive.

## 5. Functional Implementation
- Reference images are for inspiration only. Do not replicate them literally.
- Apply engineering common sense to build functional, logical screens (e.g., proper empty states, sorting, and active interactions).

## 6. Verification Process
- Do not verify changes by opening the browser or taking screenshots. Focus entirely on providing high-quality, logic-driven output. 
- The user will manually verify changes and provide feedback if issues arise.