import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const fullText = "Your guide to mastering web, mobile, and AI/ML development.";
  const [index, setIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Typewriter effect with reset
  useEffect(() => {
    if (!isComplete && index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, index + 1));
        setIndex(index + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else if (index === fullText.length) {
      setIsComplete(true);
    }
  }, [index, fullText, isComplete]);

  // Reset typewriter on component mount
  useEffect(() => {
    setText("");
    setIndex(0);
    setIsComplete(false);
  }, []);

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

  // Roadmap data
  const roadmaps = [
    {
      title: "Web Development",
      description: "Build responsive websites with HTML, CSS, JavaScript, and frameworks like React.",
      link: "/Webdev",
      icon: "🌐",
      illustration: "https://illustrations.popsy.co/amber/woman-on-laptop-figma.svg",
    },
    {
      title: "Mobile Development",
      description: "Create cross-platform apps using React Native, Flutter, or native tools.",
      link: "/Mobiledev",
      icon: "📱",
      illustration: "https://illustrations.popsy.co/amber/app-launch.svg",
    },
    {
      title: "AI/ML Development",
      description: "Dive into machine learning with Python, TensorFlow, and practical projects.",
      link: "/AIML",
      icon: "🤖",
      illustration: "https://illustrations.popsy.co/amber/designer.svg",
    },
  ];

  // Resources data
  const resources = [
    {
      title: "Coding Tools",
      description: "Explore IDEs, version control, and debugging tools to streamline your workflow.",
      link: "/resources/tools",
      icon: "🛠️",
    },
    {
      title: "Learning Guides",
      description: "Access curated tutorials and documentation for all skill levels.",
      link: "/resources/docs",
      icon: "📚",
    },
    {
      title: "Starter Projects",
      description: "Kickstart your portfolio with beginner-friendly project templates.",
      link: "/resources/projects",
      icon: "🚀",
    },
  ];

  // Community data
  const community = [
    {
      title: "Join the Forum",
      description: "Connect with learners, share ideas, and get help from peers.",
      link: "/community/forum",
      icon: "👥",
    },
    {
      title: "Live Workshops",
      description: "Participate in interactive sessions with industry experts.",
      link: "/community/workshops",
      icon: "🎤",
    },
    {
      title: "Showcase Your Work",
      description: "Share your projects and get feedback from the community.",
      link: "/community/showcase",
      icon: "🏆",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "TechTickle’s roadmaps made learning web development so approachable!",
      author: "Alex Johnson",
      role: "Aspiring Developer",
    },
    {
      quote: "The resources section saved me hours of searching for the right tools.",
      author: "Sarah Lee",
      role: "Mobile Developer",
    },
    {
      quote: "I love the community support—it’s like having a mentor on demand!",
      author: "Mike Chen",
      role: "AI Enthusiast",
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col md:flex-row justify-center items-center text-center md:text-left px-6 bg-gradient-to-br from-indigo-500 via-teal-400 to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 space-y-8 z-10"
        >
          <motion.h1
            variants={childVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight font-roboto"
          >
            Welcome to <span className="text-amber-300">TechTickle</span> 
          </motion.h1>
          <motion.p
            variants={childVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl max-w-xl font-light"
          >
            {text}
            {!isComplete && <span className="animate-blink">|</span>}
          </motion.p>
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-6 justify-center md:justify-start"
          >
            <motion.div
              variants={childVariants}
              whileHover={{ scale: 1.1, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/Webdev"
                className="px-8 py-4 bg-amber-300 text-indigo-900 rounded-full shadow-lg font-semibold hover:bg-amber-400 transition-colors duration-300 contrast-125"
                aria-label="Start learning with roadmaps"
              >
                Start Learning 
              </Link>
            </motion.div>
            <motion.div
              variants={childVariants}
              whileHover={{ scale: 1.1, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/resources/tools"
                className="px-8 py-4 border-2 border-amber-300 text-amber-300 rounded-full font-semibold hover:bg-amber-300 hover:text-indigo-900 transition-colors duration-300 contrast-125"
                aria-label="Explore learning resources"
              >
                Explore Resources ℹ️
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="flex-1 mt-12 md:mt-0 flex justify-center z-10"
        >
          <img
            src="https://illustrations.popsy.co/amber/studying.svg"
            alt="Illustration of a person learning technology"
            className="w-3/4 md:w-2/3 max-w-md drop-shadow-2xl"
          />
        </motion.div>
      </section>

      {/* Roadmaps Section */}
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
            id="roadmaps-section"
          >
            Start Your Learning Journey 🚀
          </motion.h2>
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {roadmaps.map((roadmap, i) => (
              <motion.div
                key={i}
                variants={childVariants}
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)" }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <img
                  src={roadmap.illustration}
                  alt={`Illustration for ${roadmap.title}`}
                  className="w-full h-32 object-contain mb-4"
                />
                <div className="text-4xl mb-4">{roadmap.icon}</div>
                <h3 className="text-xl font-semibold mb-2 font-roboto">{roadmap.title}</h3>
                <p className="text-gray-600 mb-4">{roadmap.description}</p>
                <Link
                  to={roadmap.link}
                  className="text-indigo-600 font-semibold hover:underline"
                  aria-label={`View ${roadmap.title} roadmap`}
                >
                  View Roadmap →
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Resources Section */}
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
            id="resources-section"
          >
            Essential Resources 📚
          </motion.h2>
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {resources.map((resource, i) => (
              <motion.div
                key={i}
                variants={childVariants}
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)" }}
                className="bg-gray-100 p-6 rounded-xl shadow-md"
              >
                <div className="text-4xl mb-4">{resource.icon}</div>
                <h3 className="text-xl font-semibold mb-2 font-roboto">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <Link
                  to={resource.link}
                  className="text-indigo-600 font-semibold hover:underline"
                  aria-label={`Explore ${resource.title}`}
                >
                  Explore Now →
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-teal-100 to-pink-100">
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
            id="community-section"
          >
            Join Our Community 👥
          </motion.h2>
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {community.map((item, i) => (
              <motion.div
                key={i}
                variants={childVariants}
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)" }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2 font-roboto">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <Link
                  to={item.link}
                  className="text-indigo-600 font-semibold hover:underline"
                  aria-label={`Join ${item.title}`}
                >
                  Get Involved →
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
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
            id="testimonials-section"
          >
            What Our Learners Say
          </motion.h2>
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                variants={childVariants}
                className="bg-gray-100 p-6 rounded-xl shadow-md"
              >
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <h4 className="font-semibold font-roboto">{testimonial.author}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
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
          <motion.h2 variants={childVariants} className="text-4xl font-bold font-roboto">
            Ready to Start Your Tech Journey?
          </motion.h2>
          <motion.p variants={childVariants} className="text-lg">
            Sign up today and unlock a world of learning resources!
          </motion.p>
          <motion.div
            variants={childVariants}
            whileHover={{ scale: 1.1, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/login"
              className="px-8 py-4 bg-amber-300 text-indigo-900 rounded-full shadow-lg font-semibold hover:bg-amber-400 transition-colors duration-300 contrast-125"
              aria-label="Register for TechTickle"
            >
              Get Started Now
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Inline CSS for animations and font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
          .font-roboto {
            font-family: 'Roboto', sans-serif;
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 0.7s infinite;
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