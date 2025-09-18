import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom';

const frameworks = ['React', 'Angular', 'Vue', 'Svelte'];

const ecommerceGuides = {
  React: {
    steps: [
      {
        title: 'Set Up Your React Project',
        description: 'Initialize a React project using Vite for a fast, modern development experience. An e-commerce website requires routing for product and cart pages, API integration for product data, and a styling framework like Tailwind CSS. Ensure Node.js (version 18 or higher) is installed to avoid compatibility issues. This step sets up the project structure, including React Router for navigation and axios for API calls.',
        code: `npm create vite@latest my-ecommerce -- --template react
cd my-ecommerce
npm install react-router-dom axios
npm run dev`,
        tips: [
          'Vite offers faster builds and hot module replacement (HMR) compared to Create React App.',
          'Create a `.gitignore` file to exclude `node_modules`, `dist`, and `.env` files.',
          'Install ESLint and Prettier for code consistency: `npm install --save-dev eslint prettier eslint-config-prettier`.',
          'Use `axios` to fetch product data from APIs like Fake Store API or Commerce.js.'
        ]
      },
      {
        title: 'Create Product Listing and Cart Components',
        description: 'Develop `ProductList` and `Cart` components to display products and manage the shopping cart. Use `useState` and `useEffect` for state management and API calls. Implement routing with React Router for product details and cart pages. Add accessibility features like ARIA labels and keyboard navigation. Persist the cart in `localStorage` for data retention across sessions.',
        code: `// src/components/ProductList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch products');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="container mx-auto p-4" role="region" aria-label="Product List">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img src={product.image} alt={product.title} className="h-40 w-full object-cover mb-2" />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-600">\${product.price}</p>
            <Link
              to={\`/product/\${product.id}\`}
              className="text-blue-600 hover:underline"
              aria-label={\`View \${product.title}\`}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

// src/components/Cart.jsx
import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto p-4" role="region" aria-label="Shopping Cart">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.id} className="flex items-center mb-2">
              <span className="flex-grow">{item.title} - \${item.price}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
                aria-label={\`Remove \${item.title} from cart\`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;`,
        tips: [
          'Use `useContext` or Redux Toolkit for global state management in larger apps.',
          "Persist cart data in `localStorage` using `localStorage.setItem(\\'cart\\', JSON.stringify(cart))`.",
          'Add keyboard support (e.g., Enter key for navigation) and ARIA attributes for accessibility.',
          'Integrate Stripe or PayPal for payment processing in production.'
        ]
      },
      {
        title: 'Style with Tailwind CSS',
        description: 'Integrate Tailwind CSS for responsive, utility-first styling. Use Tailwind’s grid system for product layouts and responsive classes for mobile-friendly designs. Configure dark mode for better accessibility and user experience in low-light environments.',
        code: `npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: { extend: {} },
  plugins: []
};

// src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;`,
        tips: [
          'Enable dark mode with `darkMode: "class"` in `tailwind.config.js`.',
          'Use Tailwind’s grid utilities (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) for responsive layouts.',
          'Add hover, focus, and active states for buttons and links.',
          'Optimize Tailwind with `purge` to reduce CSS bundle size in production.'
        ]
      },
      {
        title: 'Deploy to Netlify',
        description: 'Deploy your React e-commerce app to Netlify for free, reliable hosting with continuous deployment. Optimize the build output for performance and configure environment variables for API keys. Add SEO metadata for better search engine visibility.',
        code: `npm run build
npm install -g netlify-cli
netlify deploy --prod --dir=dist`,
        tips: [
          'Connect your GitHub repository to Netlify for automatic deployments.',
          'Use Netlify’s environment variables for secure API keys (e.g., Stripe).',
          'Add a `netlify.toml` file to customize build settings.',
          'Include `<meta name="description">` and `robots.txt` for SEO.'
        ]
      }
    ]
  },
  Angular: {
    steps: [
      {
        title: 'Set Up Your Angular Project',
        description: 'Use Angular CLI to create a project with TypeScript, routing, and SCSS. Angular’s structured approach is ideal for complex e-commerce apps with robust state management and routing. Ensure Node.js (version 18 or higher) and Angular CLI are installed globally.',
        code: `npm install -g @angular/cli
ng new my-ecommerce --style=scss --routing
cd my-ecommerce
ng serve`,
        tips: [
          'Use `--style=scss` for modular, reusable styles.',
          'Enable strict mode in `tsconfig.json` for type safety.',
          'Add Angular Material for pre-built UI components: `ng add @angular/material`.',
          'Run `ng lint` and `ng test` to ensure code quality.'
        ]
      },
      {
        title: 'Create Product Listing and Cart Components',
        description: 'Generate `ProductList` and `Cart` components, along with a `ProductService` for state management. Use Angular’s HttpClient to fetch products from an API (e.g., Fake Store API). Implement routing with Angular Router and add accessibility features like ARIA labels and keyboard support.',
        code: `ng generate component components/product-list
ng generate component components/cart
ng generate service services/product

// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private cart = new BehaviorSubject<Product[]>(JSON.parse(localStorage.getItem('cart') || '[]'));
  cart$ = this.cart.asObservable();

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }

  addToCart(product: Product) {
    const currentCart = this.cart.getValue();
    this.cart.next([...currentCart, product]);
    localStorage.setItem('cart', JSON.stringify(this.cart.getValue()));
  }

  removeFromCart(id: number) {
    const updatedCart = this.cart.getValue().filter(item => item.id !== id);
    this.cart.next(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }
}

// src/app/components/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink],
  template: \`
    <div class="container mx-auto p-4" role="region" aria-label="Product List">
      <h1 class="text-2xl font-bold mb-4">Products</h1>
      <p *ngIf="loading" class="text-center">Loading products...</p>
      <p *ngIf="error" class="text-center text-red-600">{{ error }}</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div *ngFor="let product of products" class="border p-4 rounded shadow">
          <img [src]="product.image" [alt]="product.title" class="h-40 w-full object-cover mb-2" />
          <h2 class="text-lg font-semibold">{{ product.title }}</h2>
          <p class="text-gray-600">\${{ product.price }}</p>
          <a
            [routerLink]="['/product', product.id]"
            class="text-blue-600 hover:underline"
            [attr.aria-label]="'View ' + product.title"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  \`
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to fetch products';
        this.loading = false;
      }
    });
  }
}

// src/app/components/cart/cart.component.ts
import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  template: \`
    <div class="container mx-auto p-4" role="region" aria-label="Shopping Cart">
      <h1 class="text-2xl font-bold mb-4">Cart</h1>
      <ng-container *ngIf="(cart$ | async)?.length; else emptyCart">
        <ul>
          <li *ngFor="let item of cart$ | async" class="flex items-center mb-2">
            <span class="flex-grow">{{ item.title }} - \${{ item.price }}</span>
            <button
              (click)="removeFromCart(item.id)"
              class="bg-red-600 text-white p-1 rounded hover:bg-red-700"
              [attr.aria-label]="'Remove ' + item.title + ' from cart'"
            >
              Remove
            </button>
          </li>
        </ul>
      </ng-container>
      <ng-template #emptyCart>
        <p>Your cart is empty.</p>
      </ng-template>
    </div>
  \`
})
export class CartComponent {
  cart$ = this.productService.cart$;

  constructor(private productService: ProductService) {}

  removeFromCart(id: number) {
    this.productService.removeFromCart(id);
  }
}`,
        tips: [
          'Add `HttpClientModule` to `app.module.ts` or use standalone components for `HttpClient`.',
          "Persist cart in `localStorage` using `localStorage.setItem(\\'cart\\', JSON.stringify(this.cart.getValue()))`.",
          'Use Angular’s animations for smooth transitions when adding/removing items.',
          'Integrate a payment gateway like Stripe for checkout functionality.'
        ]
      },
      {
        title: 'Add Styling with SCSS',
        description: 'Use SCSS for component-specific styles with Angular’s style encapsulation. Create responsive layouts with grid systems and add transitions for a polished UI. Alternatively, integrate Tailwind CSS for faster styling.',
        code: `/* src/app/components/product-list/product-list.component.scss */
.container {
  max-width: 1200px;
  margin: 0 auto;
}

img {
  object-fit: cover;
}

a {
  transition: color 0.3s ease;
}

.grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}`,
        tips: [
          'Use `:host` to style the component’s root element.',
          'Define SCSS variables (e.g., `$primary: #1e40af`) for consistent theming.',
          'Test styles across browsers for compatibility.',
          'Consider Angular Material for pre-styled UI components.'
        ]
      },
      {
        title: 'Deploy to Firebase',
        description: 'Deploy your Angular e-commerce app to Firebase Hosting for scalable, reliable hosting. Optimize the production build for performance and add SEO metadata for better search engine visibility.',
        code: `ng build --prod
npm install -g firebase-tools
firebase init hosting
firebase deploy`,
        tips: [
          'Optimize images and assets to reduce bundle size.',
          'Use Firebase’s multi-environment support for staging and production.',
          'Add SEO metadata in `index.html` (e.g., `<meta name="description">`).',
          'Enable Firebase Analytics for usage tracking.'
        ]
      }
    ]
  },
  Vue: {
    steps: [
      {
        title: 'Set Up Your Vue Project',
        description: 'Create a Vue 3 project using Vite for fast builds or Vue CLI for additional configuration options. Vue’s single-file components (SFCs) simplify development for modular e-commerce apps. Ensure Node.js (version 18 or higher) is installed.',
        code: `npm install -g @vue/cli
vue create my-ecommerce
# or
npm create vite@latest my-ecommerce -- --template vue
cd my-ecommerce
npm install vue-router@4 axios
npm run dev`,
        tips: [
          'Use Vue 3 with Composition API for reactive, scalable development.',
          'Install Vue Router: `vue add router`.',
          'Add Vue Devtools browser extension for easier debugging.',
          'Use TypeScript for type safety: select TypeScript during `vue create`.'
        ]
      },
      {
        title: 'Create Product Listing and Cart Components',
        description: 'Build `ProductList` and `Cart` components using Vue’s Composition API. Fetch products from an API (e.g., Fake Store API) with `axios`. Use Vue Router for navigation and add accessibility features like ARIA labels and keyboard support.',
        code: `<!-- src/components/ProductList.vue -->
<template>
  <div class="container mx-auto p-4" role="region" aria-label="Product List">
    <h1 class="text-2xl font-bold mb-4">Products</h1>
    <p v-if="loading" class="text-center">Loading products...</p>
    <p v-if="error" class="text-center text-red-600">{{ error }}</p>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="product in products" :key="product.id" class="border p-4 rounded shadow">
        <img :src="product.image" :alt="product.title" class="h-40 w-full object-cover mb-2" />
        <h2 class="text-lg font-semibold">{{ product.title }}</h2>
        <p class="text-gray-600">\${{ product.price }}</p>
        <router-link
          :to="\`/product/\${product.id}\`"
          class="text-blue-600 hover:underline"
          :aria-label="\`View \${product.title}\`"
        >
          View Details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'ProductList',
  setup() {
    const products = ref([]);
    const loading = ref(true);
    const error = ref(null);

    onMounted(async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        products.value = response.data;
        loading.value = false;
      } catch (err) {
        error.value = 'Failed to fetch products';
        loading.value = false;
      }
    });

    return { products, loading, error };
  }
};
</script>

<!-- src/components/Cart.vue -->
<template>
  <div class="container mx-auto p-4" role="region" aria-label="Shopping Cart">
    <h1 class="text-2xl font-bold mb-4">Cart</h1>
    <div v-if="cart.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <ul v-else>
      <li v-for="item in cart" :key="item.id" class="flex items-center mb-2">
        <span class="flex-grow">{{ item.title }} - \${{ item.price }}</span>
        <button
          @click="removeFromCart(item.id)"
          class="bg-red-600 text-white p-1 rounded hover:bg-red-700"
          :aria-label="\`Remove \${item.title} from cart\`"
        >
          Remove
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'Cart',
  setup() {
    const cart = ref(JSON.parse(localStorage.getItem('cart')) || []);

    watch(cart, (newCart) => {
      localStorage.setItem('cart', JSON.stringify(newCart));
    }, { deep: true });

    const removeFromCart = (id) => {
      cart.value = cart.value.filter(item => item.id !== id);
    };

    return { cart, removeFromCart };
  }
};
</script>`,
        tips: [
          'Use Pinia for state management: `npm install pinia`.',
          "Persist cart in `localStorage` using `watch`.",
          'Add Vue’s `<transition-group>` for animated list updates.',
          'Integrate Stripe or PayPal for payment processing.'
        ]
      },
      {
        title: 'Add Styling with Tailwind',
        description: 'Integrate Tailwind CSS for responsive, utility-first styling. Use Tailwind’s grid system and responsive classes for product layouts. Configure dark mode for better accessibility.',
        code: `npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{vue,js,ts}'],
  darkMode: 'class',
  theme: { extend: {} },
  plugins: []
};

// src/assets/main.css
@tailwind base;
@tailwind components;
@tailwind utilities;`,
        tips: [
          'Use `<style scoped>` in SFCs to avoid style conflicts.',
          'Optimize Tailwind with `purge` in production to reduce bundle size.',
          'Test responsiveness with Vue’s dev server and Tailwind’s breakpoints.',
          'Add custom Tailwind utilities for reusable styles.'
        ]
      },
      {
        title: 'Deploy to Vercel',
        description: 'Deploy your Vue e-commerce app to Vercel for serverless hosting. Vercel supports Vue projects natively, offering automatic scaling and easy configuration.',
        code: `npm run build
npm install -g vercel
vercel --prod`,
        tips: [
          'Use Vercel’s CLI to preview deployments: `vercel`.',
          'Add environment variables in Vercel’s dashboard for API keys.',
          'Enable Vercel Analytics to monitor app usage.',
          'Add a custom domain for a professional URL.'
        ]
      }
    ]
  },
  Svelte: {
    steps: [
      {
        title: 'Set Up Your Svelte Project',
        description: 'Use SvelteKit to create a modern Svelte project with file-based routing and static site generation. Svelte’s compile-time reactivity simplifies development for e-commerce apps. Ensure Node.js (version 18 or higher) is installed.',
        code: `npm create svelte@latest my-ecommerce
cd my-ecommerce
npm install @sveltejs/adapter-static axios
npm run dev`,
        tips: [
          'Use `@sveltejs/adapter-static` for static site generation: `npm install @sveltejs/adapter-static`.',
          'Enable TypeScript for type safety: select TypeScript during setup.',
          'Use Svelte’s stores for reactive state management.',
          'Run `npm run check` to catch potential errors.'
        ]
      },
      {
        title: 'Create Product Listing and Cart Components',
        description: 'Build `ProductList` and `Cart` components using Svelte’s reactive syntax and writable stores. Fetch products from an API (e.g., Fake Store API) with `axios`. Use SvelteKit’s file-based routing for navigation and add accessibility features like ARIA labels and keyboard support.',
        code: `<!-- src/lib/ProductList.svelte -->
<script>
  import { onMount } from 'svelte';
  import axios from 'axios';

  let products = [];
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      products = response.data;
      loading = false;
    } catch (err) {
      error = 'Failed to fetch products';
      loading = false;
    }
  });
</script>

<div class="container mx-auto p-4" role="region" aria-label="Product List">
  <h1 class="text-2xl font-bold mb-4">Products</h1>
  {#if loading}
    <p class="text-center">Loading products...</p>
  {:else if error}
    <p class="text-center text-red-600">{error}</p>
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each products as product (product.id)}
        <div class="border p-4 rounded shadow">
          <img src={product.image} alt={product.title} class="h-40 w-full object-cover mb-2" />
          <h2 class="text-lg font-semibold">{product.title}</h2>
          <p class="text-gray-600"></p>
          <a
            href="/product/{product.id}"
            class="text-blue-600 hover:underline"
            aria-label="View {product.title}"
          >
            View Details
          </a>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  img {
    object-fit: cover;
  }
  a {
    transition: color 0.3s ease;
  }
</style>

<!-- src/lib/Cart.svelte -->
<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';

  const cart = writable(JSON.parse(localStorage.getItem('cart')) || []);

  onMount(() => {
    cart.subscribe(value => {
      localStorage.setItem('cart', JSON.stringify(value));
    });
  });

  const addToCart = (product) => {
    cart.update(current => [...current, product]);
  };

  const removeFromCart = (id) => {
    cart.update(current => current.filter(item => item.id !== id));
  };
</script>

<div class="container mx-auto p-4" role="region" aria-label="Shopping Cart">
  <h1 class="text-2xl font-bold mb-4">Cart</h1>
  {#if $cart.length === 0}
    <p>Your cart is empty.</p>
  {:else}
    <ul>
      {#each $cart as item (item.id)}
        <li class="flex items-center mb-2">
          <span class="flex-grow">{item.title} - </span>
          <button
            on:click={() => removeFromCart(item.id)}
            class="bg-red-600 text-white p-1 rounded hover:bg-red-700"
            aria-label="Remove {item.title} from cart"
          >
            Remove
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  button {
    transition: background-color 0.3s ease;
  }
</style>`,
        tips: [
          'Use Svelte’s `$:` for reactive variables in complex logic.',
          "Persist cart in `localStorage` using `cart.subscribe`.",
          'Add Svelte’s `fade` or `slide` transitions for smooth animations.',
          'Integrate a payment gateway like Stripe for checkout functionality.'
        ]
      },
      {
        title: 'Add Styling',
        description: 'Use Svelte’s scoped styles for component-specific CSS or integrate Tailwind CSS for utility-first styling. Svelte’s style encapsulation prevents conflicts, and Tailwind speeds up UI development.',
        code: `npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{svelte,js,ts}'],
  darkMode: 'class',
  theme: { extend: {} },
  plugins: []
};

// src/app.css
@tailwind base;
@tailwind components;
@tailwind utilities;`,
        tips: [
          'Use `<style>` for scoped styles or Tailwind for rapid prototyping.',
          'Optimize CSS with Tailwind’s purge option in production.',
          'Test styles with SvelteKit’s dev server for instant feedback.',
          'Add custom Tailwind utilities in `app.css` for reusability.'
        ]
      },
      {
        title: 'Deploy to Vercel',
        description: 'Deploy your Svelte e-commerce app to Vercel, which supports SvelteKit’s static and server-side rendering modes. Use the static adapter for a lightweight, fast app.',
        code: `npm run build
npm install -g vercel
vercel --prod`,
        tips: [
          'Use `@sveltejs/adapter-static` for static site generation.',
          'Configure Vercel to handle SvelteKit’s routing correctly.',
          'Add a custom domain for a professional URL.',
          'Enable Vercel Analytics to track user interactions.'
        ]
      }
    ]
  }
};

