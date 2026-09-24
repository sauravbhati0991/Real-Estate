import { mockSubscriptions } from '../../data/mockBanners';
import { Check, Star } from 'lucide-react';

export default function SubscriptionPlansPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 font-['Outfit']">Subscription Plans</h1>
          <p className="text-sm text-slate-500 mt-1">Manage agent subscription tiers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockSubscriptions.map((plan, idx) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl border-2 shadow-soft p-6 relative animate-fade-in ${
                plan.highlighted
                  ? 'border-brand-500 shadow-floating'
                  : 'border-slate-200'
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                  <Star size={12} className="fill-white" /> Most Popular
                </div>
              )}

              <h3 className="text-lg font-bold text-slate-900 mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-slate-900">{plan.priceDisplay.split('/')[0]}</span>
                <span className="text-sm text-slate-400">/month</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check size={16} className="text-brand-emerald mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                plan.highlighted
                  ? 'btn-primary'
                  : 'btn-secondary'
              }`}>
                Edit Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
