import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom';

const frameworks = ['React', 'Angular', 'Vue', 'Svelte'];

const portfolioGuides = {
  React: {
    steps: [
      {
        title: 'Set Up Your React Project',
        description: 'Initialize a new React project using Vite for faster development or Create React App for a more traditional setup. Vite is recommended for its lightweight and fast build process. Ensure Node.js (version 18 or higher) is installed.',
        code: `npm create vite@latest my-portfolio -- --template react
cd my-portfolio
npm install
npm run dev`,
        tips: [
          'Use Vite for faster hot module replacement (HMR) during development.',
          'Set up a `.gitignore` file to exclude `node_modules` and `dist`.',
          'Consider installing ESLint and Prettier for code consistency: `npm install --save-dev eslint prettier`.'
        ]
      },
      {
        title: 'Create Reusable Components',
        description: 'Organize your portfolio into modular components (e.g., Header, About, Projects, Contact). Use a folder structure like `src/components/` to keep code maintainable. Implement React Router for navigation between sections.',
        code: `// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-blue-600 text-white p-4 shadow-md">
    <nav className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">My Portfolio</h1>
      <div className="space-x-4">
        <Link to="/about" className="hover:text-gray-300">About</Link>
        <Link to="/projects" className="hover:text-gray-300">Projects</Link>
        <Link to="/contact" className="hover:text-gray-300">Contact</Link>
      </div>
    </nav>
  </header>
);

export default Header;`,
        tips: [
          'Use functional components with hooks for modern React development.',
          'Keep components small and focused for reusability.',
          'Add PropTypes or TypeScript for type checking: `npm install prop-types`.'
        ]
      },
      {
        title: 'Style with Tailwind CSS',
        description: 'Integrate Tailwind CSS for rapid, utility-first styling. Tailwind ensures responsive designs with minimal CSS. Configure it to purge unused styles for a smaller bundle size in production.',
        code: `npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: []
};

// src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;`,
        tips: [
          'Use Tailwind’s dark mode feature: add `darkMode: "class"` to `tailwind.config.js`.',
          'Optimize for production by enabling purge in `tailwind.config.js`.',
          'Test responsiveness using Tailwind’s breakpoints (e.g., `sm:`, `md:`, `lg:`).'
        ]
      },
      {
        title: 'Deploy to Netlify',
        description: 'Deploy your portfolio to Netlify for free, reliable hosting. Netlify supports continuous deployment from Git. Ensure your build command outputs to the `dist` folder for Vite.',
        code: `npm run build
# Install Netlify CLI
npm install -g netlify-cli
# Deploy
netlify deploy --prod --dir=dist`,
        tips: [
          'Connect your GitHub repository to Netlify for automatic deployments.',
          'Add environment variables in Netlify’s dashboard for sensitive data.',
          'Enable HTTPS and custom domains for a professional touch.'
        ]
      }
    ]
  },
  Angular: {
    steps: [
      {
        title: 'Set Up Your Angular Project',
        description: 'Use Angular CLI to create a new project with a robust structure. Angular provides built-in features like routing and TypeScript support. Ensure Node.js and Angular CLI are installed globally.',
        code: `npm install -g @angular/cli
ng new my-portfolio --style=scss --routing
cd my-portfolio
ng serve`,
        tips: [
          'Choose SCSS for styling to leverage Angular’s style encapsulation.',
          'Use `--routing` flag to enable Angular Router for navigation.',
          'Run `ng lint` to enforce coding standards.'
        ]
      },
      {
        title: 'Create Components',
        description: 'Generate components for each section of your portfolio. Angular’s CLI makes it easy to scaffold components. Organize them in a `components` folder for clarity.',
        code: `ng generate component components/header
ng generate component components/about
ng generate component components/projects
ng generate component components/contact`,
        tips: [
          'Use Angular’s `@Input` and `@Output` for component communication.',
          'Keep templates in `.html` files and styles in `.scss` for maintainability.',
          'Consider lazy-loading modules for large portfolios: `ng generate module projects --route projects --module app`.'
        ]
      },
      {
        title: 'Add Styling with SCSS',
        description: 'Use SCSS for modular and maintainable styles. Angular supports component-level style encapsulation. Optionally, integrate Tailwind CSS for utility-first styling.',
        code: `/* src/app/components/header/header.component.scss */
header {
  background-color: #1e40af;
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}`,
        tips: [
          'Use Angular’s `:host` pseudo-class for component-specific styles.',
          'Leverage SCSS variables and mixins for reusable styles.',
          'Test styles in multiple browsers for consistency.'
        ]
      },
      {
        title: 'Deploy to Firebase',
        description: 'Use Firebase Hosting for easy deployment. Angular’s production build optimizes the app for performance. Firebase supports custom domains and SSL.',
        code: `ng build --prod
npm install -g firebase-tools
firebase init hosting
firebase deploy`,
        tips: [
          'Optimize images and assets before deployment to reduce load times.',
          'Use Firebase’s CLI to manage multiple environments (e.g., staging, production).',
          'Add a `robots.txt` file for SEO.'
        ]
      }
    ]
  },
  Vue: {
    steps: [
      {
        title: 'Set Up Your Vue Project',
        description: 'Use Vue CLI or Vite to initialize a Vue project. Vite offers faster builds, while Vue CLI provides more configuration options. Vue 3 is recommended for modern features.',
        code: `npm install -g @vue/cli
vue create my-portfolio
# or
npm create vite@latest my-portfolio -- --template vue
cd my-portfolio
npm install
npm run dev`,
        tips: [
          'Choose Vue 3 with the Composition API for better scalability.',
          'Use Vue CLI’s plugin system to add features like Vuex or Vue Router.',
          'Set up a linter like ESLint: `npm install --save-dev eslint`.'
        ]
      },
      {
        title: 'Create Components',
        description: 'Build single-file components (SFCs) for your portfolio sections. Vue’s SFCs combine HTML, JavaScript, and CSS in one file for simplicity.',
        code: `<!-- src/components/Header.vue -->
<template>
  <header class="bg-green-500 text-white p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold">My Portfolio</h1>
      <nav class="space-x-4">
        <router-link to="/about" class="hover:text-gray-300">About</router-link>
        <router-link to="/projects" class="hover:text-gray-300">Projects</router-link>
        <router-link to="/contact" class="hover:text-gray-300">Contact</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>`,
        tips: [
          'Use Vue Router for navigation: `npm install vue-router@4`.',
          'Leverage Vue’s Composition API for reactive state management.',
          'Add Vue Devtools browser extension for debugging.'
        ]
      },
      {
        title: 'Add Styling with Tailwind',
        description: 'Integrate Tailwind CSS for responsive, utility-first styling. Configure Tailwind to work with Vue’s single-file components.',
        code: `npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: []
};

// src/assets/main.css
@tailwind base;
@tailwind components;
@tailwind utilities;`,
        tips: [
          'Use `<style scoped>` in SFCs to keep styles component-specific.',
          'Optimize Tailwind’s output with `purge` in production.',
          'Test responsiveness with Vue’s dev server and Tailwind’s breakpoints.'
        ]
      },
      {
        title: 'Deploy to Vercel',
        description: 'Deploy your Vue app to Vercel for serverless hosting. Vercel supports Vue projects out of the box and provides automatic scaling.',
        code: `npm run build
npm install -g vercel
vercel --prod`,
        tips: [
          'Use Vercel’s CLI to preview deployments: `vercel`.',
          'Add environment variables in Vercel’s dashboard for configuration.',
          'Enable Vercel’s analytics to monitor traffic.'
        ]
      }
    ]
  },
  Svelte: {
    steps: [
      {
        title: 'Set Up Your Svelte Project',
        description: 'Use SvelteKit for a modern Svelte project with server-side rendering and static site generation. SvelteKit is ideal for portfolios due to its simplicity and performance.',
        code: `npm create svelte@latest my-portfolio
cd my-portfolio
npm install
npm run dev`,
        tips: [
          'Choose SvelteKit’s static adapter for a portfolio: `npm install @sveltejs/adapter-static`.',
          'Use Svelte’s stores for simple state management.',
          'Enable TypeScript for better type safety: `npm run check`.'
        ]
      },
      {
        title: 'Create Components',
        description: 'Build Svelte components for your portfolio. Svelte’s reactive syntax makes component development intuitive. Store components in `src/lib`.',
        code: `<!-- src/lib/Header.svelte -->
<script>
  export let title = 'My Portfolio';
</script>

<header class="bg-purple-600 text-white p-4 shadow-md">
  <div class="container mx-auto flex justify-between items-center">
    <h1 class="text-2xl font-bold">{title}</h1>
    <nav class="space-x-4">
      <a href="/about" class="hover:text-gray-300">About</a>
      <a href="/projects" class="hover:text-gray-300">Projects</a>
      <a href="/contact" class="hover:text-gray-300">Contact</a>
    </nav>
  </div>
</header>

<style>
  header {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>`,
        tips: [
          'Use SvelteKit’s routing by creating files in `src/routes`.',
          'Leverage Svelte’s built-in animations for smooth transitions.',
          'Keep components lightweight to maintain Svelte’s performance benefits.'
        ]
      },
      {
        title: 'Add Styling',
        description: 'Use scoped styles in Svelte components or integrate Tailwind CSS for utility-first styling. Svelte’s scoped styles prevent CSS leaks by default.',
        code: `npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{svelte,js,ts}'],
  theme: { extend: {} },
  plugins: []
};

// src/app.css
@tailwind base;
@tailwind components;
@tailwind utilities;`,
        tips: [
          'Use Svelte’s `<style>` tag for scoped styles or Tailwind for rapid prototyping.',
          'Optimize CSS with Tailwind’s purge option.',
          'Test styles in SvelteKit’s dev server for instant feedback.'
        ]
      },
      {
        title: 'Deploy to Vercel',
        description: 'Deploy your SvelteKit app to Vercel, which supports SvelteKit’s static and server-side rendering modes. Use the static adapter for a portfolio.',
        code: `npm run build
npm install -g vercel
vercel --prod`,
        tips: [
          'Use `@sveltejs/adapter-static` for static site generation.',
          'Configure Vercel to handle SvelteKit’s routing correctly.',
          'Add a custom domain for a professional portfolio URL.'
        ]
      }
    ]
  }
};

