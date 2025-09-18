import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom';

const frameworks = ['Rasa', 'LangChain', 'ChatterBot', 'Custom with OpenAI'];

const chatbotGuides = {
  'Rasa': {
    steps: [
      {
        title: 'Set Up Environment',
        description: 'Install Rasa and initialize a new project.',
        code: `pip install rasa
rasa init --no-prompt`,
        tips: [
          'Create a virtual environment.',
          'Explore default files.'
        ]
      },
      {
        title: 'Train and Run Chatbot',
        description: 'Define intents, stories, and train the model.',
        code: `# In nlu.yml
version: "3.1"
nlu:
- intent: greet
  examples: |
    - hello
    - hi

# In stories.yml
version: "3.1"
stories:
- story: happy path
  steps:
  - intent: greet
  - action: utter_greet

# Train and run
rasa train
rasa shell`,
        tips: [
          'Add custom actions.',
          'Use Rasa X for UI.'
        ]
      },
      {
        title: 'Deploy Chatbot',
        description: 'Deploy to a server or integrate with channels.',
        code: `rasa run --enable-api --cors "*"`,
        tips: [
          'Use Docker for deployment.',
          'Connect to Slack or web.'
        ]
      }
    ]
  },
  LangChain: {
    steps: [
      {
        title: 'Set Up Environment',
        description: 'Install LangChain and dependencies.',
        code: `pip install langchain openai
from langchain.llms import OpenAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory`,
        tips: [
          'Set OpenAI API key.',
          'Choose LLM provider.'
        ]
      },
      {
        title: 'Build Chatbot',
        description: 'Create a conversational chain.',
        code: `llm = OpenAI(temperature=0.7)
memory = ConversationBufferMemory()
conversation = ConversationChain(llm=llm, memory=memory)

while True:
    user_input = input("You: ")
    response = conversation.predict(input=user_input)
    print("Bot:", response)`,
        tips: [
          'Add prompts.',
          'Handle context.'
        ]
      },
      {
        title: 'Deploy Chatbot',
        description: 'Integrate with web or app.',
        code: `# Use FastAPI or Flask
from fastapi import FastAPI
app = FastAPI()

@app.post("/chat")
def chat(message: str):
    return {"response": conversation.predict(input=message)}`,
        tips: [
          'Host on cloud.',
          'Add authentication.'
        ]
      }
    ]
  },
  'ChatterBot': {
    steps: [
      {
        title: 'Set Up Environment',
        description: 'Install ChatterBot and train with data.',
        code: `pip install chatterbot chatterbot_corpus
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer`,
        tips: [
          'Use SQL storage.',
          'Custom adapters.'
        ]
      },
      {
        title: 'Train Chatbot',
        description: 'Train on corpus data.',
        code: `bot = ChatBot('MyBot')
trainer = ChatterBotCorpusTrainer(bot)
trainer.train('chatterbot.corpus.english')

while True:
    user_input = input("You: ")
    response = bot.get_response(user_input)
    print("Bot:", response)`,
        tips: [
          'Add custom training data.',
          'Logic adapters.'
        ]
      },
      {
        title: 'Deploy Chatbot',
        description: 'Wrap in a web service.',
        code: `# Using Flask
from flask import Flask, request
app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['message']
    return {'response': str(bot.get_response(user_input))} `,
        tips: [
          'Deploy to Heroku.',
          'Handle sessions.'
        ]
      }
    ]
  },
  'Custom with OpenAI': {
    steps: [
      {
        title: 'Set Up Environment',
        description: 'Install OpenAI SDK.',
        code: `pip install openai
import openai
openai.api_key = 'your-api-key'`,
        tips: [
          'Secure API key.',
          'Choose model.'
        ]
      },
      {
        title: 'Build Chatbot',
        description: 'Use chat completions.',
        code: `messages = [{"role": "system", "content": "You are a helpful assistant."}]

while True:
    user_input = input("You: ")
    messages.append({"role": "user", "content": user_input})
    response = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)
    bot_reply = response.choices[0].message.content
    print("Bot:", bot_reply)
    messages.append({"role": "assistant", "content": bot_reply})`,
        tips: [
          'Manage conversation history.',
          'Handle tokens.'
        ]
      },
      {
        title: 'Deploy Chatbot',
        description: 'Create API endpoint.',
        code: `# With Streamlit or Flask
import streamlit as st
st.title("Chatbot")
if 'messages' not in st.session_state:
    st.session_state.messages = []

user_input = st.text_input("You:")
if user_input:
    # Call OpenAI and display response`,
        tips: [
          'Use Vercel for hosting.',
          'Add rate limiting.'
        ]
      }
    ]
  }
};

const ChatBot = () => {
  const [selectedFramework, setSelectedFramework] = useState('Rasa');

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`How to Build a Chatbot with ${selectedFramework}`, 10, 10);
    chatbotGuides[selectedFramework].steps.forEach((step, index) => {
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
    doc.save(`chatbot-guide-${selectedFramework.toLowerCase().replace(/ /g, '-')}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto p-6">

        {/* === Chatbot Section === */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
            How to Build a Chatbot with {selectedFramework}
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
            {chatbotGuides[selectedFramework].steps.map((step, index) => (
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
          {chatbotGuides[selectedFramework].steps.map((step, index) => (
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
          <p>Progress: Completed {chatbotGuides[selectedFramework].steps.length} steps for {selectedFramework}</p>
        </div>

      </div>
    </div>
  );
};

export default ChatBot;