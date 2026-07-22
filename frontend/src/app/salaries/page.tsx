'use client';

import { DollarSign, TrendingUp, MapPin, Briefcase } from 'lucide-react';

const salaryData = [
  { role: 'Administrateur Système', junior: '28-35K', mid: '35-45K', senior: '45-55K', icon: '🖥️' },
  { role: 'Ingénieur DevOps', junior: '35-45K', mid: '45-65K', senior: '65-85K', icon: '⚙️' },
  { role: 'SRE', junior: '40-50K', mid: '55-70K', senior: '70-95K', icon: '📊' },
  { role: 'Cloud Architect', junior: '45-55K', mid: '60-80K', senior: '80-120K', icon: '☁️' },
  { role: 'DevSecOps Engineer', junior: '38-48K', mid: '50-70K', senior: '70-90K', icon: '🔒' },
  { role: 'Platform Engineer', junior: '40-50K', mid: '55-75K', senior: '75-100K', icon: '🏗️' },
  { role: 'DBA', junior: '30-40K', mid: '42-58K', senior: '58-75K', icon: '🗄️' },
  { role: 'Network Engineer', junior: '28-38K', mid: '38-55K', senior: '55-70K', icon: '🌐' },
  { role: 'Kubernetes Specialist', junior: '40-50K', mid: '55-75K', senior: '75-100K', icon: '☸️' },
  { role: 'CI/CD Engineer', junior: '35-42K', mid: '45-60K', senior: '60-80K', icon: '🔄' },
];

const certSalaryBoost = [
  { cert: 'CKA (Kubernetes)', boost: '+8-15K€', difficulty: 'Intermédiaire' },
  { cert: 'AWS Solutions Architect', boost: '+10-20K€', difficulty: 'Intermédiaire' },
  { cert: 'RHCE (Red Hat)', boost: '+5-12K€', difficulty: 'Avancé' },
  { cert: 'Terraform Associate', boost: '+5-10K€', difficulty: 'Intermédiaire' },
  { cert: 'Azure Administrator', boost: '+8-15K€', difficulty: 'Intermédiaire' },
  { cert: 'CISSP', boost: '+15-25K€', difficulty: 'Expert' },
];

export default function SalariesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-badge">
            <DollarSign size={16} className="text-success-400" />
            Salaires
          </span>
          <h1 className="text-4xl font-bold dark:text-white mt-4">
            Salaires <span className="gradient-text">DevOps</span> en France
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Grilles salariales 2026 par rôle et niveau d&apos;expérience. Données basées sur les offres du marché français.
          </p>
        </div>

        {/* Salary Table */}
        <div className="card !p-0 overflow-hidden mb-10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800/50">
                  <th className="text-left px-5 py-4 text-xs text-gray-400 font-semibold">Métier</th>
                  <th className="text-center px-4 py-4 text-xs text-green-400 font-semibold">Junior (0-2 ans)</th>
                  <th className="text-center px-4 py-4 text-xs text-yellow-400 font-semibold">Confirmé (3-5 ans)</th>
                  <th className="text-center px-4 py-4 text-xs text-red-400 font-semibold">Senior (5+ ans)</th>
                </tr>
              </thead>
              <tbody>
                {salaryData.map((row, i) => (
                  <tr key={i} className="border-t border-gray-800 hover:bg-gray-800/20 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{row.icon}</span>
                        <span className="text-sm font-medium text-white">{row.role}</span>
                      </div>
                    </td>
                    <td className="text-center px-4 py-3.5 text-sm text-green-400">{row.junior}€</td>
                    <td className="text-center px-4 py-3.5 text-sm text-yellow-400 font-medium">{row.mid}€</td>
                    <td className="text-center px-4 py-3.5 text-sm text-red-400 font-bold">{row.senior}€</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Certification Boost */}
        <div className="card mb-10">
          <h2 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-accent-400" />
            Impact des Certifications sur le Salaire
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {certSalaryBoost.map((cert, i) => (
              <div key={i} className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50">
                <p className="font-medium text-white text-sm">{cert.cert}</p>
                <p className="text-success-400 font-bold text-sm mt-1">{cert.boost}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{cert.difficulty}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Location factor */}
        <div className="card">
          <h2 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-secondary-400" />
            Facteur Géographique
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center p-3 rounded-xl bg-gray-800/30">
              <p className="text-xs text-gray-500">Paris/IDF</p>
              <p className="text-lg font-bold text-white">+15-25%</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-gray-800/30">
              <p className="text-xs text-gray-500">Lyon/Toulouse</p>
              <p className="text-lg font-bold text-white">+5-10%</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-gray-800/30">
              <p className="text-xs text-gray-500">Remote 100%</p>
              <p className="text-lg font-bold text-white">+10-15%</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-gray-800/30">
              <p className="text-xs text-gray-500">Suisse/Luxembourg</p>
              <p className="text-lg font-bold text-white">x2-3</p>
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="text-center text-xs text-gray-600 mt-6">
          💡 Les salaires sont en brut annuel. Données indicatives basées sur le marché français 2026.
          Les salaires varient selon l&apos;entreprise, la localisation et la spécialisation.
        </p>
      </div>
    </div>
  );
}
