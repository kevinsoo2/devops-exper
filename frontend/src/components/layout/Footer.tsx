import Link from 'next/link';

const footerLinks = {
  Plateforme: [
    { label: 'Formations', href: '/courses' },
    { label: 'Labs', href: '/labs' },
    { label: 'Outils', href: '/tools' },
    { label: 'Certifications', href: '/certifications' },
    { label: 'Parcours', href: '/roadmap' },
  ],
  Communauté: [
    { label: 'Forum', href: '/community' },
    { label: 'Blog', href: '/blog' },
    { label: 'Mentorat', href: '/mentoring' },
    { label: 'Classement', href: '/achievements' },
    { label: 'Discord', href: '#' },
  ],
  Ressources: [
    { label: 'Documentation', href: '#' },
    { label: 'Référence API', href: '#' },
    { label: 'Changelog', href: '#' },
    { label: 'Statut', href: '#' },
    { label: 'Support', href: '#' },
  ],
  Entreprise: [
    { label: 'À propos', href: '#' },
    { label: 'Carrières', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Partenaires', href: '#' },
    { label: 'Presse', href: '#' },
  ],
  Légal: [
    { label: 'Politique de confidentialité', href: '#' },
    { label: "Conditions d'utilisation", href: '#' },
    { label: 'Politique de cookies', href: '#' },
    { label: 'RGPD', href: '#' },
    { label: 'Licences', href: '#' },
  ],
};

const socials = [
  { icon: 'fa-brands fa-github', href: '#', label: 'GitHub' },
  { icon: 'fa-brands fa-twitter', href: '#', label: 'Twitter' },
  { icon: 'fa-brands fa-discord', href: '#', label: 'Discord' },
  { icon: 'fa-brands fa-linkedin', href: '#', label: 'LinkedIn' },
  { icon: 'fa-brands fa-youtube', href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-dark border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DE</span>
              </div>
              <span className="font-bold dark:text-white">DevOps Expert</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              La plateforme ultime pour maîtriser l&apos;ingénierie DevOps.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all text-gray-600 dark:text-gray-400"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm dark:text-white mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} DevOps Expert Academy. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-gray-500 hover:text-primary-500">
              Confidentialité
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-primary-500">
              Conditions
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-primary-500">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
