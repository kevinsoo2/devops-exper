'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Clock, ListChecks, Trophy } from 'lucide-react';

interface Certification {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  provider: string;
  prep_hours: number;
  exercise_count: number;
  success_rate: number;
}

export function CertificationsSection() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.certifications.list()
      .then((data) => setCerts(data.certifications))
      .catch(() => setCerts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 px-6" id="certifications">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-badge mb-4">
            <i className="fas fa-certificate"></i> Certifications
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Préparez vos <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Programmes de préparation intensifs avec 95% de taux de réussite au premier essai
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <div key={i} className="card animate-pulse h-60" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certs.map((cert) => (
              <div key={cert.id} className="card card-hover text-center">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 flex items-center justify-center text-2xl text-amber-400">
                  <i className={cert.icon}></i>
                </div>

                <h4 className="font-semibold text-sm mb-1 leading-snug">{cert.title}</h4>
                <p className="text-xs text-slate-400 mb-4">{cert.description}</p>

                {/* Details */}
                <div className="flex justify-center gap-4 text-[11px] text-slate-500 mb-5">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {cert.prep_hours}h</span>
                  <span className="flex items-center gap-1"><ListChecks className="w-3 h-3" /> {cert.exercise_count}</span>
                  <span className="flex items-center gap-1"><Trophy className="w-3 h-3" /> {cert.success_rate}%</span>
                </div>

                {/* CTA */}
                <button className="w-full py-2.5 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-semibold hover:bg-amber-500/20 transition">
                  Commencer la préparation
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
