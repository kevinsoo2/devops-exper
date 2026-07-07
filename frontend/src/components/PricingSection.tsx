'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    description: 'Pour commencer votre parcours',
    monthly: 29,
    yearly: 20,
    features: [
      { text: 'Accès aux cours fondamentaux', included: true },
      { text: '5 labs/mois', included: true },
      { text: 'Forum communautaire', included: true },
      { text: 'Certificats de complétion', included: true },
      { text: 'Labs avancés', included: false },
      { text: 'Mentorat', included: false },
      { text: 'Prépa certifications', included: false },
    ],
  },
  {
    name: 'Pro',
    description: 'Pour devenir expert',
    monthly: 79,
    yearly: 55,
    popular: true,
    features: [
      { text: 'Tous les cours (200h+)', included: true },
      { text: 'Labs illimités', included: true },
      { text: 'Forum + Discord VIP', included: true },
      { text: 'Prépa certifications', included: true },
      { text: 'Projets guidés', included: true },
      { text: '2 sessions mentorat/mois', included: true },
      { text: 'Mentorat illimité', included: false },
    ],
  },
  {
    name: 'Enterprise',
    description: 'Pour les équipes',
    monthly: 199,
    yearly: 139,
    features: [
      { text: 'Tout le plan Pro', included: true },
      { text: 'Mentorat illimité', included: true },
      { text: 'Dashboard équipe', included: true },
      { text: 'Parcours personnalisés', included: true },
      { text: 'Support prioritaire 24/7', included: true },
      { text: 'SSO & intégrations', included: true },
      { text: 'Facturation entreprise', included: true },
    ],
  },
];

export function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="py-24 px-6" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-badge mb-4">
            <i className="fas fa-tags"></i> Tarifs
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choisissez votre <span className="gradient-text">Plan</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Investissez dans votre carrière DevOps
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`text-sm ${!yearly ? 'text-white font-semibold' : 'text-slate-400'}`}>Mensuel</span>
          <button
            onClick={() => setYearly(!yearly)}
            className={`relative w-12 h-6 rounded-full transition-colors ${yearly ? 'bg-primary' : 'bg-slate-600'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${yearly ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
          <span className={`text-sm ${yearly ? 'text-white font-semibold' : 'text-slate-400'}`}>
            Annuel <span className="ml-1 text-[10px] px-2 py-0.5 bg-emerald-500/15 text-emerald-400 rounded font-bold">-30%</span>
          </span>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card relative ${plan.popular ? 'border-primary shadow-lg shadow-primary/10 scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-primary-dark text-white text-[10px] font-bold rounded-full whitespace-nowrap">
                  Le plus populaire
                </div>
              )}
              <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
              <p className="text-xs text-slate-400 mb-5">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-black">{yearly ? plan.yearly : plan.monthly}€</span>
                <span className="text-sm text-slate-500">/mois</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f.text} className={`flex items-center gap-2.5 text-sm ${f.included ? 'text-slate-300' : 'text-slate-600'}`}>
                    {f.included ? <Check className="w-4 h-4 text-emerald-400 shrink-0" /> : <X className="w-4 h-4 text-slate-600 shrink-0" />}
                    {f.text}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${
                plan.popular
                  ? 'btn-primary justify-center'
                  : 'btn-outline justify-center'
              }`}>
                {plan.name === 'Enterprise' ? 'Contacter' : `Choisir ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
