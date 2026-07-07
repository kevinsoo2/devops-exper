import Link from 'next/link';
import { Infinity } from 'lucide-react';

const footerLinks = {
  Formations: ['Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Monitoring', 'DevSecOps'],
  Ressources: ['Blog', 'Documentation', 'Roadmap', 'Cheat Sheets', 'Podcasts', 'Webinars'],
  Communauté: ['Discord', 'Forum', 'Meetups', 'Mentorat', 'Open Source', 'Emplois'],
  Entreprise: ['À propos', 'Tarifs', 'Pour les équipes', 'Partenariats', 'CGU', 'Contact'],
};

export function Footer() {
  return (
    <footer className="bg-dark border-t border-slate-700/50 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 text-xl font-bold mb-4">
              <Infinity className="w-6 h-6 text-primary" />
              <span>DevOps<strong className="text-primary-light">Expert</strong></span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              La plateforme de référence pour devenir expert DevOps. Formations, labs, certifications et communauté.
            </p>
            <div className="flex gap-3">
              {['github', 'discord', 'twitter', 'linkedin', 'youtube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 hover:-translate-y-1"
                >
                  <i className={`fab fa-${social} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-400 hover:text-primary-light hover:pl-1 transition-all">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700/50 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; 2026 DevOps Expert Academy. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-light transition">Mentions légales</a>
            <a href="#" className="hover:text-primary-light transition">Confidentialité</a>
            <a href="#" className="hover:text-primary-light transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
