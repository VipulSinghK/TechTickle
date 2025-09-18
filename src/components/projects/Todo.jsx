import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom';

const frameworks = ['React', 'Angular', 'Vue', 'Svelte'];

const todoGuides = {
  React: {
    steps: [
      {
        title: 'Set Up Your React Project',
        description: 'Initialize a React project using Vite for a fast and modern development experience. Vite’s lightweight build system and hot module replacement (HMR) make it ideal for a Todo app. Ensure Node.js (version 18 or higher) is installed to avoid compatibility issues. This step sets up the project structure, including a basic `src` folder with an entry point (`main.jsx`) and a root component (`App.jsx`).',
        code: `npm create vite@latest my-todo-app -- --template react
cd my-todo-app
npm install
npm run dev`,
        tips: [
          'Choose Vite over Create React App for faster builds and better developer experience.',
          'Create a `.gitignore` file to exclude `node_modules`, `dist`, and `.env` files.',
          'Install ESLint and Prettier for code quality: `npm install --save-dev eslint prettier eslint-config-prettier`.',
          'Use `npm init -y` to quickly generate a `package.json` if starting from scratch.'
        ]
      },
      {
        title: 'Create the Todo Component',
        description: 'Develop a `Todo` component to manage the task list, including adding, toggling, and deleting tasks. Use React’s `useState` hook for local state management, which is sufficient for a simple Todo app. Structure the component to include an input field for new tasks, a submit button, and a list to display tasks with completion and deletion options. Ensure accessibility by adding keyboard support and ARIA attributes.',
        code: `// src/components/Todo.jsx
import React, { useState, useEffect } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container mx-auto p-4" role="region" aria-label="Todo List">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          className="border p-2 flex-grow rounded-l"
          placeholder="Add a new task"
          aria-label="New task input"
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white p-2 rounded-r hover:bg-blue-700"
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center mb-2">
            <span
              onClick={() => toggleTodo(todo.id)}
              className={\`flex-grow cursor-pointer \${todo.completed ? 'line-through text-gray-500' : ''}\`}
              aria-label={\`Toggle \${todo.text} completion\`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
              aria-label={\`Delete \${todo.text}\`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;`,
        tips: [
          'Use `useReducer` for complex state logic in larger applications.',
          "Persist todos in `localStorage` for data retention: `localStorage.setItem('todos', JSON.stringify(todos))`.",
          'Add keyboard support (e.g., Enter key to add todos) and ARIA attributes for accessibility.',
          'Consider using a state management library like Redux Toolkit for scalable apps.'
        ]
      },
      {
        title: 'Style with Tailwind CSS',
        description: 'Integrate Tailwind CSS for a responsive, utility-first design. Tailwind’s classes simplify styling for inputs, buttons, and task lists, ensuring a polished UI. Configure Tailwind to purge unused styles in production for optimal performance. Add dark mode support for better user experience in low-light environments.',
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
          'Enable dark mode by setting `darkMode: "class"` in `tailwind.config.js`.',
          'Use Tailwind’s `hover`, `focus`, and `active` utilities for interactive elements.',
          'Test responsiveness with Tailwind’s breakpoints (e.g., `sm:`, `md:`, `lg:`).',
          'Add custom Tailwind utilities in `index.css` for reusable styles.'
        ]
      },
      {
        title: 'Deploy to Netlify',
        description: 'Deploy your Todo app to Netlify for free, reliable hosting with continuous deployment. Ensure the build output (`dist` folder for Vite) is optimized. Netlify supports custom domains, HTTPS, and environment variables for configuration.',
        code: `npm run build
npm install -g netlify-cli
netlify deploy --prod --dir=dist`,
        tips: [
          'Connect your GitHub repository to Netlify for automatic deployments on push.',
          'Use Netlify’s environment variables for API keys or sensitive data.',
          'Add a `netlify.toml` file to customize build settings.',
          'Include a `robots.txt` and meta tags for SEO optimization.'
        ]
      }
    ]
  },
  Angular: {
    steps: [
      {
        title: 'Set Up Your Angular Project',
        description: 'Use Angular CLI to create a structured project with TypeScript, routing, and SCSS. Angular’s opinionated setup is ideal for building a robust Todo app with built-in tools for testing and linting. Ensure Node.js (version 18 or higher) and Angular CLI are installed globally.',
        code: `npm install -g @angular/cli
ng new my-todo-app --style=scss --routing
cd my-todo-app
ng serve`,
        tips: [
          'Use `--style=scss` for modular, reusable styles.',
          'Enable strict mode in `tsconfig.json` for type safety.',
          'Run `ng lint` and `ng test` to ensure code quality.',
          'Add Angular Material for pre-built UI components: `ng add @angular/material`.'
        ]
      },
      {
        title: 'Create the Todo Component and Service',
        description: 'Generate a `Todo` component for the UI and a `TodoService` for state management. Use RxJS for reactive state updates and Angular’s two-way binding for the input. Organize components in `src/app/components/` and services in `src/app/services/`.',
        code: `ng generate component components/todo
ng generate service services/todo

// src/app/services/todo.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todos.asObservable();

  addTodo(text: string) {
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    this.todos.next([...this.todos.getValue(), newTodo]);
  }

  toggleTodo(id: number) {
    this.todos.next(
      this.todos.getValue().map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  deleteTodo(id: number) {
    this.todos.next(this.todos.getValue().filter(todo => todo.id !== id));
  }
}

// src/app/components/todo/todo.component.ts
import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule],
  template: \`
    <div class="container mx-auto p-4" role="region" aria-label="Todo List">
      <h1 class="text-2xl font-bold mb-4">Todo App</h1>
      <div class="flex mb-4">
        <input
          [(ngModel)]="input"
          (keyup.enter)="addTodo()"
          class="border p-2 flex-grow rounded-l"
          placeholder="Add a new task"
          aria-label="New task input"
        />
        <button
          (click)="addTodo()"
          class="bg-blue-600 text-white p-2 rounded-r hover:bg-blue-700"
        >
          Add
        </button>
      </div>
      <ul>
        <li *ngFor="let todo of todos$ | async" class="flex items-center mb-2">
          <span
            (click)="toggleTodo(todo.id)"
            [ngClass]="{'line-through text-gray-500': todo.completed}"
            class="flex-grow cursor-pointer"
            [attr.aria-label]="'Toggle ' + todo.text + ' completion'"
          >
            {{ todo.text }}
          </span>
          <button
            (click)="deleteTodo(todo.id)"
            class="bg-red-600 text-white p-1 rounded hover:bg-red-700"
            [attr.aria-label]="'Delete ' + todo.text"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  \`
})
export class TodoComponent {
  input = '';
  todos$ = this.todoService.todos$;

  constructor(private todoService: TodoService) {}

  addTodo() {
    if (this.input.trim()) {
      this.todoService.addTodo(this.input);
      this.input = '';
    }
  }

  toggleTodo(id: number) {
    this.todoService.toggleTodo(id);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }
}`,
        tips: [
          'Add `FormsModule` to `app.module.ts` or use standalone components for `ngModel`.',
          "Persist todos in `localStorage` using `localStorage.setItem('todos', JSON.stringify(this.todos.getValue()))`.",
          'Use RxJS operators like `map` or `filter` for advanced state transformations.',
          'Add Angular animations for smooth transitions when adding/deleting todos.'
        ]
      },
      {
        title: 'Add Styling with SCSS',
        description: 'Use SCSS for component-specific, encapsulated styles. Angular’s style isolation ensures no CSS leaks. Optionally, integrate Tailwind CSS for utility-first styling. Add transitions for a polished user experience.',
        code: `/* src/app/components/todo/todo.component.scss */
.container {
  max-width: 1200px;
  margin: 0 auto;
}

input {
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
}

button {
  transition: background-color 0.3s ease;
}

.line-through {
  text-decoration: line-through;
  color: #6b7280;
}`,
        tips: [
          'Use `:host` to style the component’s root element.',
          'Define SCSS variables (e.g., `$primary-color: #1e40af`) for theming.',
          'Test styles in multiple browsers for consistency.',
          'Consider Angular Material for pre-styled components.'
        ]
      },
      {
        title: 'Deploy to Firebase',
        description: 'Deploy your Angular Todo app to Firebase Hosting for reliable, scalable hosting. Angular’s production build (`ng build --prod`) optimizes the app for performance. Firebase supports custom domains and automatic SSL.',
        code: `ng build --prod
npm install -g firebase-tools
firebase init hosting
firebase deploy`,
        tips: [
          'Optimize assets (e.g., images, fonts) to reduce bundle size.',
          'Use Firebase’s multi-environment support for staging and production.',
          'Add SEO metadata (e.g., `<meta name="description">`) in `index.html`.',
          'Enable Firebase Analytics for usage tracking.'
        ]
      }
    ]
  },
  Vue: {
    steps: [
      {
        title: 'Set Up Your Vue Project',
        description: 'Create a Vue 3 project using Vite for fast builds or Vue CLI for more configuration options. Vue’s single-file components (SFCs) simplify development by combining HTML, JavaScript, and CSS. Ensure Node.js (version 18 or higher) is installed.',
        code: `npm install -g @vue/cli
vue create my-todo-app
# or
npm create vite@latest my-todo-app -- --template vue
cd my-todo-app
npm install
npm run dev`,
        tips: [
          'Use Vue 3 with Composition API for modern, reactive development.',
          'Install Vue Router for navigation: `vue add router`.',
          'Add Vue Devtools browser extension for easier debugging.',
          'Use TypeScript for type safety: select TypeScript during `vue create`.'
        ]
      },
      {
        title: 'Create the Todo Component',
        description: 'Build a `Todo` component using Vue’s Composition API for reactive state management. Implement an input for adding tasks, and buttons for toggling and deleting them. Use Vue Router for navigation if needed. Add accessibility features like ARIA labels.',
        code: `<!-- src/components/Todo.vue -->
<template>
  <div class="container mx-auto p-4" role="region" aria-label="Todo List">
    <h1 class="text-2xl font-bold mb-4">Todo App</h1>
    <div class="flex mb-4">
      <input
        v-model="input"
        @keyup.enter="addTodo"
        class="border p-2 flex-grow rounded-l"
        placeholder="Add a new task"
        aria-label="New task input"
      />
      <button
        @click="addTodo"
        class="bg-blue-600 text-white p-2 rounded-r hover:bg-blue-700"
      >
        Add
      </button>
    </div>
    <ul>
      <li v-for="todo in todos" :key="todo.id" class="flex items-center mb-2">
        <span
          @click="toggleTodo(todo.id)"
          :class="{ 'line-through text-gray-500': todo.completed }"
          class="flex-grow cursor-pointer"
          :aria-label="'Toggle ' + todo.text + ' completion'"
        >
          {{ todo.text }}
        </span>
        <button
          @click="deleteTodo(todo.id)"
          class="bg-red-600 text-white p-1 rounded hover:bg-red-700"
          :aria-label="'Delete ' + todo.text"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'Todo',
  setup() {
    const todos = ref(JSON.parse(localStorage.getItem('todos')) || []);
    const input = ref('');

    watch(todos, (newTodos) => {
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }, { deep: true });

    const addTodo = () => {
      if (input.value.trim()) {
        todos.value.push({ id: Date.now(), text: input.value, completed: false });
        input.value = '';
      }
    };

    const toggleTodo = (id) => {
      todos.value = todos.value.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    };

    const deleteTodo = (id) => {
      todos.value = todos.value.filter(todo => todo.id !== id);
    };

    return { todos, input, addTodo, toggleTodo, deleteTodo };
  }
};
</script>`,
        tips: [
          'Use Pinia for state management in larger apps: `npm install pinia`.',
          'Persist todos in `localStorage` using `watch` for reactivity.',
          'Add Vue’s transition-group for animated list updates.',
          'Ensure accessibility with ARIA attributes and keyboard support.'
        ]
      },
      {
        title: 'Add Styling with Tailwind',
        description: 'Integrate Tailwind CSS for responsive, utility-first styling. Configure Tailwind to work with Vue’s single-file components. Add transitions and hover effects for a polished UI.',
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
        description: 'Deploy your Vue Todo app to Vercel for serverless hosting. Vercel supports Vue projects natively, offering automatic scaling and easy configuration.',
        code: `npm run build
npm install -g vercel
vercel --prod`,
        tips: [
          'Use Vercel’s CLI to preview deployments: `vercel`.',
          'Add environment variables in Vercel’s dashboard for configuration.',
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
        description: 'Use SvelteKit to create a modern Svelte project with file-based routing and static site generation. Svelte’s compile-time reactivity simplifies development for a Todo app. Ensure Node.js (version 18 or higher) is installed.',
        code: `npm create svelte@latest my-todo-app
cd my-todo-app
npm install
npm run dev`,
        tips: [
          'Use `@sveltejs/adapter-static` for static site generation: `npm install @sveltejs/adapter-static`.',
          'Enable TypeScript for type safety: select TypeScript during setup.',
          'Use Svelte’s stores for reactive state management.',
          'Run `npm run check` to catch potential errors.'
        ]
      },
      {
        title: 'Create the Todo Component',
        description: 'Build a `Todo` component using Svelte’s reactive syntax and writable stores. Store components in `src/lib` for reusability. Implement add, toggle, and delete functionality with accessibility features like ARIA labels and keyboard support.',
        code: `<!-- src/lib/Todo.svelte -->
<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';

  const todos = writable(JSON.parse(localStorage.getItem('todos')) || []);
  let input = '';

  onMount(() => {
    todos.subscribe(value => {
      localStorage.setItem('todos', JSON.stringify(value));
    });
  });

  const addTodo = () => {
    if (input.trim()) {
      todos.update(current => [
        ...current,
        { id: Date.now(), text: input, completed: false }
      ]);
      input = '';
    }
  };

  const toggleTodo = (id) => {
    todos.update(current =>
      current.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    todos.update(current => current.filter(todo => todo.id !== id));
  };
</script>

<div class="container mx-auto p-4" role="region" aria-label="Todo List">
  <h1 class="text-2xl font-bold mb-4">Todo App</h1>
  <div class="flex mb-4">
    <input
      bind:value={input}
      on:keyup={e => e.key === 'Enter' && addTodo()}
      class="border p-2 flex-grow rounded-l"
      placeholder="Add a new task"
      aria-label="New task input"
    />
    <button
      on:click={addTodo}
      class="bg-blue-600 text-white p-2 rounded-r hover:bg-blue-700"
    >
      Add
    </button>
  </div>
  <ul>
    {#each $todos as todo (todo.id)}
      <li class="flex items-center mb-2">
        <span
          on:click={() => toggleTodo(todo.id)}
          class="{todo.completed ? 'line-through text-gray-500' : ''} flex-grow cursor-pointer"
          aria-label="Toggle {todo.text} completion"
        >
          {todo.text}
        </span>
        <button
          on:click={() => deleteTodo(todo.id)}
          class="bg-red-600 text-white p-1 rounded hover:bg-red-700"
          aria-label="Delete {todo.text}"
        >
          Delete
        </button>
      </li>
    {/each}
  </ul>
</div>

<style>
  input {
    border: 1px solid #ccc;
  }
  button {
    transition: background-color 0.3s ease;
  }
</style>`,
        tips: [
          'Use Svelte’s `$:` for reactive variables in complex logic.',
          "Persist todos in `localStorage` using `todos.subscribe`.",
          'Add Svelte’s built-in transitions (e.g., `fade`) for smooth animations.',
          'Ensure accessibility with ARIA labels and keyboard navigation.'
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
        description: 'Deploy your Svelte Todo app to Vercel, which supports SvelteKit’s static and server-side rendering modes. Use the static adapter for a lightweight, fast Todo app.',
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

const Todo = () => {
  const [selectedFramework, setSelectedFramework] = useState('React');

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`How to Build a Todo App with ${selectedFramework}`, 10, 10);
    todoGuides[selectedFramework].steps.forEach((step, index) => {
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
    doc.save(`todo-guide-${selectedFramework.toLowerCase()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
            How to Build a Todo App with {selectedFramework}
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
            {todoGuides[selectedFramework].steps.map((step, index) => (
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
          {todoGuides[selectedFramework].steps.map((step, index) => (
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
          <p>Progress: Completed {todoGuides[selectedFramework].steps.length} steps for {selectedFramework}</p>
        </div>
      </div>
    </div>
  );
};

export default Todo;