'use client'

import React from "react"

import { useState } from 'react'
import { Mail, Linkedin, Github, Twitter } from 'lucide-react'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Open email client with pre-filled data
    const subject = encodeURIComponent(formData.subject || 'GitHub API Handbook Inquiry')
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    window.location.href = `mailto:contact@prodhosh.com?subject=${subject}&body=${body}`
    
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 2000)
  }

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-60"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 px-6 py-12">
        {/* Top Button */}
        <div className="flex justify-center mb-12">
          <button className="px-4 py-2 border border-blue-500 text-blue-400 rounded-lg text-sm hover:bg-blue-500/10 transition">
            Get In Touch
          </button>
        </div>

        {/* Main Title */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Contact Me
          </h1>
          <p className="text-slate-300 text-lg">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left: Profile Card */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 backdrop-blur text-center">
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-blue-500 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">PV</span>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-blue-400 mb-1">Prodhosh VS</h2>
              <p className="text-slate-400 text-sm mb-1">Web Developer</p>
              <p className="text-slate-500 text-sm mb-4">ML & AI Enthusiast</p>

              <p className="text-slate-300 text-sm leading-relaxed">
                Passionate about web development, machine learning, artificial intelligence, and building
                innovative solutions.
              </p>
            </div>

            {/* Social Links */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 backdrop-blur">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Connect With Me</h3>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="mailto:contact@prodhosh.com"
                  className="flex items-center gap-3 px-4 py-3 border border-slate-700 rounded-lg hover:bg-slate-800 transition text-slate-300"
                >
                  <Mail size={20} />
                  <span className="text-sm font-medium">Gmail</span>
                </a>
                <a
                  href="https://linkedin.com/in/prodhosh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 border border-slate-700 rounded-lg hover:bg-slate-800 transition text-slate-300"
                >
                  <Linkedin size={20} />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
                <a
                  href="https://github.com/prodhosh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 border border-slate-700 rounded-lg hover:bg-slate-800 transition text-slate-300"
                >
                  <Github size={20} />
                  <span className="text-sm font-medium">GitHub</span>
                </a>
                <a
                  href="https://twitter.com/prodhosh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 border border-slate-700 rounded-lg hover:bg-slate-800 transition text-slate-300"
                >
                  <Twitter size={20} />
                  <span className="text-sm font-medium">Twitter</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 backdrop-blur">
            <h3 className="text-2xl font-bold text-blue-400 mb-6">Send a Message</h3>

            {submitted ? (
              <div className="flex items-center justify-center h-80">
                <div className="text-center">
                  <div className="text-green-400 text-5xl mb-4">✓</div>
                  <p className="text-slate-300 font-medium">Message sent! Thank you for reaching out.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-slate-300 text-sm mb-2">
                    <span>👤</span>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                    required
                    suppressHydrationWarning
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-slate-300 text-sm mb-2">
                    <span>📧</span>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                    required
                    suppressHydrationWarning
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="flex items-center gap-2 text-slate-300 text-sm mb-2">
                    <span>📝</span>
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                    suppressHydrationWarning
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="flex items-center gap-2 text-slate-300 text-sm mb-2">
                    <span>💬</span>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition resize-none"
                    required
                    suppressHydrationWarning
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>🚀</span>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
