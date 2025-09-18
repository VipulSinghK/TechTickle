import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { jsPDF } from 'jspdf';

const frameworks = [
  {
    name: 'React',
    category: 'Frontend',
    description: 'React is a JavaScript library for building user interfaces, particularly single-page applications, using a component-based architecture.',
    guides: [
      {
        title: 'Setting Up a React Project',
        description: 'Initialize a React project using Create React App or Vite for a modern development environment. Install necessary dependencies and configure the project structure.',
        code: `npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev`,
        tips: [
          'Use Vite for faster builds compared to Create React App.',
          'Install ESLint and Prettier for code quality: `npm install --save-dev eslint prettier`.',
          'Set up Tailwind CSS for rapid styling: `npm install -D tailwindcss`.',
          'Use TypeScript for type safety: select TypeScript template during setup.'
        ]
      },
      {
        title: 'Building Components',
        description: 'Create reusable components with hooks for state and side effects. Implement routing with React Router for navigation.',
        code: `// src/App.jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home count={count} setCount={setCount} />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home({ count, setCount }) {
  return (
    <div className="p-4">
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)} className="px-4 py-2 bg-blue-500 text-white rounded">
        Increment
      </button>
    </div>
  );
}

export default App;`,
        tips: [
          'Use functional components with hooks over class components.',
          'Leverage useEffect for side effects like API calls.',
          'Organize components in a `src/components` directory.',
          'Add PropTypes or TypeScript for prop validation.'
        ]
      },
      {
        title: 'Styling and State Management',
        description: 'Apply styles using Tailwind CSS or CSS modules. Manage state with Redux or Context API for larger applications.',
        code: `// src/App.jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './store/counterSlice';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800">
      <h1 className="text-2xl">Counter: {count}</h1>
      <button
        onClick={() => dispatch(increment())}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Increment
      </button>
    </div>
  );
}

// src/store/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; }
  }
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;`,
        tips: [
          'Use Tailwind for responsive designs.',
          'Consider Zustand for lightweight state management.',
          'Test components with React Testing Library.',
          'Use CSS-in-JS like Emotion for scoped styles.'
        ]
      },
      {
        title: 'Deploying a React App',
        description: 'Deploy the React app to platforms like Vercel or Netlify. Optimize for production with code splitting and lazy loading.',
        code: `// Build for production
npm run build
# Deploy to Vercel
vercel .`,
        tips: [
          'Enable code splitting with React.lazy and Suspense.',
          'Optimize images with WebP format.',
          'Use environment variables for API keys.',
          'Monitor performance with Lighthouse.'
        ]
      }
    ]
  },
  {
    name: 'Django',
    category: 'Backend',
    description: 'Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.',
    guides: [
      {
        title: 'Setting Up a Django Project',
        description: 'Create a Django project and app. Configure settings and database.',
        code: `pip install django
django-admin startproject myproject
cd myproject
python manage.py startapp myapp
# settings.py
INSTALLED_APPS = [
    ...
    'myapp',
]
python manage.py migrate`,
        tips: [
          'Use a virtual environment: `python -m venv venv`.',
          'Set DEBUG=False in production.',
          'Use PostgreSQL for scalability.',
          'Install django-extensions for utilities.'
        ]
      },
      {
        title: 'Creating Models and Views',
        description: 'Define models for data and create views to handle requests.',
        code: `# myapp/models.py
from django.db import models
class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

# myapp/views.py
from django.shortcuts import render
from .models import Item
def item_list(request):
    items = Item.objects.all()
    return render(request, 'myapp/item_list.html', {'items': items})`,
        tips: [
          'Use Django ORM for database queries.',
          'Add indexes to frequently queried fields.',
          'Use class-based views for complex logic.',
          'Validate input with forms.'
        ]
      },
      {
        title: 'REST API with Django REST Framework',
        description: 'Build a REST API using Django REST Framework for frontend integration.',
        code: `pip install djangorestframework
# settings.py
INSTALLED_APPS = [..., 'rest_framework']

# myapp/serializers.py
from rest_framework import serializers
from .models import Item
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'description']

# myapp/views.py
from rest_framework import viewsets
from .serializers import ItemSerializer
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

# urls.py
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'items', ItemViewSet)
urlpatterns = router.urls`,
        tips: [
          'Add authentication with JWT or OAuth.',
          'Use pagination for large datasets.',
          'Test APIs with Postman.',
          'Document with DRF’s built-in docs.'
        ]
      },
      {
        title: 'Deploying a Django App',
        description: 'Deploy to Heroku or a cloud provider with Gunicorn and PostgreSQL.',
        code: `pip install gunicorn psycopg2-binary
# Procfile
web: gunicorn myproject.wsgi
# Deploy to Heroku
heroku create
git push heroku main`,
        tips: [
          'Use environment variables for secrets.',
          'Configure static files with WhiteNoise.',
          'Set up CI/CD with GitHub Actions.',
          'Scale with multiple dynos.'
        ]
      }
    ]
  },
  {
    name: 'Flutter',
    category: 'Mobile',
    description: 'Flutter is Google’s UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.',
    guides: [
      {
        title: 'Setting Up a Flutter Project',
        description: 'Create a Flutter project and set up development environment for iOS and Android.',
        code: `flutter create my_flutter_app
cd my_flutter_app
flutter pub add provider
flutter run`,
        tips: [
          'Run `flutter doctor` to verify setup.',
          'Use VS Code with Flutter extension.',
          'Test on both iOS and Android emulators.',
          'Add dartanalyzer for linting.'
        ]
      },
      {
        title: 'Building UI with Widgets',
        description: 'Create a responsive UI with Flutter widgets and state management.',
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
        home: Scaffold(
          appBar: AppBar(title: Text('Flutter App')),
          body: Center(
            child: Consumer<Counter>(
              builder: (context, counter, _) => Text('Count: $'),
            ),
          ),
          floatingActionButton: FloatingActionButton(
            onPressed: () => Provider.of<Counter>(context, listen: false).increment(),
            child: Icon(Icons.add),
          ),
        ),
      ),
    );
  }
}`,
        tips: [
          'Use StatelessWidget for static UI.',
          'Leverage Provider or Riverpod for state.',
          'Add animations with AnimatedContainer.',
          'Test on physical devices.'
        ]
      },
      {
        title: 'Networking and APIs',
        description: 'Fetch data from APIs using HTTP package and display in UI.',
        code: `// lib/main.dart
