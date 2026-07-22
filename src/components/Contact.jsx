import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MessageCircle,
  Send,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { personal } from '../config/personal.js';
import { useToast } from '../context/ToastContext.jsx';
import Button from './ui/Button.jsx';
import Card from './ui/Card.jsx';
import SectionHeading from './SectionHeading.jsx';

const SUBJECT_OPTIONS = [
  'Python Training Inquiry',
  'AI & ML Training Inquiry',
  'Web Development Training Inquiry',
  '1:1 Mentoring Session',
  'Internship / Collaboration',
  'Other',
];

// EmailJS credentials are read from Vite env at build time (`import.meta.env.VITE_*`,
// NOT CRA's `process.env.REACT_APP_*`). Set them in `.env.local` before deploy:
//   VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const { push } = useToast();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending'
  const formRef = useRef(null);

  // Pre-fill subject when triggered from Services / Training Programs.
  useEffect(() => {
    const handler = (e) => {
      const subject = e.detail?.subject;
      if (!subject) return;
      setForm((f) => ({ ...f, subject }));
      // Move focus to the message field so the user can keep typing.
      setTimeout(() => {
        document.getElementById('contact-message')?.focus();
      }, 350);
    };
    window.addEventListener('contact-prefill', handler);
    return () => window.removeEventListener('contact-prefill', handler);
  }, []);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((cur) => (cur[field] ? { ...cur, [field]: null } : cur));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) {
      next.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email';
    }
    if (!form.subject.trim()) next.subject = 'Pick a subject';
    if (!form.message.trim() || form.message.trim().length < 10) {
      next.message = 'Message should be at least 10 characters';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');

    try {
      if (
        import.meta.env.VITE_EMAILJS_SERVICE_ID &&
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      ) {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        );
      } else {
        // No EmailJS keys configured — simulate a successful send in dev so
        // the UX is still demoable. The console message makes the gap obvious.
        // eslint-disable-next-line no-console
        console.warn(
          '[contact] EmailJS keys missing — message NOT sent. Configure VITE_EMAILJS_* env vars to enable real delivery.',
        );
        await new Promise((r) => setTimeout(r, 700));
      }

      push({
        tone: 'success',
        title: 'Message sent!',
        description: "I'll reply within 24 hours.",
      });
      setForm(initialForm);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[contact] EmailJS error', err);
      push({
        tone: 'error',
        title: 'Something went wrong',
        description: 'Try WhatsApp instead.',
      });
    } finally {
      setStatus('idle');
    }
  };

  return (
    <section id="contact" className="section bg-bg-subtle">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Connect"
          description="Internship, training, tutoring, or a project idea — drop a message and I'll reply within a day or two."
        />

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 sm:p-8">
              <form
                ref={formRef}
                onSubmit={onSubmit}
                noValidate
                className="grid gap-5"
                aria-label="Contact form"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="contact-name"
                    label="Name"
                    value={form.name}
                    onChange={update('name')}
                    error={errors.name}
                    autoComplete="name"
                    placeholder="Your name"
                  />
                  <Field
                    id="contact-email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    error={errors.email}
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                </div>

                <SelectField
                  id="contact-subject"
                  label="Subject"
                  value={form.subject}
                  onChange={update('subject')}
                  error={errors.subject}
                  options={SUBJECT_OPTIONS}
                />

                <TextareaField
                  id="contact-message"
                  label="Message"
                  value={form.message}
                  onChange={update('message')}
                  error={errors.message}
                  placeholder="What are you working on, or what would you like to learn?"
                  rows={5}
                />

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <p className="text-xs text-ink-subtle">
                    Or email me directly at{' '}
                    <a
                      href={`mailto:${personal.email}`}
                      className="text-ink-muted underline-offset-2 hover:text-ink hover:underline"
                    >
                      {personal.email}
                    </a>
                  </p>
                  <Button type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="grid gap-3 content-start"
          >
            <ContactLink
              icon={<Mail className="h-5 w-5" />}
              label="Email"
              value={personal.email}
              href={`mailto:${personal.email}`}
            />
            <ContactLink
              icon={<MessageCircle className="h-5 w-5" />}
              label="WhatsApp"
              value={`+${personal.whatsappNumber}`}
              href={personal.whatsappUrl}
              external
            />
            <ContactLink
              icon={<Linkedin className="h-5 w-5" />}
              label="LinkedIn"
              value="linkedin.com/in/yuvaraj-dudukuru"
              href={personal.socials.linkedin}
              external
            />
            <ContactLink
              icon={<Github className="h-5 w-5" />}
              label="GitHub"
              value="github.com/yuvaraj-dudukuru"
              href={personal.socials.github}
              external
            />

            <p className="mt-2 px-2 text-xs text-ink-subtle">
              Based in {personal.location}. Replies usually within 24–48 hours.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, error, ...rest }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink-muted">
        {label}
      </label>
      <input
        id={id}
        {...rest}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClasses(!!error)}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({ id, label, error, options, value, onChange }) {
  // Allow values that are not in the canonical list (e.g. specific training
  // variants prefilled from a service card). Add a temporary option so the
  // <select> reflects whatever was set.
  const hasExtra = value && !options.includes(value);
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink-muted">
        Subject
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClasses(!!error)}
      >
        <option value="" disabled>
          Pick a topic
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
        {hasExtra && (
          <option key={value} value={value}>
            {value}
          </option>
        )}
      </select>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

function TextareaField({ id, label, error, rows = 5, ...rest }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink-muted">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        {...rest}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputClasses(!!error)} resize-y min-h-[120px]`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClasses(hasError) {
  const base =
    'mt-1.5 w-full border-4 bg-bg-raised px-3.5 py-2.5 text-sm font-bold text-ink placeholder:text-ink shadow-neo transition-all focus-ring';
  return hasError
    ? `${base} border-red-600`
    : `${base} border-ink hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-hover focus:border-ink`;
}

function ContactLink({ icon, label, value, href, external = false }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="neo-hover group flex items-center justify-between border-4 border-ink bg-bg-subtle p-4 focus-ring"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center border-4 border-ink bg-accent text-ink shadow-neo">
          {icon}
        </span>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-ink-subtle">
            {label}
          </p>
          <p className="mt-0.5 text-sm font-medium text-ink">{value}</p>
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 text-ink-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
    </a>
  );
}
