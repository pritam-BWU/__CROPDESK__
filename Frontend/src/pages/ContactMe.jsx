import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from 'emailjs-com';
import { useEffect } from "react";

const ContactMe = ({ setActivePage }) => {
  useEffect(() => {
    setActivePage("contact");
  }, [setActivePage]);

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    description: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send('service_lbxyc6n', 'template_9fhjl7s', formData, '7ZD2IPKX6XXhp-2b-')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setIsSubmitted(true);
        setFormData({ firstName: "", email: "", description: "" });
        alert('Message sent successfully!');
      }, (err) => {
        console.log('FAILED...', err);
        alert('Failed to send message, please try again.');
      });
  };

  // Animation Variants 
  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen  text-white px-4 overflow-hidden" 
    id="/contactMe">
      <motion.div
        className="flex flex-col lg:flex-row justify-between p-10 w-full gap-12 max-w-5xl"
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInVariants}
      >
        {/* Contact Form */}
        <div className="flex-1">
          <motion.form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInVariants}
          >
            <h1 className="text-red-500 text-4xl font-bold mb-6 text-center">
              CONTACT <span className="text-white">Me</span>
            </h1>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-600 bg-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 text-white"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-600 bg-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 text-white"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-600 bg-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 text-white"
              />
              <button
                type="submit"
                className="bg-purple-700 text-white py-3 px-6 rounded-xl hover:bg-pink-700 transition-all duration-300 w-full font-bold"
              >
                {isSubmitted ? "SUBMITTED" : "SUBMIT"}
              </button>
            </div>
          </motion.form>
        </div>

        {/* Connect with Me Section */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <motion.div
            className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 text-center lg:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInVariants}
          >
            <h2 className="text-2xl font-bold mb-6 text-pink-500">
              CONNECT <span className="italic text-white">with me</span>
            </h2>
            <div className="flex justify-center lg:justify-start gap-6">
              {[  
                { icon: "Fb", link: "https://www.facebook.com/profile.php?id=100040163841109" },
                { icon: "In", link: "https://www.instagram.com/yt_pritambwu/?__pwa=1" },
                { icon: "Ln", link: "https://www.linkedin.com/in/pritam-pal-62b013258/" },
                { icon: "GTT", link: "https://github.com/pritam-BWU" },
              ].map(({ icon, link }, index) => (
                <motion.a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-gray-700 rounded-xl hover:bg-gray-600 transition-all duration-300 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <img
                    src={`/logo/${icon}.png`}
                    alt={icon}
                    className="w-12 h-12 object-cover rounded-lg hover:scale-110 transition-all duration-300"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactMe;
