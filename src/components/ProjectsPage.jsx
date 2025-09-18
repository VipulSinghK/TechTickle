import React from 'react';
import { Link } from 'react-router-dom';

const projects = [
  {
    name: 'Portfolio',
    path: '/portfolio',
    description: 'A personal portfolio showcasing my skills, projects, and achievements.',
  },
  {
    name: 'To-Do App',
    path: '/todo',
    description: 'A task management application to create, edit, and track to-do items.',
  },
  {
    name: 'E-commerce',
    path: '/ecommerce',
    description: 'An online store with product listings, cart functionality, and checkout process.',
  },
  {
    name: 'Note Taking',
    path: '/notetaking',
    description: 'A note-taking app for organizing thoughts, ideas, and reminders.',
  },
  {
    name: 'Weather App',
    path: '/weather',
    description: 'A weather forecasting app displaying real-time weather data for locations.',
  },
  {
    name: 'Chat App',
    path: '/chatapp',
    description: 'A real-time messaging application for user communication.',
  },
  {
    name: 'Price Prediction',
    path: '/priceprediction',
    description: 'A machine learning model for predicting prices based on historical data.',
  },
  {
    name: 'Image Classifier',
    path: '/imageclassifier',
    description: 'An AI-powered app for classifying images using trained models.',
  },
  {
    name: 'Chatbot',
    path: '/Chatbot',
    description: 'An intelligent chatbot for interactive conversations using NLP.',
  },
];

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto p-6">
        {/* === Header Section === */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Projects
        </h1>

        {/* === Projects Grid === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Link
              key={index}
              to={project.path}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {project.name}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
              <div className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">
                View Project &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;