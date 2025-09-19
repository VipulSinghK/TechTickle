import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { jsPDF } from 'jspdf';

const frameworks = [
  {
    name: 'React',
    category: 'Frontend',
    description: 'React is a JavaScript library for building user interfaces, particularly single-page applications, using a component-based architecture.',
    prerequisites: [
      'Basic understanding of HTML, CSS, and JavaScript (ES6+).',
      'Familiarity with Node.js and npm for package management.',
      'Knowledge of JSX syntax is helpful but not mandatory.'
    ],
    guides: [
      {
        title: 'Setting Up a React Project',
        description: 'Initialize a React project using Vite for a modern, fast development environment. Configure essential tools like ESLint, Prettier, and Tailwind CSS.',
        code: `npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm run dev`,
        tips: [
          'Use Vite for faster builds compared to Create React App.',
          'Configure ESLint and Prettier for consistent code quality: `npx eslint --init`.',
          'Set up Tailwind CSS for rapid styling: modify `tailwind.config.js` to include your content paths.',
          'Consider using TypeScript for type safety: `npm create vite@latest -- --template react-ts`.',
          'Add Husky for pre-commit linting: `npm install --save-dev husky`.'
        ]
      },
      {
        title: 'Building Components with Hooks',
        description: 'Create reusable functional components using hooks for state management and side effects. Implement routing with React Router for navigation.',
        code: `// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home count={count} setCount={setCount} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home({ count, setCount }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Counter: {count}</h1>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Increment
      </button>
    </div>
  );
}

function About() {
  return <h1 className="p-4 text-2xl font-bold">About Page</h1>;
}

export default App;`,
        tips: [
          'Use functional components with hooks over class components for simplicity.',
          'Leverage useEffect for side effects like API calls or DOM updates.',
          'Organize components in a `src/components` directory for scalability.',
          'Validate props with PropTypes or TypeScript.',
          'Use React Router’s `useNavigate` for programmatic navigation.'
        ]
      },
      {
        title: 'Advanced State Management',
        description: 'Manage complex state with Redux Toolkit for predictable state management or Context API for simpler cases. Integrate Tailwind CSS for styling.',
        code: `// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// src/store/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;

// src/App.jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store/counterSlice';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800">
      <h1 className="text-2xl font-bold">Counter: {count}</h1>
      <div className="space-x-4">
        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default App;`,
        tips: [
          'Use Redux Toolkit to reduce boilerplate code.',
          'Consider Zustand or Recoil for lightweight state management.',
          'Apply Tailwind’s utility classes for responsive designs.',
          'Test state changes with React Testing Library: `npm install --save-dev @testing-library/react`.',
          'Use Redux DevTools for debugging state.'
        ]
      },
      {
        title: 'Deploying and Optimizing a React App',
        description: 'Deploy to Vercel or Netlify with optimized production builds. Implement code splitting, lazy loading, and performance monitoring.',
        code: `// src/App.jsx
import { lazy, Suspense } from 'react';
const About = lazy(() => import('./components/About'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}

// Build and deploy
npm run build
vercel .`,
        tips: [
          'Use React.lazy and Suspense for code splitting to reduce bundle size.',
          'Optimize images with WebP or AVIF formats.',
          'Secure API keys with environment variables: `.env` files.',
          'Monitor performance with Lighthouse or Web Vitals.',
          'Set up CI/CD with Vercel or GitHub Actions.'
        ]
      }
    ],
    resources: [
      { title: 'React Official Docs', url: 'https://react.dev/' },
      { title: 'Vite Documentation', url: 'https://vitejs.dev/' },
      { title: 'Tailwind CSS Docs', url: 'https://tailwindcss.com/docs' },
      { title: 'Redux Toolkit Docs', url: 'https://redux-toolkit.js.org/' }
    ]
  },
  {
    name: 'Django',
    category: 'Backend',
    description: 'Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design, with built-in features for security and scalability.',
    prerequisites: [
      'Proficiency in Python 3.8 or higher.',
      'Basic understanding of databases (e.g., SQLite, PostgreSQL).',
      'Familiarity with HTTP methods and RESTful APIs.'
    ],
    guides: [
      {
        title: 'Setting Up a Django Project',
        description: 'Create a Django project and app, configure settings, and set up a PostgreSQL database for production-ready development.',
        code: `pip install django psycopg2-binary
django-admin startproject myproject
cd myproject
python manage.py startapp myapp
# myproject/settings.py
INSTALLED_APPS = [
    ...,
    'myapp',
    'django.contrib.admin',
]
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydb',
        'USER': 'myuser',
        'PASSWORD': 'mypassword',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
python manage.py migrate`,
        tips: [
          'Use a virtual environment: `python -m venv venv`.',
          'Set DEBUG=False in production for security.',
          'Install django-extensions for additional utilities: `pip install django-extensions`.',
          'Use PostgreSQL for better scalability than SQLite.',
          'Run `python manage.py check` to verify setup.'
        ]
      },
      {
        title: 'Creating Models and Admin Interface',
        description: 'Define models to structure your data and configure the Django admin interface for easy management.',
        code: `# myapp/models.py
from django.db import models
class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

# myapp/admin.py
from django.contrib import admin
from .models import Item
admin.site.register(Item)

# myapp/views.py
from django.shortcuts import render
from .models import Item
def item_list(request):
    items = Item.objects.all()
    return render(request, 'myapp/item_list.html', {'items': items})`,
        tips: [
          'Use Django ORM for efficient database queries.',
          'Add indexes to frequently queried fields: `index_together` in Meta.',
          'Customize admin with `list_display` and `list_filter`.',
          'Validate input with Django forms or ModelForms.',
          'Use migrations to manage schema changes: `python manage.py makemigrations`.'
        ]
      },
      {
        title: 'Building a REST API with Django REST Framework',
        description: 'Create a RESTful API with Django REST Framework to integrate with frontend applications.',
        code: `pip install djangorestframework
# myproject/settings.py
INSTALLED_APPS = [..., 'rest_framework']

# myapp/serializers.py
from rest_framework import serializers
from .models import Item
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'description', 'created_at']

# myapp/views.py
from rest_framework import viewsets
from .models import Item
from .serializers import ItemSerializer
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

# myproject/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from myapp.views import ItemViewSet
router = DefaultRouter()
router.register(r'items', ItemViewSet)
urlpatterns = [
    path('api/', include(router.urls)),
]`,
        tips: [
          'Add JWT authentication: `pip install djangorestframework-simplejwt`.',
          'Implement pagination for large datasets.',
          'Test APIs with Postman or curl.',
          'Use DRF’s browsable API for debugging.',
          'Document with drf-spectacular: `pip install drf-spectacular`.'
        ]
      },
      {
        title: 'Deploying a Django Application',
        description: 'Deploy to a cloud provider like Heroku or AWS using Gunicorn and PostgreSQL, with static file handling.',
        code: `pip install gunicorn psycopg2-binary whitenoise
# myproject/settings.py
STATIC_ROOT = 'staticfiles'
MIDDLEWARE = [..., 'whitenoise.middleware.WhiteNoiseMiddleware']

# Procfile
web: gunicorn myproject.wsgi
# Deploy to Heroku
heroku create
git push heroku main
heroku run python manage.py migrate`,
        tips: [
          'Use environment variables for sensitive data: `python-decouple`.',
          'Serve static files with WhiteNoise for simplicity.',
          'Set up CI/CD with GitHub Actions or CircleCI.',
          'Use gunicorn with multiple workers for performance.',
          'Monitor with Django Debug Toolbar in development.'
        ]
      }
    ],
    resources: [
      { title: 'Django Official Docs', url: 'https://docs.djangoproject.com/' },
      { title: 'Django REST Framework Docs', url: 'https://www.django-rest-framework.org/' },
      { title: 'Heroku Django Guide', url: 'https://devcenter.heroku.com/articles/django-app-configuration' },
      { title: 'PostgreSQL Docs', url: 'https://www.postgresql.org/docs/' }
    ]
  },
  {
    name: 'Flutter',
    category: 'Mobile',
    description: 'Flutter is Google’s UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase, known for its fast performance and expressive UI.',
    prerequisites: [
      'Basic knowledge of Dart programming language.',
      'Familiarity with mobile app development concepts.',
      'Android Studio or VS Code with Flutter SDK installed.'
    ],
    guides: [
      {
        title: 'Setting Up a Flutter Project',
        description: 'Create a Flutter project and configure the development environment for iOS and Android development.',
        code: `flutter create my_flutter_app
cd my_flutter_app
flutter pub add provider http
flutter run`,
        tips: [
          'Run `flutter doctor` to verify setup and dependencies.',
          'Use VS Code with Flutter and Dart extensions for better DX.',
          'Test on both iOS and Android emulators or physical devices.',
          'Add linting with `flutter pub add flutter_lints`.',
          'Set up version control with Git.'
        ]
      },
      {
        title: 'Building Responsive UI with Widgets',
        description: 'Design a responsive UI using Flutter’s widget system and manage state with Provider.',
        code: `// lib/main.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() => runApp(MyApp());

class Counter with ChangeNotifier {
  int _count = 0;
  int get count => _count;
  void increment() { _count++; notifyListeners(); }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => Counter(),
      child: MaterialApp(
        theme: ThemeData(primarySwatch: Colors.blue),
        home: MyHomePage(),
      ),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Flutter App')),
      body: Center(
        child: Consumer<Counter>(
          builder: (context, counter, _) => Text(
            'Count: $',
            style: TextStyle(fontSize: 24),
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Provider.of<Counter>(context, listen: false).increment(),
        child: Icon(Icons.add),
      ),
    );
  }
}`,
        tips: [
          'Use StatelessWidget for static UI and StatefulWidget for dynamic UI.',
          'Leverage Provider or Riverpod for state management.',
          'Add animations with AnimatedContainer or Hero widgets.',
          'Use LayoutBuilder for responsive designs.',
          'Test UI with `flutter test`.'
        ]
      },
      {
        title: 'Networking and API Integration',
        description: 'Fetch data from REST APIs using the HTTP package and display it in the UI with proper error handling.',
        code: `// lib/services/api_service.dart
import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  Future<List> fetchData() async {
    try {
      final response = await http.get(Uri.parse('https://api.example.com/data'));
      if (response.statusCode == 200) {
        return json.decode(response.body);
      }
      throw Exception('Failed to load data');
    } catch (e) {
      throw Exception('Error: $e');
    }
  }
}

// lib/main.dart
import 'package:flutter/material.dart';
import 'services/api_service.dart';

class MyHomePage extends StatelessWidget {
  final ApiService api = ApiService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('API Data')),
      body: FutureBuilder(
        future: api.fetchData(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return ListView.builder(
              itemCount: snapshot.data.length,
              itemBuilder: (context, index) => ListTile(
                title: Text(snapshot.data[index]['name']),
              ),
            );
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: $'));
          }
          return Center(child: CircularProgressIndicator());
        },
      ),
    );
  }
}`,
        tips: [
          'Handle errors with try-catch and display user-friendly messages.',
          'Cache responses with `shared_preferences` for offline support.',
          'Use Dio for advanced HTTP requests: `flutter pub add dio`.',
          'Mock APIs with packages like `mockito` for testing.',
          'Add retry logic for failed requests.'
        ]
      },
      {
        title: 'Deploying a Flutter Application',
        description: 'Build and publish your Flutter app to Google Play and App Store with proper configuration.',
        code: `flutter pub add flutter_launcher_icons
flutter build apk --release
flutter build ios --release
# Update pubspec.yaml for icons
flutter_launcher_icons:
  android: true
  ios: true
  image_path: "assets/icon/icon.png"`,
        tips: [
          'Use Codemagic or Fastlane for automated CI/CD.',
          'Generate app icons with `flutter_launcher_icons`.',
          'Test with TestFlight for iOS and Play Console for Android.',
          'Follow store guidelines for privacy and permissions.',
          'Optimize app size with `flutter build apk --split-per-abi`.'
        ]
      }
    ],
    resources: [
      { title: 'Flutter Official Docs', url: 'https://docs.flutter.dev/' },
      { title: 'Dart Language Docs', url: 'https://dart.dev/guides' },
      { title: 'Provider Package Docs', url: 'https://pub.dev/packages/provider' },
      { title: 'Codemagic CI/CD', url: 'https://codemagic.io/' }
    ]
  },
  {
    name: 'TensorFlow',
    category: 'Machine Learning',
    description: 'TensorFlow is an open-source machine learning framework for building, training, and deploying ML models, supporting deep learning and more.',
    prerequisites: [
      'Proficiency in Python 3.7 or higher.',
      'Basic understanding of machine learning concepts (e.g., neural networks).',
      'Familiarity with NumPy and Pandas for data manipulation.'
    ],
    guides: [
      {
        title: 'Setting Up TensorFlow Environment',
        description: 'Install TensorFlow and prepare datasets for training with TensorFlow Datasets.',
        code: `pip install tensorflow tensorflow-datasets
import tensorflow as tf
import tensorflow_datasets as tfds

(ds_train, ds_test), ds_info = tfds.load(
    'cifar10',
    split=['train', 'test'],
    as_supervised=True,
    with_info=True
)

def normalize_img(image, label):
    return tf.cast(image, tf.float32) / 255.0, label

ds_train = ds_train.map(normalize_img).batch(32)
ds_test = ds_test.map(normalize_img).batch(32)`,
        tips: [
          'Use a GPU-enabled TensorFlow for faster training: `pip install tensorflow-gpu`.',
          'Verify installation with `tf.__version__`.',
          'Use TensorFlow Datasets for quick data access.',
          'Create a virtual environment: `python -m venv tf_env`.',
          'Install Jupyter for interactive experimentation.'
        ]
      },
      {
        title: 'Building a Convolutional Neural Network',
        description: 'Design and train a CNN for image classification with data augmentation.',
        code: `import tensorflow as tf
from tensorflow.keras import layers, models

model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(ds_train, epochs=15, validation_data=ds_test)`,
        tips: [
          'Add Dropout layers to prevent overfitting.',
          'Use data augmentation with `tf.keras.preprocessing.image.ImageDataGenerator`.',
          'Monitor training with TensorBoard: `tensorboard --logdir logs`.',
          'Validate model performance with test data.',
          'Experiment with batch sizes (e.g., 32, 64).'
        ]
      },
      {
        title: 'Hyperparameter Tuning and Evaluation',
        description: 'Evaluate model performance and tune hyperparameters using Keras Tuner.',
        code: `import tensorflow as tf
from tensorflow import keras
import keras_tuner as kt

test_loss, test_acc = model.evaluate(ds_test)
print(f"Test accuracy: {test_acc}")

def build_model(hp):
    model = keras.Sequential()
    model.add(layers.Conv2D(
        filters=hp.Int('filters', 32, 128, step=32),
        kernel_size=(3, 3),
        activation='relu',
        input_shape=(32, 32, 3)
    ))
    model.add(layers.MaxPooling2D((2, 2)))
    model.add(layers.Flatten())
    model.add(layers.Dense(
        units=hp.Int('units', 64, 256, step=32),
        activation='relu'
    ))
    model.add(layers.Dense(10, activation='softmax'))
    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    return model

tuner = kt.Hyperband(
    build_model,
    objective='val_accuracy',
    max_epochs=10,
    directory='tuner',
    project_name='cifar10'
)
tuner.search(ds_train, validation_data=ds_test, epochs=10)`,
        tips: [
          'Use k-fold cross-validation for robust evaluation.',
          'Experiment with learning rates using `hp.Float`.',
          'Save model checkpoints with `ModelCheckpoint`.',
          'Analyze performance with confusion matrix.',
          'Use early stopping to prevent overfitting.'
        ]
      },
      {
        title: 'Deploying TensorFlow Models',
        description: 'Save and deploy models for inference, including conversion to TensorFlow Lite for mobile deployment.',
        code: `model.save('tf_model')
# Convert to TFLite
converter = tf.lite.TFLiteConverter.from_saved_model('tf_model')
converter.optimizations = [tf.lite.Optimize.DEFAULT]
tflite_model = converter.convert()
with open('model.tflite', 'wb') as f:
    f.write(tflite_model)

# Load TFLite model for inference
interpreter = tf.lite.Interpreter(model_path='model.tflite')
interpreter.allocate_tensors()`,
        tips: [
          'Use TensorFlow Serving for REST API deployment.',
          'Apply quantization to reduce model size.',
          'Deploy to mobile with TFLite for iOS/Android.',
          'Monitor model drift in production.',
          'Test inference with sample inputs.'
        ]
      }
    ],
    resources: [
      { title: 'TensorFlow Official Docs', url: 'https://www.tensorflow.org/guide' },
      { title: 'TensorFlow Datasets', url: 'https://www.tensorflow.org/datasets' },
      { title: 'Keras Tuner Docs', url: 'https://keras.io/keras_tuner/' },
      { title: 'TensorFlow Serving', url: 'https://www.tensorflow.org/tfx/guide/serving' }
    ]
  },
  {
    name: 'Node.js',
    category: 'Backend',
    description: 'Node.js is a JavaScript runtime built on Chrome’s V8 engine, ideal for building scalable, event-driven backend applications.',
    prerequisites: [
      'Proficiency in JavaScript (ES6+).',
      'Understanding of asynchronous programming (Promises, async/await).',
      'Basic knowledge of HTTP protocols and APIs.'
    ],
    guides: [
      {
        title: 'Setting Up a Node.js Project',
        description: 'Initialize a Node.js project, install Express, and set up a basic server.',
        code: `npm init -y
npm install express
// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Node.js!');
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});`,
        tips: [
          'Use `nodemon` for auto-reloading: `npm install --save-dev nodemon`.',
          'Set up ESLint for code quality: `npm install --save-dev eslint`.',
          'Use environment variables with `dotenv`: `npm install dotenv`.',
          'Structure your project with separate routes and controllers.',
          'Test setup with `curl http://localhost:3000`.'
        ]
      },
      {
        title: 'Building RESTful APIs with Express',
        description: 'Create RESTful endpoints to handle CRUD operations with a simple in-memory data store.',
        code: `// server.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let items = [];

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const item = { id: items.length + 1, ...req.body };
  items.push(item);
  res.status(201).json(item);
});

app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  Object.assign(item, req.body);
  res.json(item);
});

app.delete('/items/:id', (req, res) => {
  items = items.filter(i => i.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});`,
        tips: [
          'Use middleware for authentication and logging.',
          'Validate inputs with `express-validator`.',
          'Test endpoints with Postman or Jest.',
          'Connect to MongoDB with Mongoose for persistence.',
          'Use async/await for cleaner async code.'
        ]
      },
      {
        title: 'Connecting to a Database',
        description: 'Integrate MongoDB with Mongoose for persistent data storage.',
        code: `npm install mongoose
// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});
const Item = mongoose.model('Item', itemSchema);

app.use(express.json());

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/items', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.status(201).json(item);
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});`,
        tips: [
          'Use MongoDB Atlas for cloud-hosted databases.',
          'Handle connection errors gracefully.',
          'Add indexes to improve query performance.',
          'Use environment variables for database credentials.',
          'Test database operations with `jest` or `supertest`.'
        ]
      },
      {
        title: 'Deploying a Node.js Application',
        description: 'Deploy to a cloud platform like Render or Heroku with production optimizations.',
        code: `npm install pm2
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'myapp',
    script: 'server.js',
    env: {
      NODE_ENV: 'production',
    },
  }],
};
// Deploy to Render
npm run build
git push render main`,
        tips: [
          'Use PM2 for process management: `npm install pm2`.',
          'Set up environment variables for production.',
          'Optimize with clustering for multi-core usage.',
          'Monitor with New Relic or Winston logging.',
          'Use a reverse proxy like Nginx for load balancing.'
        ]
      }
    ],
    resources: [
      { title: 'Node.js Official Docs', url: 'https://nodejs.org/en/docs/' },
      { title: 'Express.js Docs', url: 'https://expressjs.com/' },
      { title: 'Mongoose Docs', url: 'https://mongoosejs.com/docs/' },
      { title: 'Render Deployment Guide', url: 'https://render.com/docs/deploy-node-express-app' }
    ]
  },
  {
    name: 'PyTorch',
    category: 'Machine Learning',
    description: 'PyTorch is an open-source machine learning framework known for its flexibility and dynamic computation graphs, ideal for research and production.',
    prerequisites: [
      'Proficiency in Python 3.7 or higher.',
      'Understanding of machine learning concepts (e.g., neural networks, gradients).',
      'Familiarity with NumPy for numerical operations.'
    ],
    guides: [
      {
        title: 'Setting Up PyTorch',
        description: 'Install PyTorch and prepare a dataset using torchvision for computer vision tasks.',
        code: `pip install torch torchvision
import torch
import torchvision
import torchvision.transforms as transforms

transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

trainset = torchvision.datasets.CIFAR10(root='./data', train=True, download=True, transform=transform)
trainloader = torch.utils.data.DataLoader(trainset, batch_size=32, shuffle=True)`,
        tips: [
          'Use GPU support: `pip install torch --index-url https://download.pytorch.org/whl/cu118`.',
          'Verify installation with `torch.__version__`.',
          'Use torchvision for pre-built datasets and models.',
          'Create a virtual environment: `python -m venv torch_env`.',
          'Install Jupyter for interactive development.'
        ]
      },
      {
        title: 'Building a Neural Network',
        description: 'Create and train a convolutional neural network for image classification.',
        code: `import torch
import torch.nn as nn
import torch.optim as optim

class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.conv1 = nn.Conv2d(3, 32, 3)
        self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(32, 64, 3)
        self.fc1 = nn.Linear(64 * 6 * 6, 128)
        self.fc2 = nn.Linear(128, 10)
    
    def forward(self, x):
        x = self.pool(torch.relu(self.conv1(x)))
        x = self.pool(torch.relu(self.conv2(x)))
        x = x.view(-1, 64 * 6 * 6)
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

net = Net()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(net.parameters(), lr=0.001)

for epoch in range(10):
    for i, data in enumerate(trainloader, 0):
        inputs, labels = data
        optimizer.zero_grad()
        outputs = net(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()`,
        tips: [
          'Add dropout layers to prevent overfitting: `nn.Dropout(0.5)`.',
          'Use data augmentation with `torchvision.transforms`.',
          'Monitor training with torch.utils.tensorboard.',
          'Save intermediate models with `torch.save`.',
          'Use CUDA for GPU acceleration: `net.to()`.'
        ]
      },
      {
        title: 'Evaluating and Fine-Tuning Models',
        description: 'Evaluate model performance and fine-tune hyperparameters using grid search.',
        code: `testset = torchvision.datasets.CIFAR10(root='./data', train=False, download=True, transform=transform)
testloader = torch.utils.data.DataLoader(testset, batch_size=32, shuffle=False)

correct = 0
total = 0
with torch.no_grad():
    for data in testloader:
        images, labels = data
        outputs = net(images)
        _, predicted = torch.max(outputs.data, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()

print(f'Accuracy: {100 * correct / total}%')

# Grid search example
learning_rates = [0.001, 0.0001]
for lr in learning_rates:
    optimizer = optim.Adam(net.parameters(), lr=lr)
    # Train and evaluate
`,
        tips: [
          'Use k-fold cross-validation for robust evaluation.',
          'Experiment with learning rates and batch sizes.',
          'Save checkpoints with `torch.save(net.state_dict())`.',
          'Visualize performance with confusion matrix.',
          'Use early stopping to avoid overfitting.'
        ]
      },
      {
        title: 'Deploying PyTorch Models',
        description: 'Save and deploy models using TorchScript for production environments.',
        code: `torch.save(net.state_dict(), 'model.pth')

# Convert to TorchScript
scripted_model = torch.jit.script(net)
scripted_model.save('model_scripted.pt')

# Load and use for inference
loaded_model = torch.jit.load('model_scripted.pt')
loaded_model.eval()

# Example inference
with torch.no_grad():
    sample_input = torch.randn(1, 3, 32, 32)
    output = loaded_model(sample_input)`,
        tips: [
          'Use TorchServe for scalable model serving.',
          'Optimize models with quantization for mobile deployment.',
          'Test inference with ONNX format for cross-platform use.',
          'Monitor model performance in production.',
          'Use Docker for consistent deployment environments.'
        ]
      }
    ],
    resources: [
      { title: 'PyTorch Official Docs', url: 'https://pytorch.org/docs/stable/index.html' },
      { title: 'Torchvision Docs', url: 'https://pytorch.org/vision/stable/index.html' },
      { title: 'TorchServe Docs', url: 'https://pytorch.org/serve/' },
      { title: 'PyTorch Tutorials', url: 'https://pytorch.org/tutorials/' }
    ]
  }
];