const Portfolio = () => {
  const [selectedFramework, setSelectedFramework] = useState('React');

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`How to Build a Portfolio with ${selectedFramework}`, 10, 10);
    portfolioGuides[selectedFramework].steps.forEach((step, index) => {
      const yPos = 20 + index * 60;
      doc.setFontSize(14);
      doc.text(`Step ${index + 1}: ${step.title}`, 10, yPos);
      doc.setFontSize(12);
      doc.text(step.description, 10, yPos + 10, { maxWidth: 180 });
      doc.text('Code:', 10, yPos + 20);
      doc.text(step.code, 10, yPos + 30, { maxWidth: 180 });
      doc.text('Tips:', 10, yPos + 40);
      step.tips.forEach((tip, i) => {
        doc.text(`- ${tip}`, 10, yPos + 50 + i * 5, { maxWidth: 180 });
      });
    });
    doc.save(`portfolio-guide-${selectedFramework.toLowerCase()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
            How to Build a Portfolio with {selectedFramework}
          </h2>
          <button
            onClick={downloadPDF}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>
        <div className="flex space-x-4 mb-6">
          {frameworks.map((framework) => (
            <button
              key={framework}
              className={`px-4 py-2 rounded ${
                selectedFramework === framework
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-400 text-white hover:bg-blue-500'
              }`}
              onClick={() => setSelectedFramework(framework)}
            >
              {framework}
            </button>
          ))}
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            {portfolioGuides[selectedFramework].steps.map((step, index) => (
              <li key={index}>
                <a
                  href={`#step-${index + 1}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Step {index + 1}: {step.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-8">
          {portfolioGuides[selectedFramework].steps.map((step, index) => (
            <div
              key={index}
              id={`step-${index + 1}`}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                Step {index + 1}: {step.title}
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">{step.description}</p>
              <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {step.code}
              </SyntaxHighlighter>
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Tips</h4>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                  {step.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-gray-700 dark:text-gray-300">
          <p>Progress: Completed {portfolioGuides[selectedFramework].steps.length} steps for {selectedFramework}</p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;