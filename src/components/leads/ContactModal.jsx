import { useState } from 'react';
import { Phone, MessageCircle, X, CheckCircle } from 'lucide-react';
import Modal from '../common/Modal';
import { useLead } from '../../context/LeadContext';

export default function ContactModal({ isOpen, onClose, property }) {
  const { addLead } = useLead();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent) return;

    addLead({
      customerName: form.name,
      customerEmail: form.email,
      customerPhone: form.phone,
      propertyId: property.id,
      propertyTitle: property.title,
      agentId: property.agentId,
      agentName: property.agentName,
      message: form.message,
      source: 'contact_form',
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', message: '' });
      setConsent(false);
      onClose();
    }, 2000);
  };

  const handleWhatsApp = () => {
    const text = `Hi, I'm interested in: ${property.title} (${property.priceDisplay}). Please share more details.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (submitted) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Inquiry Sent!">
        <div className="flex flex-col items-center py-8">
          <div className="w-16 h-16 rounded-full bg-brand-emerald/10 flex items-center justify-center mb-4 animate-bounce">
            <CheckCircle size={32} className="text-brand-emerald" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Thank you!</h3>
          <p className="text-sm text-slate-500 mt-2 text-center">
            Your inquiry has been sent to <strong>{property.agentName}</strong>. They will contact you shortly.
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact Agent">
      <div className="space-y-5">
        {/* Property summary */}
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
          <p className="text-sm font-medium text-slate-700 line-clamp-1">{property.title}</p>
          <p className="text-lg font-bold text-brand-500 mt-0.5">{property.priceDisplay}</p>
        </div>

        {/* WhatsApp quick action */}
        <button onClick={handleWhatsApp} className="btn-whatsapp w-full justify-center">
          <MessageCircle size={20} />
          Chat on WhatsApp
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs text-slate-400">or fill the form</span>
          </div>
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Your Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email Address *"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="input-field"
          />
          <input
            type="tel"
            placeholder="Phone Number *"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
            className="input-field"
          />
          <textarea
            placeholder="Your message (optional)"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={3}
            className="textarea-field"
          />

          {/* Consent checkbox */}
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
            />
            <span className="text-xs text-slate-500 leading-relaxed">
              I agree to share my contact details with the property agent. I understand that the agent may contact me regarding this property.
            </span>
          </label>

          <button
            type="submit"
            disabled={!consent}
            className="btn-contact w-full justify-center"
          >
            <Phone size={18} />
            Contact Agent
          </button>
        </form>
      </div>
    </Modal>
  );
}
