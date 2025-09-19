import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

export default function OurTeam() {
  // Team member data
  const teamMembers = [
    {
      name: "Vipul Singh",
      role: "Founder & Developer",
      description:
        "As the sole creator of this project, I am passionate about democratizing tech education and empowering aspiring developers. With expertise in web development, I am dedicated to building a platform that fosters learning, innovation, and community.",
      icon: "👨‍💻",
      photo: "/images/edited.png",
    },
  ];

  // Core values data (aligned with mission page for consistency)
  const coreValues = [
    {
      title: "Inclusivity",
      description: "I strive to make tech education accessible to everyone, regardless of background or experience.",
    },
    {
      title: "Excellence",
      description: "I am committed to delivering high-quality, up-to-date, and practical resources for learners.",
    },
    {
      title: "Innovation",
      description: "I embrace cutting-edge technologies to keep the platform at the forefront of development.",
    },
    {
      title: "Dedication",
      description: "I am devoted to creating a supportive environment for aspiring developers to thrive.",
    },
  ];

  // Achievements data
  const achievements = [
    { value: "1", label: "Visionary Project" },
    { value: "100%", label: "Commitment" },
    { value: "24/7", label: "Dedication to Learning" },
    { value: "∞", label: "Passion for Innovation" },
  ];

  // Testimonial data (representing feedback about your work)
  const testimonials = [
    {
      quote: "The vision and execution of this platform have been inspiring. It's a game-changer for tech education!",
      author: "Vipul Singh",
    },
    {
      quote: "The resources provided are clear, practical, and motivating. I feel empowered to learn and create!",
      author: "Vipul Singh",
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
            Our Team
          </motion.h1>
          <motion.p
            variants={childVariants}
            className="text-lg md:text-2xl max-w-3xl mx-auto font-open-sans text-white/90"
          >
            Meet the driving force behind this project—a solo developer with a vision to empower aspiring developers through education, innovation, and community.
          </motion.p>
        </motion.div>
      </section>

      {/* Team Member Section */}
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
            The Visionary Behind the Project
          </motion.h2>
          <motion.p
            variants={childVariants}
            className="text-lg md:text-xl max-w-4xl mx-auto font-open-sans text-gray-700 mb-12"
          >
            As a solo developer, I am committed to creating a platform that provides accessible, high-quality resources and fosters a community of learners and creators. My mission is to inspire and empower the next generation of developers.
          </motion.p>
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 max-w-2xl mx-auto"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.05, boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.15)" }}
                className="bg-gray-100 p-8 rounded-xl shadow-lg"
              >
                <img
                  src={member.photo}
                  alt={`${member.name}'s profile photo`}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <div className="text-5xl mb-4 font-roboto text-indigo-600">{member.icon}</div>
                <h3 className="text-2xl font-semibold font-poppins text-indigo-900 mb-2">{member.name}</h3>
                <p className="text-lg font-open-sans text-indigo-700 mb-4">{member.role}</p>
                <p className="text-gray-600 font-open-sans">{member.description}</p>
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
            My Core Values
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

      {/* Achievements Section */}
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
            My Achievements
          </motion.h2>
          <motion.p
            variants={childVariants}
            className="text-lg md:text-xl max-w-4xl mx-auto font-open-sans text-gray-700 mb-12"
          >
            As the sole developer, my journey has been driven by passion, dedication, and a commitment to creating a meaningful impact in Tech. Here are some milestones of this project.
          </motion.p>
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="p-6 bg-indigo-100 rounded-xl"
              >
                <h3 className="text-3xl font-bold font-poppins text-indigo-900">{achievement.value}</h3>
                <p className="text-gray-600 font-open-sans mt-2">{achievement.label}</p>
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
            Community Feedback
          </motion.h2>
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
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
            Join the Journey
          </motion.h2>
          <motion.p
            variants={childVariants}
            className="text-lg md:text-xl font-open-sans"
          >
            Support my mission to make tech education accessible and inspiring. Start your learning journey with this platform today!
          </motion.p>
          <motion.div
            variants={childVariants}
            whileHover={{ scale: 1.1, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/login"
              className="px-8 py-4 bg-amber-300 text-indigo-900 rounded-full shadow-lg font-semibold font-poppins hover:bg-amber-400 transition-colors duration-300 contrast-125"
              aria-label="Join the platform to start learning"
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