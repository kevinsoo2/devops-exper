'use client';

import { useState } from 'react';
import { Check, Zap, Crown, Rocket } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'Parfait pour débuter avec le DevOps.',
    features: [
      'Accès à 10 formations gratuites',
      '3 labs par mois',
      'Accès au forum communautaire',
      'Suivi de progression basique',
      'Support par email',
    ],
    cta: 'Commencer gratuitement',
    popular: false,
    gradient: 'from-gray-500 to-gray-600',
  },
  {
    name: 'Pro',
    icon: Crown,
    monthlyPrice: 29,
    yearlyPrice: 290,
    description: 'Pour les apprenants sérieux prêts à accélérer leur carrière.',
    features: [
      'Toutes les 120+ formations',
      'Labs illimités',
      'Toutes les certifications',
      'Sessions de mentorat (2/mois)',
      'Support prioritaire',
      'Canaux Discord exclusifs',
      'Ressources téléchargeables',
    ],
    cta: 'Démarrer l\'essai Pro',
    popular: true,
    gradient: 'from-primary-500 to-primary-600',
  },
  {
    name: 'Entreprise',
    icon: Rocket,
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: 'Pour les équipes et organisations qui développent les compétences DevOps.',
    features: [
      'Tout dans Pro',
      'Tableau de bord de gestion d\'équipe',
      'Parcours d\'apprentissage personnalisés',
      'Mentorat illimité',
      'Intégration SSO & SAML',
      'Certifications personnalisées',
      'Gestionnaire de compte dédié',
      'Accès API',
    ],
    cta: 'Contacter l\'équipe commerciale',
    popular: false,
    gradient: 'from-accent-500 to-accent-600',
  },
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-24 bg-gray-50 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-badge">
            <Crown size={16} />
            Tarifs
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold dark:text-white">
            Des tarifs <span className="gradient-text">simples et transparents</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Choisissez le plan adapté à vos objectifs. Tous les plans incluent un essai gratuit de 14 jours.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${!isYearly ? 'dark:text-white' : 'text-gray-500'}`}>Mensuel</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              isYearly ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-700'
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                isYearly ? 'translate-x-8' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${isYearly ? 'dark:text-white' : 'text-gray-500'}`}>
            Annuel
            <span className="ml-1 text-xs text-success-400">(Économisez 17%)</span>
          </span>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.name}
                className={`card relative ${
                  plan.popular ? 'border-primary-500 shadow-lg shadow-primary-500/20 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-500 text-white text-xs font-bold rounded-full">
                    Le plus populaire
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4`}>
                  <Icon size={24} className="text-white" />
                </div>

                <h3 className="text-xl font-bold dark:text-white">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>

                <div className="mt-4 mb-6">
                  <span className="text-4xl font-black dark:text-white">
                    ${price}
                  </span>
                  {price > 0 && (
                    <span className="text-gray-500 text-sm">/{isYearly ? 'an' : 'mois'}</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check size={16} className="text-success-400 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/30'
                      : 'border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-500 hover:text-primary-500'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
