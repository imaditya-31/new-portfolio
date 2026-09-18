import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, Send, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('adityavishwakarma355@gmail.com');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Trigger subtle success confetti & simulation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 }
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#05070A]/80">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-t from-cyan-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="cyan" dot className="mb-3">
            <MessageSquare size={12} className="mr-1" />
            Let's Collaborate
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Get In{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
              Touch
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Available for Senior & Mid-Senior Flutter engineering roles, enterprise consulting, and high-impact fintech initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          {/* Left Column: Direct Connect & Info Pills */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Start a Conversation
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Whether you have an upcoming mobile project, want to discuss BBPS dynamic form architectures, or have an open engineering role, my inbox is always open.
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="space-y-3">
              {/* Email with 1-click copy */}
              <div className="p-4 rounded-2xl bg-[#0D1117]/80 border border-white/[0.08] flex items-center justify-between group hover:border-cyan-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase">Email</div>
                    <a
                      href="mailto:adityavishwakarma355@gmail.com"
                      className="text-sm font-semibold text-white hover:text-cyan-300 transition-colors"
                    >
                      adityavishwakarma355@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-xl bg-white/[0.05] hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {isCopied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="p-4 rounded-2xl bg-[#0D1117]/80 border border-white/[0.08] flex items-center gap-3 hover:border-indigo-500/30 transition-all">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Phone</div>
                  <a
                    href="tel:+919657312456"
                    className="text-sm font-semibold text-white hover:text-indigo-300 transition-colors"
                  >
                    +91 9657312456
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-[#0D1117]/80 border border-white/[0.08] flex items-center gap-3 hover:border-emerald-500/30 transition-all">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Location</div>
                  <div className="text-sm font-semibold text-white">
                    Pune, Maharashtra, India
                  </div>
                </div>
              </div>
            </div>

            {/* Availability status badge */}
            <div className="p-4 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/20 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <div className="text-xs font-mono text-emerald-300">
                Currently actively evaluating senior cross-platform &amp; mobile roles.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-[#0D1117]/90 border border-white/[0.1] backdrop-blur-xl shadow-2xl"
            >
              <h3 className="text-xl font-bold text-white tracking-tight mb-2 flex items-center gap-2">
                Send a Direct Message
                <Sparkles size={16} className="text-cyan-400" />
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill out the form below or email me directly at{' '}
                <span className="text-cyan-400 font-mono">adityavishwakarma355@gmail.com</span>
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
                  <Check size={18} className="text-emerald-400 flex-shrink-0" />
                  <span>Thank you! Your message has been received. I'll get back to you shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project inquiry / Hiring opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, or role..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full justify-center"
                  icon={<Send size={16} />}
                >
                  {isSubmitting ? 'Sending Transmission...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
