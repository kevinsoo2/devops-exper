'use client';

import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

const partners = [
  { name: 'Docker', logo: 'fa-brands fa-docker', color: 'text-blue-400' },
  { name: 'AWS', logo: 'fa-brands fa-aws', color: 'text-orange-400' },
  { name: 'Google Cloud', logo: 'fa-brands fa-google', color: 'text-red-400' },
  { name: 'Microsoft Azure', logo: 'fa-brands fa-microsoft', color: 'text-blue-500' },
  { name: 'Red Hat', logo: 'fa-brands fa-redhat', color: 'text-red-500' },
  { name: 'Linux', logo: 'fa-brands fa-linux', color: 'text-yellow-400' },
  { name: 'GitHub', logo: 'fa-brands fa-github', color: 'text-gray-300' },
  { name: 'GitLab', logo: 'fa-brands fa-gitlab', color: 'text-orange-500' },
  { name: 'Python', logo: 'fa-brands fa-python', color: 'text-yellow-300' },
  { name: 'Node.js', logo: 'fa-brands fa-node-js', color: 'text-green-400' },
  { name: 'Jenkins', logo: 'fa-brands fa-jenkins', color: 'text-red-300' },
  { name: 'Digital Ocean', logo: 'fa-brands fa-digital-ocean', color: 'text-blue-300' },
];

const certifications = [
  { name: 'CKA - Certified Kubernetes Administrator', org: 'CNCF' },
  { name: 'AWS Solutions Architect', org: 'Amazon' },
  { name: 'RHCSA - Red Hat Certified System Admin', org: 'Red Hat' },
  { name: 'Terraform Associate', org: 'HashiCorp' },
  { name: 'Azure Administrator', org: 'Microsoft' },
  { name: 'Docker Certified Associate', org: 'Docker' },
];

export function PartnersSection() {
  return (
    <section className="py-20 bg-gray-50/50 dark:bg-dark-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-badge">
            <Building2 size={16} className="text-accent-400" />
            Écosystème
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold dark:text-white">
            Technologies{' '}
            <span className="gradient-text">maîtrisées</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Apprenez les technologies utilisées par les plus grandes entreprises tech du monde.
          </p>
        </div>

        {/* Scrolling Logos */}
        <div className="relative overflow-hidden py-8">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-dark to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-dark to-transparent z-10" />
          
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex gap-12 items-center"
          >
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="flex flex-col items-center gap-2 min-w-[100px] opacity-60 hover:opacity-100 transition-opacity"
              >
                <i className={`${partner.logo} text-4xl ${partner.color}`}></i>
                <span className="text-xs text-gray-500 whitespace-nowrap">{partner.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Certifications */}
        <div className="mt-16">
          <h3 className="text-center text-lg font-bold dark:text-white mb-8">
            Préparation aux certifications officielles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <div key={cert.name} className="card !p-4 flex items-center gap-3 hover:border-primary-500/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-certificate text-primary-400"></i>
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">{cert.name}</p>
                  <p className="text-xs text-gray-500">{cert.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
