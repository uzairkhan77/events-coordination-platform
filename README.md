# Events Coordination App

A modern React + TypeScript + Vite application for event management, featuring Firebase authentication, event creation, user invitations, and more.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```
2. **Configure Firebase:**
   - Add your Firebase credentials to `.env` or `vite.config.ts` as needed.
3. **Run the app:**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

## Features & Approach

- **Authentication:** Secure login/signup using Firebase Auth. Auth guards for protected and public routes.
- **Event Management:** Create, view, and manage events. Prevents creation of events in the past.
- **User Invitations:** Search and invite users by email to events.
- **UI/UX:** Uses shadcn/ui, custom logo, and Lora font for a modern look. Loading states and error messages for better feedback.
- **Routing:** Generic route guards (`ProtectedRoute`, `PublicRoute`, `AuthRedirect`) for clean navigation logic.
- **Immediate Updates:** Event lists are refetched after creation for real-time updates.

## Challenges & Solutions

- **Theme Customization:** Overrode shadcn base color and global styles for a consistent look.
- **Tailwind Classes Not Applying:** Ensured Tailwind config scans all source files and used inline styles as fallback.
- **Auth Logic:** Centralized route guards for maintainability and scalability.
- **Event Refetch:** Added refetch logic to update event lists immediately after creation.

## Folder Structure

- `src/components/` - UI and utility components
- `src/hooks/` - Custom hooks for Firebase and app logic
- `src/pages/` - Page-level components
- `src/routes/` - Route definitions and guards
- `src/views/` - View components for pages and modals

## How to Contribute

Feel free to fork the repo, open issues, or submit pull requests!

---

For any questions, contact the maintainer or open an issue on GitHub.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
