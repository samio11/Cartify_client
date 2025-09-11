"use client";
import React, { useState } from "react";
import { Send, Mail, Shield, Sparkles } from "lucide-react";

export default function HomeSubscriptionSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSuccess(true);
    console.log("Subscribed with:", email);

    // Reset after success
    setTimeout(() => {
      setEmail("");
      setIsSubmitting(false);
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <section className="relative w-full py-20 px-4 overflow-hidden">
      {/* Background with gradient and animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 z-0"></div>

      {/* Animated decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-200 rounded-full opacity-40 animate-bounce delay-700"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-indigo-300 rounded-full opacity-20 animate-ping"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="md:flex">
            {/* Visual Section */}
            <div className="md:w-2/5 bg-gradient-to-br from-indigo-600 to-purple-600 p-8 text-white flex flex-col justify-center items-center relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-grid-white"></div>
              </div>

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
                <p className="text-indigo-100">
                  Be the first to know about exclusive deals and new products
                </p>

                {/* Feature list */}
                <div className="mt-8 space-y-3 text-left">
                  <div className="flex items-center">
                    <div className="bg-white/20 p-1 rounded-full mr-3">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span className="text-sm">Weekly product insights</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white/20 p-1 rounded-full mr-3">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span className="text-sm">Exclusive member discounts</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white/20 p-1 rounded-full mr-3">
                      <Shield className="h-4 w-4" />
                    </div>
                    <span className="text-sm">
                      No spam, unsubscribe anytime
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="md:w-3/5 p-10">
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full text-green-600 mb-6">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600">
                    You've been successfully subscribed to our newsletter.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Stay Updated
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Subscribe to our newsletter and never miss updates on new
                    products, special offers, and tech insights.
                  </p>

                  <form onSubmit={handleSubscribe} className="space-y-6">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 transition-all flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Subscribe Now
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-sm text-gray-500 mt-6 flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add some CSS for the background grid */}
      <style jsx>{`
        .bg-grid-white {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.2)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
    </section>
  );
}
