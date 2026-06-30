'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

export function ContactFooter() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', company: '', message: '' })
  }

  return (
    <>
      {/* Contact Section */}
      <section id="contact" ref={ref} className="py-20 md:py-32 px-4 md:px-8 bg-off-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-blue-accent tracking-widest uppercase">Get in Touch</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Let&apos;s Talk
            </h2>
            <p className="text-xl text-gray-dark max-w-2xl mx-auto">
              Ready to transform your enterprise with AI and advanced hardware integration? We&apos;d love to hear from you.
            </p>
          </div>

          {/* Contact Form & Info */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className={`transition-all duration-1000 ${isVisible ? 'slide-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-light focus:border-blue-accent focus:outline-none transition-colors bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-light focus:border-blue-accent focus:outline-none transition-colors bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your company"
                    className="w-full px-4 py-3 rounded-lg border border-gray-light focus:border-blue-accent focus:outline-none transition-colors bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-light focus:border-blue-accent focus:outline-none transition-colors bg-white resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-navy-light text-white px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className={`transition-all duration-1000 ${isVisible ? 'scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-xl border border-gray-light hover:border-blue-accent hover:shadow-lg transition-all">
                  <div className="flex gap-4 items-start">
                    <div className="text-3xl">📍</div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">Headquarters</h3>
                      <p className="text-gray-dark">123 Innovation Drive<br />San Francisco, CA 94105<br />United States</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl border border-gray-light hover:border-blue-accent hover:shadow-lg transition-all">
                  <div className="flex gap-4 items-start">
                    <div className="text-3xl">📧</div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">Email</h3>
                      <p className="text-gray-dark"><a href="mailto:hello@nexusai.com" className="hover:text-blue-accent transition-colors">hello@nexusai.com</a></p>
                      <p className="text-gray-dark"><a href="mailto:sales@nexusai.com" className="hover:text-blue-accent transition-colors">sales@nexusai.com</a></p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl border border-gray-light hover:border-blue-accent hover:shadow-lg transition-all">
                  <div className="flex gap-4 items-start">
                    <div className="text-3xl">📞</div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">Phone</h3>
                      <p className="text-gray-dark"><a href="tel:+14155551234" className="hover:text-blue-accent transition-colors">+1 (415) 555-1234</a></p>
                      <p className="text-gray-dark text-sm mt-2 text-muted-foreground">Available Mon-Fri, 9 AM - 6 PM PST</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary to-navy-light p-8 rounded-xl text-white">
                  <h3 className="text-lg font-semibold mb-2">Response Time</h3>
                  <p className="text-white/90">We typically respond to inquiries within 24 hours. For urgent matters, please call our sales team.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
                <span className="font-bold text-lg">Nexus AI</span>
              </div>
              <p className="text-white/70 text-sm">Pioneering enterprise AI solutions with seamless hardware integration.</p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#team" className="hover:text-white transition-colors">Team</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-white/70">
              © {new Date().getFullYear()} Nexus AI. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">LinkedIn</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Twitter</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
