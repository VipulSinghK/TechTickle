import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Webdev() {
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
      description: "Understand the basics before diving into web development.",
      details: [
        "Learn basic computer literacy and file management.",
        "Get familiar with using a text editor (e.g., VS Code).",
        "Understand how the internet and browsers work.",
      ],
      resources: [
        { name: "MDN Web Docs: Getting Started", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web" },
        { name: "freeCodeCamp: Basic HTML", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/" },
      ],
    },
    {
      title: "Core Concepts",
      description: "Master HTML, CSS, and JavaScript to build dynamic websites.",
      details: [
        "HTML: Structure content with semantic tags.",
        "CSS: Style layouts with Flexbox, Grid, and responsive design.",
        "JavaScript: Add interactivity with DOM manipulation and events.",
      ],
      resources: [
        { name: "W3Schools: HTML Tutorial", url: "https://www.w3schools.com/html/" },
        { name: "CSS-Tricks: Flexbox Guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
        { name: "JavaScript.info", url: "https://javascript.info/" },
      ],
    },
    {
      title: "Tools Setup",
      description: "Set up your development environment for efficiency.",
      details: [
        "Install VS Code and useful extensions (e.g., Prettier, Live Server).",
        "Learn Git for version control and GitHub for collaboration.",
        "Use npm for package management and build tools.",
      ],
      resources: [
        { name: "VS Code Download", url: "https://code.visualstudio.com/" },
        { name: "GitHub Learning Lab", url: "https://lab.github.com/" },
      ],
    },
    {
      title: "Project Builds",
      description: "Apply your skills to real-world projects.",
      details: [
        "Build a personal portfolio website.",
        "Create a to-do list app with JavaScript.",
        "Develop a simple e-commerce landing page.",
      ],
      resources: [
        { name: "CodePen: Project Ideas", url: "https://codepen.io/collection/nNzwDM" },
        { name: "Frontend Mentor", url: "https://www.frontendmentor.io/" },
      ],
    },
    {
      title: "Advanced Topics",
      description: "Explore frameworks and backend integration.",
      details: [
        "Learn React for building single-page applications.",
        "Understand REST APIs and fetch data with JavaScript.",
        "Explore Node.js and Express for backend development.",
      ],
      resources: [
        { name: "React Documentation", url: "https://react.dev/" },
        { name: "Node.js Guide", url: "https://nodejs.org/en/docs/" },
      ],
    },
  ];

  // Updated tools array with iconUrl for logos
  const tools = [
    {
      title: "VS Code",
      description: "A powerful code editor with extensions for web development.",
      link: "https://code.visualstudio.com/",
      icon: "🛠️",
      iconUrl: "https://www.svgrepo.com/show/452129/vs-code.svg",
    },
    {
      title: "Chrome DevTools",
      description: "Inspect and debug your web applications in real-time.",
      link: "https://developer.chrome.com/docs/devtools/",
      icon: "🔍",
      iconUrl: "https://www.svgrepo.com/show/475640/chrome-color.svg",
    },
    {
      title: "GitHub",
      description: "Host your code and collaborate with others.",
      link: "https://github.com/",
      icon: "📦",
      iconUrl: "https://www.svgrepo.com/show/512317/github-142.svg",
    },
  ];

  // Sample projects data
const sampleProjects = [
  {
    title: "Personal Portfolio",
    description: "Showcase your skills with a responsive portfolio site.",
    link: "/portfolio", 
    illustration: "https://illustrations.popsy.co/sky/web-design.svg",
  },
  {
    title: "To-Do List App",
    description: "Build an interactive task manager with JavaScript.",
    link: "/todo", // 
    illustration: "https://illustrations.popsy.co/sky/business-analysis.svg",
  },
  {
    title: "E-Commerce Landing Page",
    description: "Create a product page with modern design principles.",
    link: "/ecommerce", 
    illustration: "https://illustrations.popsy.co/sky/shopping-cart.svg",
  },
];

  const toggleStep = (index) => {
    setOpenStep(openStep === index ? null : index);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-6 bg-gradient-to-br from-indigo-500 via-teal-400 to-pink-500 text-white text-center bg-[url('https://wallpapercave.com/wp/wp8903994.png')] bg-cover bg-center bg-blend-overlay"
      >
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
            Web Development Roadmap
          </motion.h1>
          <motion.p
            variants={childVariants}
            className="text-lg md:text-xl max-w-2xl mx-auto"
          >
            Your step-by-step guide to building modern web applications, from basics to advanced frameworks.
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
                  onError={(e) => (e.target.src = "https://via.placeholder.com/64?text=Logo")}
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
                  Explore →
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
            Ready to Build Your First Web App?
          </motion.h2>
          <motion.p variants={childVariants} className="text-lg">
            Join our community and start creating today!
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