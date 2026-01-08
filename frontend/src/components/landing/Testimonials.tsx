import React from "react";
import { motion, easeOut } from "framer-motion";
import { Star, Quote, Shield, CheckCircle, Lock } from "lucide-react";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Fatima Alami",
      role: "Property Manager",
      company: "Al Mansour Residence",
      content:
        "This platform has transformed our management of 15 buildings in Casablanca. The automated billing system saves us 20 hours per week, and residents love the self-service portal.",
      rating: 5,
    },
    {
      name: "Youssef Bennani",
      role: "Syndic President",
      company: "Tour Atlas Syndic",
      content:
        "The communication features are outstanding. We've reduced resident complaints by 60% and improved meeting attendance by 40% since implementing the platform.",
      rating: 5,
    },
    {
      name: "Amina Zahraoui",
      role: "Operations Director",
      company: "Marrakech Property Group",
      content:
        "The analytics dashboard gives us insights we never had before. We can now make data-driven decisions that have significantly improved our operational efficiency.",
      rating: 5,
    },
  ];

  const stats = [
    { value: "98%", label: "Customer Satisfaction" },
    { value: "70%", label: "Time Saved" },
    { value: "500+", label: "Buildings Managed" },
    { value: "10K+", label: "Happy Residents" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      transition: {
        duration: 0.4,
        ease: easeOut,
      },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-blue-700 mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            Client Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Trusted by
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              {" "}
              Moroccan Professionals
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Join hundreds of syndic managers across Morocco who have transformed
            their operations with our comprehensive platform.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="group"
            >
              <motion.div
                variants={cardHoverVariants}
                className="h-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 overflow-hidden relative"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-3xl"></div>

                <div className="p-8 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 * i, duration: 0.3 }}
                        >
                          <Star className="h-5 w-5 text-yellow-400 fill-current mr-1 transition-transform duration-300" />
                        </motion.div>
                      ))}
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center transition-transform duration-300">
                      <Quote className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-gray-700 leading-relaxed text-lg font-medium">
                      {testimonial.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 transition-transform duration-300 shadow-lg">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          {testimonial.role}
                        </div>
                        <div className="text-xs text-gray-500">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
          className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-white/50 relative overflow-hidden group"
        >
          {/* Animated gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-3xl"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-3 group-hover:from-blue-700 group-hover:to-cyan-700 transition-all duration-300">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm font-medium group-hover:text-gray-700 transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: easeOut }}
          className="mt-20 text-center"
        >
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 border border-white/50 inline-block">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12">
              {[
                { icon: Lock, text: "GDPR Compliant" },
                { icon: Shield, text: "SOC 2 Type II Certified" },
                { icon: CheckCircle, text: "ISO 27001 Compliant" },
              ].map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer group"
                >
                  <cert.icon className="h-6 w-6 transition-transform duration-300" />
                  <span className="text-sm font-medium">{cert.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
