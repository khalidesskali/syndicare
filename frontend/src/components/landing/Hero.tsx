import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-indigo-100 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-indigo-100/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full opacity-10">
                <div className="grid grid-cols-12 gap-4 transform rotate-12 scale-150">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-blue-200 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center px-4 py-2 bg-blue-600 rounded-full text-sm font-medium text-white mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Enterprise-grade syndicate management
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Streamline Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              {" "}
              Syndicate Operations
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Transform how you manage buildings, residents, finances, and
            communications. The all-in-one platform designed for modern
            syndicate management.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-16"
          >
            <a
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg inline-flex items-center"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