const Ecommerce = () => {
  const [selectedFramework, setSelectedFramework] = useState('React');

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`How to Build an E-commerce Website with ${selectedFramework}`, 10, 10);
    ecommerceGuides[selectedFramework].steps.forEach((step, index) => {
      const yPos = 20 + index * 70;
      doc.setFontSize(14);
      doc.text(`Step ${index + 1}: ${step.title}`, 10, yPos);
      doc.setFontSize(12);
      doc.text(step.description, 10, yPos + 10, { maxWidth: 180 });
      doc.text('Code:', 10, yPos + 25);
      doc.text(step.code, 10, yPos + 35, { maxWidth: 180 });
      doc.text('Tips:', 10, yPos + 50);
      step.tips.forEach((tip, i) => {
        doc.text(`- ${tip}`, 10, yPos + 60 + i * 5, { maxWidth: 180 });
      });
    });
    doc.save(`ecommerce-guide-${selectedFramework.toLowerCase()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
            How to Build an E-commerce Website with {selectedFramework}
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
            {ecommerceGuides[selectedFramework].steps.map((step, index) => (
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
          {ecommerceGuides[selectedFramework].steps.map((step, index) => (
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
          <p>Progress: Completed {ecommerceGuides[selectedFramework].steps.length} steps for {selectedFramework}</p>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;