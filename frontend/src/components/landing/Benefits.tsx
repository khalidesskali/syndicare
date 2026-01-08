import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  TrendingUp,
  Users,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react";

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Save Time",
      description:
        "Reduce administrative tasks by up to 70% with automated workflows and streamlined processes.",
    },
    {
      icon: TrendingUp,
      title: "Increase Efficiency",
      description:
        "Optimize operations with real-time data insights and predictive analytics for better decision-making.",
    },
    {
      icon: Users,
      title: "Improve Communication",
      description:
        "Enhance resident satisfaction with transparent communication and quick response times.",
    },
    {
      icon: Shield,
      title: "Ensure Compliance",
      description:
        "Stay compliant with automated reporting, audit trails, and secure document management.",
    },
    {
      icon: Zap,
      title: "Scale Easily",
      description:
        "Grow your portfolio without increasing administrative overhead with our scalable platform.",
    },
    {
      icon: CheckCircle,
      title: "Reduce Errors",
      description:
        "Minimize human error with automated calculations, reminders, and standardized procedures.",
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

  return (
    <section
      id="benefits"
      className="py-20 bg-gradient-to-br from-blue-50 to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Syndicare Transforms Your Operations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the benefits of modern syndicate management with our
            comprehensive platform designed to save time, reduce costs, and
            improve resident satisfaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              A Step-by-Step Approach to Success
            </h3>
            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Onboard Your Properties",
                  description:
                    "Import your building data and set up your account structure in minutes.",
                },
                {
                  step: "02",
                  title: "Invite Residents",
                  description:
                    "Send personalized invitations to residents to join the portal.",
                },
                {
                  step: "03",
                  title: "Configure Workflows",
                  description:
                    "Set up automated processes for billing, maintenance, and communications.",
                },
                {
                  step: "04",
                  title: "Monitor & Optimize",
                  description:
                    "Use analytics to track performance and identify areas for improvement.",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <benefit.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {benefit.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
