import React from "react";
import { motion, easeOut } from "framer-motion";
import { Building2, Users, DollarSign, MessageSquare } from "lucide-react";

const Features: React.FC = () => {
  const features = [
    {
      icon: Building2,
      title: "Building Management",
      description: "Efficiently manage properties, units, and common areas.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Users,
      title: "Resident Portal",
      description:
        "Self-service access for residents to information and requests.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: DollarSign,
      title: "Financial Management",
      description: "Automated billing, payments, and financial reporting.",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: MessageSquare,
      title: "Communication Hub",
      description: "Centralized messaging and complaint management.",
      color: "from-purple-500 to-purple-600",
    },
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
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: easeOut,
      },
    },
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Manage Your Syndicate
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to simplify every aspect of syndicate
            management, from daily operations to strategic planning.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} whileHover="hover">
              <motion.div
                variants={cardHoverVariants}
                className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                <div className="p-8">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div
                  className={`h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
