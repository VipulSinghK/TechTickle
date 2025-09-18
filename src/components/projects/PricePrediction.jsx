import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom';

const frameworks = ['Scikit-Learn', 'TensorFlow', 'PyTorch', 'XGBoost'];

const pricePredictionGuides = {
  'Scikit-Learn': {
    steps: [
      {
        title: 'Set Up Environment',
        description: 'Install scikit-learn and load dataset for price prediction.',
        code: `pip install scikit-learn pandas numpy
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

data = pd.read_csv('house_prices.csv')
X = data.drop('price', axis=1)
y = data['price']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)`,
        tips: [
          'Use simple datasets like Boston Housing.',
          'Handle missing values.'
        ]
      },
      {
        title: 'Train Model',
        description: 'Fit a regression model.',
        code: `model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
mse = mean_squared_error(y_test, predictions)
print(mse)`,
        tips: [
          'Try other regressors like RandomForest.',
          'Evaluate with RMSE.'
        ]
      },
      {
        title: 'Deploy Model',
        description: 'Save and use model for predictions.',
        code: `import joblib
joblib.dump(model, 'model.pkl')
loaded_model = joblib.load('model.pkl')
new_pred = loaded_model.predict(new_data)`,
        tips: [
          'Use Flask for API.',
          'Monitor performance.'
        ]
      }
    ]
  },
  TensorFlow: {
    steps: [
      {
        title: 'Set Up Environment',
        description: 'Install TensorFlow and prepare data.',
        code: `pip install tensorflow pandas numpy
import tensorflow as tf
import pandas as pd
from sklearn.model_selection import train_test_split

data = pd.read_csv('house_prices.csv')
X = data.drop('price', axis=1).values
y = data['price'].values
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)`,
        tips: [
          'Normalize features.',
          'Use GPU if available.'
        ]
      },
      {
        title: 'Build and Train Model',
        description: 'Create a neural network for regression.',
        code: `model = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(1)
])
model.compile(optimizer='adam', loss='mse')
model.fit(X_train, y_train, epochs=100)
mse = model.evaluate(X_test, y_test)`,
        tips: [
          'Add more layers.',
          'Use early stopping.'
        ]
      },
      {
        title: 'Deploy Model',
        description: 'Save and load model.',
        code: `model.save('tf_model')
loaded_model = tf.keras.models.load_model('tf_model')
new_pred = loaded_model.predict(new_data)`,
        tips: [
          'Serve with TensorFlow Serving.',
          'Optimize for inference.'
        ]
      }
    ]
  },
  PyTorch: {
    steps: [
      {
        title: 'Set Up Environment',
        description: 'Install PyTorch and load data.',
        code: `pip install torch pandas numpy
import torch
import torch.nn as nn
import pandas as pd
from sklearn.model_selection import train_test_split

data = pd.read_csv('house_prices.csv')
X = torch.tensor(data.drop('price', axis=1).values, dtype=torch.float32)
y = torch.tensor(data['price'].values, dtype=torch.float32).view(-1, 1)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)`,
        tips: [
          'Check device (CPU/GPU).',
          'Batch data.'
        ]
      },
      {
        title: 'Build and Train Model',
        description: 'Define a neural network and train.',
        code: `class Net(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(input_size, 64)
        self.fc2 = nn.Linear(64, 1)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        return self.fc2(x)

model = Net()
optimizer = torch.optim.Adam(model.parameters())
loss_fn = nn.MSELoss()

for epoch in range(100):
    optimizer.zero_grad()
    outputs = model(X_train)
    loss = loss_fn(outputs, y_train)
    loss.backward()
    optimizer.step()`,
        tips: [
          'Use DataLoader.',
          'Add validation.'
        ]
      },
      {
        title: 'Deploy Model',
        description: 'Save and load model.',
        code: `torch.save(model.state_dict(), 'pytorch_model.pt')
model.load_state_dict(torch.load('pytorch_model.pt'))
new_pred = model(new_data)`,
        tips: [
          'Use TorchServe.',
          'Export to ONNX.'
        ]
      }
    ]
  },
  XGBoost: {
    steps: [
      {
        title: 'Set Up Environment',
        description: 'Install XGBoost and prepare data.',
        code: `pip install xgboost pandas numpy
import xgboost as xgb
import pandas as pd
from sklearn.model_selection import train_test_split

data = pd.read_csv('house_prices.csv')
X = data.drop('price', axis=1)
y = data['price']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)`,
        tips: [
          'Handle categorical features.',
          'Tune hyperparameters.'
        ]
      },
      {
        title: 'Train Model',
        description: 'Fit XGBoost regressor.',
        code: `model = xgb.XGBRegressor(objective='reg:squarederror')
model.fit(X_train, y_train)
predictions = model.predict(X_test)
mse = ((predictions - y_test) ** 2).mean()`,
        tips: [
          'Use cross-validation.',
          'Feature importance.'
        ]
      },
      {
        title: 'Deploy Model',
        description: 'Save and load model.',
        code: `model.save_model('xgboost_model.json')
loaded_model = xgb.XGBRegressor()
loaded_model.load_model('xgboost_model.json')
new_pred = loaded_model.predict(new_data)`,
        tips: [
          'Integrate with API.',
          'Monitor drift.'
        ]
      }
    ]
  }
};

const PricePrediction = () => {
  const [selectedFramework, setSelectedFramework] = useState('Scikit-Learn');

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`How to Build a Price Prediction Model with ${selectedFramework}`, 10, 10);
    pricePredictionGuides[selectedFramework].steps.forEach((step, index) => {
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
    doc.save(`price-prediction-guide-${selectedFramework.toLowerCase().replace(/ /g, '-')}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto p-6">

        {/* === Price Prediction Section === */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
            How to Build a Price Prediction Model with {selectedFramework}
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
            {pricePredictionGuides[selectedFramework].steps.map((step, index) => (
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
          {pricePredictionGuides[selectedFramework].steps.map((step, index) => (
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
          <p>Progress: Completed {pricePredictionGuides[selectedFramework].steps.length} steps for {selectedFramework}</p>
        </div>

      </div>
    </div>
  );
};

export default PricePrediction;