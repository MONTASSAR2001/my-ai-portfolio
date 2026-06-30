'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Let&apos;s Connect</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Have a project in mind? I&apos;d love to hear about it. Send me a message and I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="glass-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/30 dark:bg-slate-800/30 border border-white/30 dark:border-white/10 text-foreground placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/30 dark:bg-slate-800/30 border border-white/30 dark:border-white/10 text-foreground placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/30 dark:bg-slate-800/30 border border-white/30 dark:border-white/10 text-foreground placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Project Inquiry"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/30 dark:bg-slate-800/30 border border-white/30 dark:border-white/10 text-foreground placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              {submitted ? 'Message Sent!' : 'Send Message'}
            </button>

            {submitted && (
              <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700">
                <p className="text-green-800 dark:text-green-200 font-medium">
                  ✓ Thanks for reaching out! I&apos;ll be in touch soon.
                </p>
              </div>
            )}
          </form>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '📧', label: 'Email', value: 'hello@example.com' },
            { icon: '🔗', label: 'LinkedIn', value: 'linkedin.com/in/yourprofile' },
            { icon: '💻', label: 'GitHub', value: 'github.com/yourprofile' },
          ].map((contact) => (
            <div key={contact.label} className="text-center p-4">
              <div className="text-4xl mb-2">{contact.icon}</div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{contact.label}</p>
              <p className="font-semibold text-foreground">{contact.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
