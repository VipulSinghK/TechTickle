
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const parallaxVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1, ease: "easeOut" } },
};

export default function Mission() {
  // Mission pillars data
  const missionPillars = [
    {
      title: "Empower Through Education",
      description:
        "We provide accessible, high-quality resources to equip learners with the skills needed to excel in web, mobile, and AI/ML development. From beginner tutorials to advanced frameworks, our goal is to make learning inclusive and effective for all.",
      icon: "📚",
    },
    {
      title: "Build a Collaborative Community",
      description:
        "TechTickle fosters a global community where developers can connect, share knowledge, and support each other. Through forums, mentorship, and collaborative projects, we create an environment that encourages growth and innovation.",
      icon: "🤝",
    },
    {
      title: "Drive Innovation",
      description:
        "We inspire learners to push boundaries by building real-world projects that solve meaningful problems. Our platform encourages creativity, critical thinking, and the application of cutting-edge technologies.",
      icon: "💡",
    },
  ];

  // Core values data
  const coreValues = [
    {
      title: "Inclusivity",
      description: "We believe everyone deserves access to quality education, regardless of background or experience.",
    },
    {
      title: "Excellence",
      description: "We strive for excellence in our resources, ensuring they are up-to-date, practical, and engaging.",
    },
    {
      title: "Innovation",
      description: "We embrace new technologies and methodologies to keep our community at the forefront of development.",
    },
    {
      title: "Collaboration",
      description: "We promote teamwork and knowledge-sharing to build a supportive developer ecosystem.",
    },
  ];

  // Impact statistics
  const impactStats = [
    { value: "10,000+", label: "Learners Worldwide" },
    { value: "500+", label: "Projects Built" },
    { value: "50+", label: "Community Events" },
    { value: "1M+", label: "Resources Accessed" },
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "TechTickle transformed my journey into web development. The resources and community support were invaluable!",
      author: "Jane Doe, Frontend Developer",
    },
    {
      quote: "The step-by-step roadmaps helped me master AI/ML concepts and land my dream job.",
      author: "John Smith, Data Scientist",
    },
    {
      quote: "The collaborative environment at TechTickle inspired me to build my first mobile app.",
      author: "Alex Brown, Mobile Developer",
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative py-24 px-6 bg-[url('https://wallpapercave.com/wp/wp8903994.png')] bg-cover bg-center"
      >
        <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto space-y-6 z-10 text-center"
        >
          <motion.h1
            variants={childVariants}
            className="text-5xl md:text-7xl font-bold font-poppins text-white bg-transparent"
          >
            Our Mission
          </motion.h1>
          <motion.p
            variants={childVariants}
            className="text-lg md:text-2xl max-w-3xl mx-auto font-open-sans text-white/90"
          >
            At TechTickle, we are committed to empowering aspiring developers with the knowledge, tools, and community to create innovative, impactful applications that shape the future.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission Statement Section */}
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
            className="text-4xl md:text-5xl font-bold font-poppins text-indigo-900 mb-12"
          >
            Our Vision for Change
          </motion.h2>
          <motion.p
            variants={childVariants}
            className="text-lg md:text-xl max-w-4xl mx-auto font-open-sans text-gray-700 mb-12"
          >
            TechTickle was founded with a singular purpose: to democratize tech education and foster a global community of creators. We believe that anyone, anywhere, can become a developer with the right resources and support. Our mission is to provide structured learning paths, cutting-edge tools, and a collaborative environment that empowers individuals to turn their ideas into reality.
          </motion.p>
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {missionPillars.map((pillar, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.05, boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.15)" }}
                className="bg-gray-100 p-8 rounded-xl shadow-lg"
              >
                <div className="text-5xl mb-4 font-roboto text-indigo-600">{pillar.icon}</div>
                <h3 className="text-2xl font-semibold font-poppins text-indigo-900 mb-4">{pillar.title}</h3>
                <p className="text-gray-600 font-open-sans">{pillar.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Core Values Section */}
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
            className="text-4xl md:text-5xl font-bold font-poppins text-indigo-900 mb-12"
          >
            Our Core Values
          </motion.h2>
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={parallaxVariants}
                whileHover={{ y: -10, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)" }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-semibold font-poppins text-indigo-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 font-open-sans">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Impact Section */}
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
            className="text-4xl md:text-5xl font-bold font-poppins text-indigo-900 mb-12"
          >
            Our Impact
          </motion.h2>
          <motion.p
            variants={childVariants}
            className="text-lg md:text-xl max-w-4xl mx-auto font-open-sans text-gray-700 mb-12"
          >
            Since our inception, TechTickle has empowered thousands of learners to achieve their goals, build meaningful projects, and contribute to the tech community. Our impact is measured by the success of our learners and the strength of our community.
          </motion.p>
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="p-6 bg-indigo-100 rounded-xl"
              >
                <h3 className="text-3xl font-bold font-poppins text-indigo-900">{stat.value}</h3>
                <p className="text-gray-600 font-open-sans mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-teal-50 to-indigo-50">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.h2
            variants={childVariants}
            className="text-4xl md:text-5xl font-bold font-poppins text-indigo-900 mb-12"
          >
            What Our Community Says
          </motion.h2>
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.05, boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.15)" }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <p className="text-gray-600 font-open-sans italic mb-4">"{testimonial.quote}"</p>
                <p className="text-indigo-900 font-poppins font-semibold">{testimonial.author}</p>
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
            className="text-4xl md:text-5xl font-bold font-poppins"
          >
            Join Our Mission
          </motion.h2>
          <motion.p
            variants={childVariants}
            className="text-lg md:text-xl font-open-sans"
          >
            Be part of a movement to make tech education accessible and inspiring. Start your journey with TechTickle today!
          </motion.p>
          <motion.div
            variants={childVariants}
            whileHover={{ scale: 1.1, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/login"
              className="px-8 py-4 bg-amber-300 text-indigo-900 rounded-full shadow-lg font-semibold font-poppins hover:bg-amber-400 transition-colors duration-300 contrast-125"
              aria-label="Join TechTickle to start learning"
            >
              Get Started Now
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Inline CSS for fonts and animations */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Open+Sans:wght@400;600&family=Roboto:wght@400;700&display=swap');
          .font-poppins {
            font-family: 'Poppins', sans-serif;
          }
          .font-open-sans {
            font-family: 'Open Sans', sans-serif;
          }
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
