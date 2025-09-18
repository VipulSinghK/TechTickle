import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AIML() {
  const [openStep, setOpenStep] = useState(null);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerVariants = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Roadmap steps data
  const roadmapSteps = [
    {
      title: "Prerequisites",
      description: "Build a foundation for AI and machine learning.",
      details: [
        "Learn basic programming with Python (variables, loops, functions).",
        "Understand fundamental math (linear algebra, calculus, probability).",
        "Get familiar with Jupyter Notebooks for experimentation.",
      ],
      resources: [
        { name: "Python.org: Getting Started", url: "https://www.python.org/about/gettingstarted/" },
        { name: "Khan Academy: Linear Algebra", url: "https://www.khanacademy.org/math/linear-algebra" },
        { name: "Jupyter: Getting Started", url: "https://jupyter.org/install" },
      ],
    },
    {
      title: "Core Concepts",
      description: "Master the fundamentals of machine learning.",
      details: [
        "Learn data preprocessing (cleaning, normalization, encoding).",
        "Understand supervised vs. unsupervised learning.",
        "Explore basic algorithms (linear regression, decision trees).",
      ],
      resources: [
        { name: "Coursera: Machine Learning by Andrew Ng", url: "https://www.coursera.org/learn/machine-learning" },
        { name: "scikit-learn: Tutorials", url: "https://scikit-learn.org/1.4/tutorial/index.html" },
      ],
    },
    {
      title: "Tools Setup",
      description: "Set up your AI/ML development environment.",
      details: [
        "Install Python and libraries like NumPy, pandas, and scikit-learn.",
        "Set up TensorFlow or PyTorch for deep learning.",
        "Use cloud platforms like Google Colab for GPU access.",
      ],
      resources: [
        { name: "Anaconda: Python Distribution", url: "https://www.anaconda.com/products/distribution" },
        { name: "Google Colab", url: "https://colab.research.google.com/" },
      ],
    },
    {
      title: "Project Builds",
      description: "Apply your skills to practical AI/ML projects.",
      details: [
        "Build a simple linear regression model for price prediction.",
        "Create an image classifier using a pre-trained model.",
        "Develop a basic chatbot with natural language processing.",
      ],
      resources: [
        { name: "Kaggle: Datasets and Tutorials", url: "https://www.kaggle.com/learn" },
        { name: "TensorFlow: Tutorials", url: "https://www.tensorflow.org/tutorials" },
      ],
    },
    {
      title: "Advanced Topics",
      description: "Explore advanced AI/ML techniques.",
      details: [
        "Learn deep learning with neural networks (CNNs, RNNs).",
        "Understand model deployment with Flask or FastAPI.",
        "Explore generative AI (e.g., GANs, transformers).",
      ],
      resources: [
        { name: "PyTorch: Deep Learning Tutorials", url: "https://pytorch.org/tutorials/" },
        { name: "FastAPI: Documentation", url: "https://fastapi.tiangolo.com/" },
      ],
    },
  ];

  // Updated tools array with reliable logo URLs
  const tools = [
    {
      title: "Anaconda",
      description: "A Python distribution with tools for data science and ML.",
      link: "https://www.anaconda.com/products/distribution",
      iconUrl: "https://www.svgrepo.com/show/473533/anaconda.svg",
    },
    {
      title: "TensorFlow",
      description: "An open-source framework for building ML models.",
      link: "https://www.tensorflow.org/",
      iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/1200px-Tensorflow_logo.svg.png",
    },
    {
      title: "Google Colab",
      description: "A cloud-based platform for running Python with GPU support.",
      link: "https://colab.research.google.com/",
      iconUrl: "https://www.svgrepo.com/show/303108/google-icon-logo.svg",
    },
  ];

  // Sample projects data
  const sampleProjects = [
    {
      title: "Price Prediction Model",
      description: "Build a model to predict prices using linear regression.",
      link: "/PricePrediction",
      illustration: "https://illustrations.popsy.co/purple/calculator.svg",
    },
    {
      title: "Image Classifier",
      description: "Create an app to classify images with a neural network.",
      link: "/imageclassifier",
      illustration: "https://illustrations.popsy.co/purple/looking-at-the-map.svg",
    },
    {
      title: "Chatbot",
      description: "Develop a basic chatbot with NLP capabilities.",
      link: "/chatbot",
      illustration: "https://illustrations.popsy.co/purple/man-on-laptop-twitch.svg",
    },
  ];

  const toggleStep = (index) => {
    setOpenStep(openStep === index ? null : index);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-indigo-500 via-teal-400 to-pink-500 text-white text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto space-y-6 z-10"
        >
          <motion.h1
            variants={childVariants}
            className="text-5xl md:text-6xl font-bold font-roboto"
          >
            AI/ML Development Roadmap
          </motion.h1>
          <motion.p
            variants={childVariants}
            className="text-lg md:text-xl max-w-2xl mx-auto"
          >
            Your step-by-step guide to building intelligent applications with artificial intelligence and machine learning.
          </motion.p>
          <motion.div
            variants={childVariants}
            whileHover={{ scale: 1.1, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >

          </motion.div>
        </motion.div>
      </section>

      {/* Roadmap Steps Section */}
      <section className="py-20 px-6 bg-white" id="roadmap-steps">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            variants={childVariants}
            className="text-4xl font-bold text-indigo-900 mb-12 text-center font-roboto"
          >
            Your Learning Path
          </motion.h2>
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {roadmapSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={childVariants}
                className="bg-gray-100 rounded-xl shadow-md overflow-hidden"
              >
                <button
                  className="w-full p-6 text-left flex justify-between items-center text-indigo-900 hover:bg-indigo-50 transition-colors duration-200"
                  onClick={() => toggleStep(index)}
                  aria-expanded={openStep === index}
                  aria-controls={`step-details-${index}`}
                >
                  <div>
                    <h3 className="text-xl font-semibold font-roboto">{step.title}</h3>
                    <p className="text-gray-600 mt-1">{step.description}</p>
                  </div>
                  <span className="text-2xl">{openStep === index ? "−" : "+"}</span>
                </button>
                <AnimatePresence>
                  {openStep === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 bg-white"
                      id={`step-details-${index}`}
                    >
                      <ul className="list-disc pl-6 space-y-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="text-gray-700">{detail}</li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <h4 className="font-semibold text-indigo-900">Resources:</h4>
                        <ul className="list-none space-y-2">
                          {step.resources.map((resource, i) => (
                            <li key={i}>
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 hover:underline"
                                aria-label={`Visit ${resource.name}`}
                              >
                                {resource.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Tools & Resources Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-50 to-teal-50">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.h2
            variants={childVariants}
            className="text-4xl font-bold text-indigo-900 mb-12 font-roboto"
          >
            Essential Tools
          </motion.h2>
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {tools.map((tool, i) => (
              <motion.div
                key={i}
                variants={childVariants}
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)" }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <img
                  src={tool.iconUrl}
                  alt={`${tool.title} logo`}
                  className="w-16 h-16 object-contain mb-4 mx-auto"
                />
                <h3 className="text-xl font-semibold mb-2 font-roboto">{tool.title}</h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 font-semibold hover:underline"
                  aria-label={`Visit ${tool.title}`}
                >
                  Download →
                </a>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Sample Projects Section */}
      <section className="py-20 px-6 bg-white">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.h2
            variants={childVariants}
            className="text-4xl font-bold text-indigo-900 mb-12 font-roboto"
          >
            Build Your Skills
          </motion.h2>
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {sampleProjects.map((project, i) => (
              <motion.div
                key={i}
                variants={childVariants}
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)" }}
                className="bg-gray-100 p-6 rounded-xl shadow-md"
              >
                <img
                  src={project.illustration}
                  alt={`Illustration for ${project.title}`}
                  className="w-full h-48 object-contain mb-4 rounded"
                />
                <h3 className="text-xl font-semibold mb-2 font-roboto">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <Link
                  to={project.link}
                  className="text-indigo-600 font-semibold hover:underline"
                  aria-label={`View ${project.title} project guide`}
                >
                  Start Project →
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-indigo-600 text-white text-center">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <motion.h2
            variants={childVariants}
            className="text-4xl font-bold font-roboto"
          >
            Ready to Build Your First AI/ML Model?
          </motion.h2>
          <motion.p variants={childVariants} className="text-lg">
            Join our community and start creating intelligent applications today!
          </motion.p>
          <motion.div
            variants={childVariants}
            whileHover={{ scale: 1.1, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/login"
              className="px-8 py-4 bg-amber-300 text-indigo-900 rounded-full shadow-lg font-semibold hover:bg-amber-400 transition-colors duration-300 contrast-125"
              aria-label="Join TechTickle to start learning"
            >
              Get Started Now
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Inline CSS for font and animations */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
          .font-roboto {
            font-family: 'Roboto', sans-serif;
          }
          @keyframes pulse {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-pulse {
            animation: pulse 10s infinite linear;
          }
          .contrast-125 {
            filter: contrast(125%);
          }
        `}
      </style>
    </div>
  );
}