import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  Future<List> fetchData() async {
    final response = await http.get(Uri.parse('https://api.example.com/data'));
    return json.decode(response.body);
  }
}

class MyHomePage extends StatelessWidget {
  final ApiService api = ApiService();
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: api.fetchData(),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return ListView.builder(
            itemCount: snapshot.data.length,
            itemBuilder: (context, index) => ListTile(title: Text(snapshot.data[index]['name'])),
          );
        }
        return CircularProgressIndicator();
      },
    );
  }
}`,
        tips: [
          'Handle errors with try-catch.',
          'Cache responses with shared_preferences.',
          'Use Dio for advanced HTTP.',
          'Mock APIs for testing.'
        ]
      },
      {
        title: 'Deploying a Flutter App',
        description: 'Build and publish to Google Play and App Store.',
        code: `flutter build apk --release
flutter build ios --release`,
        tips: [
          'Use Codemagic for CI/CD.',
          'Add app icons with flutter_launcher_icons.',
          'Test with TestFlight and Play Console.',
          'Follow store privacy guidelines.'
        ]
      }
    ]
  },
  {
    name: 'TensorFlow',
    category: 'Machine Learning',
    description: 'TensorFlow is an open-source machine learning framework for building and deploying ML models.',
    guides: [
      {
        title: 'Setting Up TensorFlow',
        description: 'Install TensorFlow and prepare a dataset.',
        code: `pip install tensorflow
import tensorflow as tf
from tensorflow.keras import datasets

(train_images, train_labels), (test_images, test_labels) = datasets.cifar10.load_data()
train_images = train_images / 255.0
test_images = test_images / 255.0`,
        tips: [
          'Use GPU support for faster training.',
          'Verify installation with `tf.__version__`.',
          'Use TensorFlow Datasets for quick data access.',
          'Create a virtual environment.'
        ]
      },
      {
        title: 'Building a Neural Network',
        description: 'Create and train a convolutional neural network for image classification.',
        code: `model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(32, (3,3), activation='relu', input_shape=(32, 32, 3)),
    tf.keras.layers.MaxPooling2D(2,2),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(10, activation='softmax')
])
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(train_images, train_labels, epochs=10)`,
        tips: [
          'Add dropout to prevent overfitting.',
          'Use data augmentation.',
          'Monitor with TensorBoard.',
          'Validate with test data.'
        ]
      },
      {
        title: 'Model Evaluation and Tuning',
        description: 'Evaluate model performance and tune hyperparameters.',
        code: `test_loss, test_acc = model.evaluate(test_images, test_labels)
print(f"Test accuracy: {test_acc}")
# Use Keras Tuner
from tensorflow import keras
import keras_tuner as kt

def build_model(hp):
    model = keras.Sequential()
    model.add(keras.layers.Dense(
        units=hp.Int('units', min_value=32, max_value=512, step=32),
        activation='relu'))
    model.add(keras.layers.Dense(10, activation='softmax'))
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    return model

tuner = kt.Hyperband(build_model, objective='val_accuracy', max_epochs=10)
tuner.search(train_images, train_labels, validation_data=(test_images, test_labels))`,
        tips: [
          'Use cross-validation.',
          'Experiment with learning rates.',
          'Save checkpoints.',
          'Analyze confusion matrix.'
        ]
      },
      {
        title: 'Deploying a TensorFlow Model',
        description: 'Save and deploy model for inference.',
        code: `model.save('tf_model')
# Convert to TFLite
converter = tf.lite.TFLiteConverter.from_saved_model('tf_model')
tflite_model = converter.convert()
with open('model.tflite', 'wb') as f:
    f.write(tflite_model)`,
        tips: [
          'Use TensorFlow Serving for APIs.',
          'Optimize with quantization.',
          'Deploy to mobile with TFLite.',
          'Monitor model drift.'
        ]
      }
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
    framework.guides.forEach((guide, index) => {
      const yPos = 20 + index * 70;
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
                language={selectedFramework === 'Django' || selectedFramework === 'TensorFlow' ? 'python' : 'javascript'}
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

        {/* === Progress === */}
        <div className="mt-6 text-gray-700 dark:text-gray-300">
          <p>Progress: Completed {frameworks.find(f => f.name === selectedFramework)?.guides.length} steps for {selectedFramework}</p>
        </div>
      </div>
    </div>
  );
};

export default DocsandGuide;