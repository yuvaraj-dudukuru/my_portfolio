import { Loader2, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { courses, mentoring } from '../data/courses.js';
import { profile } from '../data/profile.js';
import { useToast } from '../context/ToastContext.jsx';
import Button from './ui/Button.jsx';

// Options are derived from the course data, so every "enquire" CTA on the site
// lands on a subject that actually exists in this list.
const SUBJECT_OPTIONS = [
  'Engineering work or collaboration',
  ...courses.map((course) => course.enrollSubject),
  mentoring.enrollSubject,
  'Internship',
  'Something else',
];

const EMPTY = { name: '', email: '', subject: '', message: '' };

const inputClass = (hasError) =>
  [
    'mt-2 w-full border-2 bg-bg px-3.5 py-3 text-sm font-medium text-ink transition-colors',
    'placeholder:font-normal placeholder:text-faint',
    hasError ? 'border-critical' : 'border-hard hover:bg-surface',
  ].join(' ');

function Field({ id, label, error, hint, as = 'input', options, ...rest }) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
    .filter(Boolean)
    .join(' ');

  const shared = {
    id,
    name: id,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': describedBy || undefined,
    className: inputClass(Boolean(error)),
    ...rest,
  };

  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>

      {as === 'textarea' ? (
        <textarea {...shared} rows={6} className={`${shared.className} min-h-[9rem] resize-y`} />
      ) : as === 'select' ? (
        <select {...shared}>
          <option value="">Choose a topic</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input {...shared} />
      )}

      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-faint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-critical">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function ContactForm() {
  const { push } = useToast();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const formRef = useRef(null);
  const honeypotRef = useRef(null);

  // Course and mentoring CTAs link here with ?subject=…; honour it only when it
  // matches a real option so the value cannot be used to inject arbitrary text.
  useEffect(() => {
    const requested = searchParams.get('subject');
    if (requested && SUBJECT_OPTIONS.includes(requested)) {
      setForm((current) => ({ ...current, subject: requested }));
    }
  }, [searchParams]);

  const update = (field) => (event) => {
    const { value } = event.target;
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => (current[field] ? { ...current, [field]: null } : current));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please tell me who you are.';
    if (!form.email.trim()) {
      next.email = 'I need an address to reply to.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'That does not look like an email address.';
    }
    if (!form.subject) next.subject = 'Pick the closest topic.';
    if (form.message.trim().length < 10) {
      next.message = 'A sentence or two, so I can give you a useful reply.';
    }
    setErrors(next);
    return next;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // Bots fill hidden fields; people do not.
    if (honeypotRef.current?.value) return;

    const found = validate();
    if (Object.keys(found).length) {
      const firstField = ['name', 'email', 'subject', 'message'].find((key) => found[key]);
      formRef.current?.querySelector(`#${firstField}`)?.focus();
      return;
    }

    setStatus('sending');

    const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY } =
      import.meta.env;

    try {
      if (VITE_EMAILJS_SERVICE_ID && VITE_EMAILJS_TEMPLATE_ID && VITE_EMAILJS_PUBLIC_KEY) {
        // Loaded on submit rather than on page load: the SDK is dead weight for
        // everyone who never sends a message.
        const { default: emailjs } = await import('@emailjs/browser');
        await emailjs.send(
          VITE_EMAILJS_SERVICE_ID,
          VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
          },
          VITE_EMAILJS_PUBLIC_KEY,
        );
      } else {
        // eslint-disable-next-line no-console
        console.warn(
          '[contact] EmailJS environment variables missing — the message was NOT sent. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY.',
        );
        throw new Error('Email delivery is not configured.');
      }

      setStatus('sent');
      setForm(EMPTY);
      push({
        tone: 'success',
        title: 'Message sent',
        description: 'I usually reply within a day or two.',
      });
    } catch (error) {
      setStatus('idle');
      // eslint-disable-next-line no-console
      console.error('[contact] send failed', error);
      push({
        tone: 'error',
        title: 'That did not send',
        description: `Email me directly at ${profile.email}.`,
      });
    }
  };

  if (status === 'sent') {
    return (
      <div className="card p-7 sm:p-8" role="status">
        <p className="label text-accent-text">Sent</p>
        <p className="mt-4 text-display-sm font-extrabold uppercase tracking-tight text-ink">Thanks — it arrived.</p>
        <p className="prose-body mt-3">
          I read everything that comes in and usually reply within a day or two. If it is urgent,{' '}
          <a href={profile.whatsappUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-ink">
            WhatsApp
          </a>{' '}
          is faster.
        </p>
        <Button variant="secondary" className="mt-7" onClick={() => setStatus('idle')}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="card flex flex-col gap-6 p-6 sm:p-8"
      aria-labelledby="contact-form-title"
    >
      <h2 id="contact-form-title" className="label">
        Send a message
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          value={form.name}
          onChange={update('name')}
          error={errors.name}
          autoComplete="name"
          placeholder="Your name"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={update('email')}
          error={errors.email}
          autoComplete="email"
          placeholder="you@example.com"
        />
      </div>

      <Field
        id="subject"
        label="Topic"
        as="select"
        options={SUBJECT_OPTIONS}
        value={form.subject}
        onChange={update('subject')}
        error={errors.subject}
      />

      <Field
        id="message"
        label="Message"
        as="textarea"
        value={form.message}
        onChange={update('message')}
        error={errors.message}
        placeholder="What are you building, or what would you like to learn?"
        hint="Context helps. What you are working on, where you are stuck, or what you want out of it."
      />

      {/* Honeypot: off-screen and hidden from assistive tech, not display:none,
          so naive bots still fill it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" ref={honeypotRef} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-hard pt-6">
        <p className="text-xs text-faint">
          Or email{' '}
          <a href={`mailto:${profile.email}`} className="link-underline text-muted">
            {profile.email}
          </a>
        </p>
        <Button type="submit" size="lg" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Send message
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
