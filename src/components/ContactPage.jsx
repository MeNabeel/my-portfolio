import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CustomCursor from './cursor/CustomCursor';

const ContactPage = () => {
  const [result, setResult] = useState("");
  const [status, setStatus] = useState(""); // "success" or "error" or "loading"

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setResult("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", "957cdcc1-2dae-45e7-875f-91500722553e");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setResult("Message sent successfully! I'll get back to you soon.");
        event.target.reset();
      } else {
        setStatus("error");
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      setStatus("error");
      setResult("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0c29] pt-24 pb-12 animate-fade-in flex flex-col text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[length:50px_50px] bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] animate-grid-move"></div>
      </div>

      <CustomCursor />
      <div className="relative z-50">
        <Header />
      </div>

      <div className="container mx-auto px-6 flex-grow flex items-center justify-center my-8 md:my-16 relative z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full border border-white/20 animate-slide-in-right relative">

          <div className="mb-8">
            <Link to="/" className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-red-500/80 hover:rotate-90 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg hover:shadow-red-500/50" title="Back to Home">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-gray-300 text-lg">Have a question or want to work together? Leave a message!</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/30 focus:bg-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 outline-none placeholder-gray-500 shadow-inner"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-white transition-colors">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/30 focus:bg-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none placeholder-gray-500 shadow-inner"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="group">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-white transition-colors">Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/30 focus:bg-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 outline-none placeholder-gray-500 shadow-inner"
                placeholder="Project Inquiry"
              />
            </div>

            <div className="group">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-white transition-colors">Message</label>
              <textarea
                name="message"
                id="message"
                rows="5"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/30 focus:bg-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none resize-y placeholder-gray-500 shadow-inner"
                placeholder="Hi Nabeel, I'd like to talk about..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-500 transform hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] flex justify-center items-center ${status === "loading" ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {status === "loading" ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>

            {result && (
              <div className={`mt-4 p-4 rounded-lg text-center ${status === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                {result}
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
