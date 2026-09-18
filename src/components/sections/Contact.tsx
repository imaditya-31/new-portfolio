import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, Send, Copy, Check, MessageSquare, Sparkles, Clock } from 'lucide-react';
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
  const [submissionType, setSubmissionType] = useState<'direct' | 'mailto'>('direct');

  const copyEmail = () => {
    navigator.clipboard.writeText('adityaa.inwork@gmail.com');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subjectEncoded = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject || 'Engineering Opportunity / Collaboration'}`);
    const bodyEncoded = encodeURIComponent(
      `Hi Aditya,\n\nMy name is ${formData.name} (${formData.email}).\n\n${formData.message}\n\n---\nSent via Portfolio Contact Form`
    );
    const mailtoUrl = `mailto:adityaa.inwork@gmail.com?subject=${subjectEncoded}&body=${bodyEncoded}`;

    try {
      const endpoint = import.meta.env.VITE_FORM_ENDPOINT || 'https://formsubmit.co/ajax/adityaa.inwork@gmail.com';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Inquiry',
          message: formData.message,
          _subject: `[Portfolio Inquiry] ${formData.subject || 'Opportunity'} from ${formData.name}`,
          _captcha: 'false',
          _template: 'table'
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setSubmissionType('direct');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 }
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Submission returned non-ok status');
      }
    } catch {
      // Fallback: If network or adblocker blocks direct transmission, route through mail client
      setSubmitted(true);
      setSubmissionType('mailto');
      window.location.href = mailtoUrl;
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitted(false), 12000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-[#07090E]/80">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-t from-cyan-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-sm">
            <MessageSquare size={13} className="text-cyan-600 dark:text-cyan-400" />
            <span>05 // Direct Transmission</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Initiate Contact &amp; Engineering Consultation
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Available for new project builds, collaborating on existing Flutter codebases, and specialized freelance contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          {/* Left Column: Direct Connect & Info Pills */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Start a Conversation
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Whether you have an upcoming mobile project from scratch, want to collaborate on existing Flutter architectures, or need specialized freelance engineering, my inbox is always open.
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="space-y-3">
              {/* Email with 1-click copy */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0D121D]/80 border border-slate-200/80 dark:border-white/[0.08] shadow-sm flex items-center justify-between group hover:border-cyan-500/40 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">Email</div>
                    <a
                      href="mailto:adityaa.inwork@gmail.com"
                      className="text-sm font-semibold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
                    >
                      adityaa.inwork@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/[0.05] hover:bg-cyan-500/20 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all cursor-pointer inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {isCopied ? <Check size={16} className="text-emerald-500 dark:text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0D121D]/80 border border-slate-200/80 dark:border-white/[0.08] shadow-sm flex items-center gap-3 hover:border-indigo-500/40 transition-all">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">Phone</div>
                  <a
                    href="tel:+919657312456"
                    className="text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                  >
                    +91 9657312456
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0D121D]/80 border border-slate-200/80 dark:border-white/[0.08] shadow-sm flex items-center gap-3 hover:border-emerald-500/40 transition-all">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">Location</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    Pune, Maharashtra, India
                  </div>
                </div>
              </div>
            </div>

            {/* Availability & Turnaround SLA Card */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0D121D]/80 border border-slate-200/80 dark:border-white/[0.08] shadow-sm space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 flex-shrink-0" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Available for Hire
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  Quick Turnaround
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Available for New Projects, Architecture Consulting &amp; Specialized Freelance Contracts.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Clock size={12} className="text-emerald-600 dark:text-emerald-400" />
                  Expected turnaround:
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  Replies within 24 hours
                  <span className="inline-block w-1 h-3 bg-emerald-500 animate-pulse rounded-[1px]" />
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white dark:bg-[#0D121D]/90 border border-slate-200/90 dark:border-white/[0.1] backdrop-blur-xl shadow-lg dark:shadow-2xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    Send a Direct Message
                    <Sparkles size={16} className="text-cyan-500 dark:text-cyan-400" />
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Fill out the form below or email me directly at{' '}
                    <a href="mailto:adityaa.inwork@gmail.com" className="text-cyan-600 dark:text-cyan-400 font-mono font-semibold hover:underline">
                      adityaa.inwork@gmail.com
                    </a>
                  </p>
                </div>
                <div className="self-start sm:self-center inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-mono shadow-sm flex-shrink-0">
                  <Clock size={12} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Replies in &lt; 24h</span>
                  <span className="inline-block w-1 h-3 bg-emerald-500 dark:bg-emerald-400 animate-pulse rounded-[1px]" />
                </div>
              </div>

              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-sm flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Check size={18} className="text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    <span>
                      {submissionType === 'direct'
                        ? 'Transmission sent! Your message was delivered directly to adityaa.inwork@gmail.com.'
                        : 'Inquiry prepared! Opening your mail client to send directly to adityaa.inwork@gmail.com.'}
                    </span>
                  </div>
                  <a
                    href="mailto:adityaa.inwork@gmail.com"
                    className="text-xs font-mono font-bold underline hover:text-emerald-800 dark:hover:text-emerald-200"
                  >
                    Open Mail App ↗
                  </a>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1.5 uppercase">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1.5 uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1.5 uppercase">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project inquiry / Hiring opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1.5 uppercase">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, or role..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
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

                <div className="flex items-center justify-center gap-2 pt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <Clock size={13} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Typically replies within 24 hours • Direct inbox delivery</span>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
