import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom';

const frameworks = ['TensorFlow', 'PyTorch', 'Scikit-Learn', 'FastAI'];

const imageClassifierGuides = {
  'TensorFlow': {
    steps: [
      {
        title: 'Set Up Environment',
        description: 'Install TensorFlow and prepare dataset for image classification.',
        code: `pip install tensorflow pandas numpy
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator

train_datagen = ImageDataGenerator(rescale=1./255)
train_generator = train_datagen.flow_from_directory('train_data', target_size=(150, 150), batch_size=32, class_mode='binary')`,
        tips: [
          'Use datasets like CIFAR-10.',
          'Augment data for better training.'
        ]
      },
      {
        title: 'Build and Train Model',
        description: 'Create a CNN model and train it.',
        code: `model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(32, (3,3), activation='relu', input_shape=(150, 150, 3)),
    tf.keras.layers.MaxPooling2D(2,2),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(train_generator, epochs=10)`,
        tips: [
          'Add dropout to prevent overfitting.',
          'Evaluate on test set.'
        ]
      },
      {
        title: 'Deploy Model',
        description: 'Save and use model for inference.',
        code: `model.save('tf_classifier.h5')
loaded_model = tf.keras.models.load_model('tf_classifier.h5')
prediction = loaded_model.predict(new_image)`,
        tips: [
          'Convert to TFLite for mobile.',
          'Host as API with Flask.'
        ]
      }
    ]
  },
  PyTorch: {
    steps: [
      {
        title: 'Set Up Environment',
        description: 'Install PyTorch and load image data.',
        code: `pip install torch torchvision pandas numpy
import torch
import torch.nn as nn
import torchvision.transforms as transforms
from torchvision.datasets import ImageFolder
from torch.utils.data import DataLoader

transform = transforms.Compose([transforms.Resize((150,150)), transforms.ToTensor()])
dataset = ImageFolder('train_data', transform=transform)
loader = DataLoader(dataset, batch_size=32, shuffle=True)`,
        tips: [
          'Use pre-trained models like ResNet.',
          'Normalize images.'
        ]
      },
      {
        title: 'Build and Train Model',
        description: 'Define CNN and train.',
        code: `class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 32, 3)
        self.pool = nn.MaxPool2d(2,2)
        self.fc1 = nn.Linear(32*74*74, 128)  # Adjust size
        self.fc2 = nn.Linear(128, 1)

    def forward(self, x):
        x = self.pool(torch.relu(self.conv1(x)))
        x = x.view(-1, 32*74*74)
        x = torch.relu(self.fc1(x))
        return torch.sigmoid(self.fc2(x))

model = CNN()
optimizer = torch.optim.Adam(model.parameters())
loss_fn = nn.BCELoss()

for epoch in range(10):
    for images, labels in loader:
        optimizer.zero_grad()
        outputs = model(images)
        loss = loss_fn(outputs, labels.float().view(-1,1))
        loss.backward()
        optimizer.step()`,
        tips: [
          'Use GPU with cuda.',
          'Add validation loop.'
        ]
      },
      {
        title: 'Deploy Model',
        description: 'Save and load model.',
        code: `torch.save(model.state_dict(), 'pytorch_classifier.pt')
model.load_state_dict(torch.load('pytorch_classifier.pt'))
prediction = model(new_image)`,
        tips: [
          'Export to ONNX.',
          'Integrate with app.'
        ]
      }
    ]
  },
  'Scikit-Learn': {
    steps: [
      {
        title: 'Set Up Environment',
        description: 'Install scikit-learn and prepare image features.',
        code: `pip install scikit-learn pandas numpy opencv-python
import cv2
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC

# Load images and extract features (e.g., flatten)
images = [cv2.imread(file) for file in image_files]
features = [img.flatten() for img in images]
X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2)`,
        tips: [
          'Use HOG or other features.',
          'Handle large datasets.'
        ]
      },
      {
        title: 'Train Model',
        description: 'Fit a classifier like SVM.',
        code: `model = SVC()
model.fit(X_train, y_train)
accuracy = model.score(X_test, y_test)`,
        tips: [
          'Try RandomForest.',
          'Use cross-validation.'
        ]
      },
      {
        title: 'Deploy Model',
        description: 'Save and predict.',
        code: `import joblib
joblib.dump(model, 'sklearn_classifier.pkl')
loaded_model = joblib.load('sklearn_classifier.pkl')
prediction = loaded_model.predict(new_features)`,
        tips: [
          'Embed in application.',
          'Optimize features.'
        ]
      }
    ]
  },
  FastAI: {
    steps: [
      {
        title: 'Set Up Environment',
        description: 'Install FastAI and load data.',
        code: `pip install fastai
from fastai.vision.all import *

path = Path('train_data')
dls = ImageDataLoaders.from_folder(path, valid_pct=0.2, item_tfms=Resize(224))`,
        tips: [
          'Use pre-trained models.',
          'Augment data.'
        ]
      },
      {
        title: 'Train Model',
        description: 'Fine-tune a model.',
        code: `learn = vision_learner(dls, resnet34, metrics=error_rate)
learn.fine_tune(4)`,
        tips: [
          'Export for inference.',
          'Interpret results.'
        ]
      },
      {
        title: 'Deploy Model',
        description: 'Export and predict.',
        code: `learn.export('fastai_classifier.pkl')
learn_inf = load_learner('fastai_classifier.pkl')
prediction = learn_inf.predict('new_image.jpg')`,
        tips: [
          'Host as service.',
          'Convert to mobile format.'
        ]
      }
    ]
  }
};

const ImageClassifier = () => {
  const [selectedFramework, setSelectedFramework] = useState('TensorFlow');

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`How to Build an Image Classifier App with ${selectedFramework}`, 10, 10);
    imageClassifierGuides[selectedFramework].steps.forEach((step, index) => {
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
    doc.save(`image-classifier-guide-${selectedFramework.toLowerCase().replace(/ /g, '-')}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto p-6">

        {/* === Image Classifier Section === */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
            How to Build an Image Classifier App with {selectedFramework}
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
            {imageClassifierGuides[selectedFramework].steps.map((step, index) => (
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
          {imageClassifierGuides[selectedFramework].steps.map((step, index) => (
            <div
              key={index}
              id={`step-${index + 1}`}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                Step {index + 1}: {step.title}
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">{step.description}</p>
              <SyntaxHighlighter language="python" style={vscDarkPlus}>
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
          <p>Progress: Completed {imageClassifierGuides[selectedFramework].steps.length} steps for {selectedFramework}</p>
        </div>

      </div>
    </div>
  );
};

export default ImageClassifier;