
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Tools() {
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

  // Tools data organized by category
  const toolCategories = [
    {
      category: "Web Development",
      illustration: "https://illustrations.popsy.co/green/web-design.svg",
      tools: [
        {
          title: "VS Code",
          description: "A powerful code editor with extensions for web development.",
          link: "https://code.visualstudio.com/",
          icon: "🛠️",
          iconUrl: "https://www.svgrepo.com/show/452129/vs-code.svg",
        },
        {
          title: "Chrome DevTools",
          description: "Inspect and debug web applications in real-time.",
          link: "https://developer.chrome.com/docs/devtools/",
          icon: "🔍",
          iconUrl: "https://www.google.com/chrome/static/images/chrome-logo.svg",
        },
        {
          title: "GitHub",
          description: "Host your code and collaborate with others.",
          link: "https://github.com/",
          icon: "📦",
          iconUrl: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        },
        {
          title: "Postman",
          description: "Test and document APIs for web applications.",
          link: "https://www.postman.com/",
          icon: "📡",
          iconUrl: "https://www.svgrepo.com/show/354202/postman-icon.svg",
        },
      ],
    },
    {
      category: "Mobile Development",
      illustration: "https://illustrations.popsy.co/green/app-launch.svg",
      tools: [
        {
          title: "Android Studio",
          description: "The official IDE for Android app development with emulators.",
          link: "https://developer.android.com/studio",
          icon: "🤖",
          iconUrl: "https://www.svgrepo.com/show/475631/android-color.svg",
        },
        {
          title: "Xcode",
          description: "Apple’s IDE for iOS development with SwiftUI and simulators.",
          link: "https://developer.apple.com/xcode/",
          icon: "🍎",
          iconUrl: "https://www.svgrepo.com/show/511330/apple-173.svg",
        },
        {
          title: "Expo",
          description: "A framework for building React Native apps with easy setup.",
          link: "https://expo.dev/",
          icon: "🚀",
          iconUrl: "https://www.svgrepo.com/show/353723/expo-icon.svg",
        },
      ],
    },
    {
      category: "AI/ML Development",
      illustration: "https://illustrations.popsy.co/green/designer.svg",
      tools: [
        {
          title: "Anaconda",
          description: "A Python distribution with tools for data science and ML.",
          link: "https://www.anaconda.com/products/distribution",
          icon: "🐍",
          iconUrl: "https://www.svgrepo.com/show/473533/anaconda.svg",
        },
        {
          title: "TensorFlow",
          description: "An open-source framework for building ML models.",
          link: "https://www.tensorflow.org/",
          icon: "🧠",
          iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/1200px-Tensorflow_logo.svg.png",
        },
        {
          title: "Google Colab",
          description: "A cloud-based platform for running Python with GPU support.",
          link: "https://colab.research.google.com/",
          icon: "☁️",
          iconUrl: "https://www.svgrepo.com/show/303108/google-icon-logo.svg",
        },
        {
          title: "Jupyter Notebook",
          description: "An interactive environment for coding and visualizing data.",
          link: "https://jupyter.org/",
          icon: "📓",
          iconUrl: "https://www.svgrepo.com/show/353949/jupyter.svg",
        },
      ],
    },
  ];

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
            Tools & Resources
          </motion.h1>
          <motion.p
            variants={childVariants}
            className="text-lg md:text-xl max-w-2xl mx-auto"
          >
            Discover essential tools to accelerate your web, mobile, and AI/ML development journey.
          </motion.p>
          <motion.div
            variants={childVariants}
            whileHover={{ scale: 1.1, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
          </motion.div>
        </motion.div>
      </section>

      {/* Tools Section */}
      <section className="py-20 px-6 bg-white" id="tools-section">
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
            Essential Tools for Development
          </motion.h2>
          {toolCategories.map((category, index) => (
            <div key={index} className="mb-12">
              <motion.div
                variants={childVariants}
                className="flex items-center justify-center mb-8"
              >
                <img
                  src={category.illustration}
                  alt={`Illustration for ${category.category}`}
                  className="w-32 h-32 object-contain mr-4"
                />
                <h3 className="text-3xl font-semibold text-indigo-900 font-roboto">
                  {category.category}
                </h3>
              </motion.div>
              <motion.div
                variants={staggerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {category.tools.map((tool, i) => (
                  <motion.div
                    key={i}
                    variants={childVariants}
                    whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)" }}
                    className="bg-gray-100 p-6 rounded-xl shadow-md"
                  >
                    <img
                      src={tool.iconUrl}
                      alt={`${tool.title} logo`}
                      className="w-16 h-16 object-contain mb-4 mx-auto"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/64?text=Logo")}
                    />
                    <h4 className="text-xl font-semibold mb-2 font-roboto">{tool.title}</h4>
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
            </div>
          ))}
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
            Ready to Start Building?
          </motion.h2>
          <motion.p variants={childVariants} className="text-lg">
            Join our community and leverage these tools to create amazing applications!
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
