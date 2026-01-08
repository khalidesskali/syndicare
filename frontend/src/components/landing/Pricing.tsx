import React from "react";
import { motion } from "framer-motion";
import { Check, Star, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Basic",
      price: "199 DHs",
      description: "Best for small syndicates and individual managers",
      features: [
        "Up to 2 buildings",
        "Up to 25 apartments",
        "1 active syndicate",
        "Expense & contribution tracking",
        "Basic reporting",
        "Email support",
      ],
      highlighted: false,
    },
    {
      name: "Professional",
      price: "499 DHs",
      description: "Best for growing and medium-sized syndicates",
      features: [
        "Up to 10 buildings",
        "Up to 150 apartments",
        "Up to 5 active syndicates",
        "Advanced financial reports",
        "Document management",
        "Priority email support",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "999 DHs",
      description: "Best for large syndicate managers and real estate firms",
      features: [
        "Up to 25 buildings",
        "Up to 500 apartments",
        "Unlimited syndicates",
        "Advanced analytics dashboard",
        "Role-based access control",
        "Dedicated support",
      ],
      highlighted: false,
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
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your syndicate size and needs. All plans
            include our core features with no hidden fees.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <Card
                className={`h-full relative ${
                  plan.highlighted
                    ? "border-2 border-blue-600 shadow-lg scale-105"
                    : "border border-gray-200 shadow-sm hover:shadow-md"
                } transition-all duration-300`}
              >
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">/month</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="/login"
                    className={`w-full ${
                      plan.highlighted
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    } px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center`}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-gray-500">
            Need a custom solution?{" "}
            <a
              href="#contact"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact our sales team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