const DocsandGuide = () => {
  const [selectedFramework, setSelectedFramework] = useState('React');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', ...new Set(frameworks.map(f => f.category))];

  const filteredFrameworks = categoryFilter === 'All'
    ? frameworks
    : frameworks.filter(f => f.category === categoryFilter);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Guide to Building with ${selectedFramework}`, 10, 10);
    const framework = frameworks.find(f => f.name === selectedFramework);
    
    // Add prerequisites
    doc.setFontSize(14);
    doc.text('Prerequisites', 10, 20);
    doc.setFontSize(12);
    framework.prerequisites.forEach((prereq, index) => {
      doc.text(`- ${prereq}`, 10, 30 + index * 10, { maxWidth: 180 });
    });

    // Add guides
    framework.guides.forEach((guide, index) => {
      const yPos = 30 + framework.prerequisites.length * 10 + index * 70;
      doc.setFontSize(14);
      doc.text(`Step ${index + 1}: ${guide.title}`, 10, yPos);
      doc.setFontSize(12);
      doc.text(guide.description, 10, yPos + 10, { maxWidth: 180 });
      doc.text('Code:', 10, yPos + 25);
      doc.text(guide.code, 10, yPos + 35, { maxWidth: 180 });
      doc.text('Tips:', 10, yPos + 50);
      guide.tips.forEach((tip, i) => {
        doc.text(`- ${tip}`, 10, yPos + 60 + i * 5, { maxWidth: 180 });
      });
    });

    // Add resources
    const yPosResources = 30 + framework.prerequisites.length * 10 + framework.guides.length * 70;
    doc.setFontSize(14);
    doc.text('Additional Resources', 10, yPosResources);
    doc.setFontSize(12);
    framework.resources.forEach((resource, index) => {
      doc.text(`${resource.title}: ${resource.url}`, 10, yPosResources + 10 + index * 10, { maxWidth: 180 });
    });

    doc.save(`framework-guide-${selectedFramework.toLowerCase().replace(/ /g, '-')}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto p-6">
        {/* === Header Section === */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Framework Documentation and Guides
          </h1>
          <button
            onClick={downloadPDF}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>

        {/* === Category Filter === */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Filter by Category</h3>
          <div className="flex space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded ${
                  categoryFilter === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-400 text-white hover:bg-blue-500'
                }`}
                onClick={() => {
                  setCategoryFilter(category);
                  if (category !== 'All' && !filteredFrameworks.some(f => f.name === selectedFramework)) {
                    setSelectedFramework(filteredFrameworks[0]?.name || 'React');
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* === Framework Selection === */}
        <div className="flex space-x-4 mb-6">
          {filteredFrameworks.map((framework) => (
            <button
              key={framework.name}
              className={`px-4 py-2 rounded ${
                selectedFramework === framework.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-400 text-white hover:bg-blue-500'
              }`}
              onClick={() => setSelectedFramework(framework.name)}
            >
              {framework.name}
            </button>
          ))}
        </div>

        {/* === Framework Description === */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            {selectedFramework}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {frameworks.find(f => f.name === selectedFramework)?.description}
          </p>
        </div>

        {/* === Prerequisites === */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Prerequisites</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            {frameworks.find(f => f.name === selectedFramework)?.prerequisites.map((prereq, index) => (
              <li key={index}>{prereq}</li>
            ))}
          </ul>
        </div>

        {/* === Table of Contents === */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            {frameworks.find(f => f.name === selectedFramework)?.guides.map((guide, index) => (
              <li key={index}>
                <a
                  href={`#step-${index + 1}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Step {index + 1}: {guide.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* === Guides === */}
        <div className="space-y-8">
          {frameworks.find(f => f.name === selectedFramework)?.guides.map((guide, index) => (
            <div
              key={index}
              id={`step-${index + 1}`}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                Step {index + 1}: {guide.title}
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">{guide.description}</p>
              <SyntaxHighlighter
                language={['Django', 'TensorFlow', 'PyTorch'].includes(selectedFramework) ? 'python' : 'javascript'}
                style={vscDarkPlus}
              >
                {guide.code}
              </SyntaxHighlighter>
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Tips</h4>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                  {guide.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* === Additional Resources === */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Additional Resources</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            {frameworks.find(f => f.name === selectedFramework)?.resources.map((resource, index) => (
              <li key={index}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {resource.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* === Progress === */}
        <div className="mt-6 text-gray-700 dark:text-gray-300">
          <p>Progress: Completed {frameworks.find(f => f.name === selectedFramework)?.guides.length} steps for {selectedFramework}</p>
        </div>
      </div>
    </div>
  );
};

export default DocsandGuide;