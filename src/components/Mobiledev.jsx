
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Mobiledev() {
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
      description: "Build a foundation for mobile app development.",
      details: [
        "Understand basic programming concepts (variables, loops, functions).",
        "Learn about mobile OS ecosystems (iOS and Android).",
        "Get familiar with a code editor (e.g., VS Code or Android Studio).",
      ],
      resources: [
        { name: "CS50: Introduction to Programming", url: "https://www.edx.org/course/cs50s-introduction-to-computer-science" },
        { name: "Google: Android Basics", url: "https://developer.android.com/courses/android-basics-kotlin/course" },
      ],
    },
    {
      title: "Core Concepts",
      description: "Learn the fundamentals of mobile app development.",
      details: [
        "Explore UI design principles for mobile (layouts, navigation).",
        "Understand cross-platform frameworks like React Native or Flutter.",
        "Learn native development with Swift (iOS) or Kotlin (Android).",
      ],
      resources: [
        { name: "React Native Documentation", url: "https://reactnative.dev/docs/getting-started" },
        { name: "Flutter Get Started", url: "https://flutter.dev/docs/get-started" },
        { name: "Apple: Swift Tutorials", url: "https://developer.apple.com/tutorials/swiftui" },
      ],
    },
    {
      title: "Tools Setup",
      description: "Set up your mobile development environment.",
      details: [
        "Install Android Studio for Android development or Xcode for iOS.",
        "Set up emulators or connect physical devices for testing.",
        "Use npm or Yarn for managing dependencies in cross-platform projects.",
      ],
      resources: [
        { name: "Android Studio Download", url: "https://developer.android.com/studio" },
        { name: "Xcode Download", url: "https://developer.apple.com/xcode/" },
      ],
    },
    {
      title: "Project Builds",
      description: "Apply your skills to practical mobile projects.",
      details: [
        "Build a simple note-taking app with local storage.",
        "Create a weather app using a public API.",
        "Develop a basic chat app with real-time updates.",
      ],
      resources: [
        { name: "Expo: React Native Projects", url: "https://docs.expo.dev/tutorial/build-a-project/" },
        { name: "Flutter: Sample Apps", url: "https://flutter.dev/docs/cookbook" },
      ],
    },
    {
      title: "Advanced Topics",
      description: "Dive into advanced mobile development techniques.",
      details: [
        "Implement push notifications and deep linking.",
        "Optimize app performance for battery and memory usage.",
        "Integrate with backend services using REST or GraphQL.",
      ],
      resources: [
        { name: "Firebase: Push Notifications", url: "https://firebase.google.com/docs/cloud-messaging" },
        { name: "GraphQL: Apollo Client", url: "https://www.apollographql.com/docs/react/" },
      ],
    },
  ];

  // Updated tools array with reliable logo URLs
  const tools = [
    {
      title: "Android Studio",
      description: "The official IDE for Android app development with emulators and tools.",
      link: "https://developer.android.com/studio",
      iconUrl: "https://www.svgrepo.com/show/475631/android-color.svg",
    },
    {
      title: "Xcode",
      description: "Apple’s IDE for iOS development with SwiftUI and simulators.",
      link: "https://developer.apple.com/xcode/",
      iconUrl: "https://www.svgrepo.com/show/511330/apple-173.svg",
    },
    {
      title: "Expo",
      description: "A framework for building React Native apps with easy setup.",
      link: "https://expo.dev/",
      iconUrl: "https://www.svgrepo.com/show/353723/expo-icon.svg",
    },
  ];

  // Sample projects data
  const sampleProjects = [
    {
      title: "Note-Taking App",
      description: "Create a mobile app to manage notes with local storage.",
      link: "/components/projects/Notetaking",
      illustration: "https://illustrations.popsy.co/red/podcast-listening.svg",
    },
    {
      title: "Weather App",
      description: "Build an app that fetches real-time weather data from an API.",
      link: "/resources/projects/weather",
      illustration: "https://illustrations.popsy.co/red/working-vacation.svg",
    },
    {
      title: "Chat App",
      description: "Develop a real-time chat app with basic messaging features.",
      link: "/resources/projects/chat",
      illustration: "https://illustrations.popsy.co/red/video-call.svg",
    },
  ];

  const toggleStep = (index) => {
    setOpenStep(openStep === index ? null : index);
  };

  return (
    <div className="bg-gray-50">
  {/* Hero Section */}
  <section className="relative py-20 px-6 text-white text-center bg-[url('https://wallpapercave.com/wp/PgCwufr.jpg')] bg-cover bg-center">
    <div className="absolute inset-0 bg-black/40 z-0"></div>
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </div>

    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto space-y-6 relative z-10"
    >
      <motion.h1
        variants={childVariants}
        className="text-5xl md:text-6xl font-bold font-roboto"
      >
        Mobile Development Roadmap
      </motion.h1>
      <motion.p
        variants={childVariants}
        className="text-lg md:text-xl max-w-2xl mx-auto"
          >
            Your step-by-step guide to building modern mobile applications, from cross-platform to native development.
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
            Ready to Build Your First Mobile App?
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
