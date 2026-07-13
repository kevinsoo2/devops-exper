'use client';

import { useState } from 'react';
import { Award, Download, Share2, Calendar, Clock } from 'lucide-react';
import { SocialShare } from './SocialShare';

interface CertificateProps {
  courseName: string;
  userName: string;
  completionDate: string;
  duration: string;
  courseId?: string;
}

export function Certificate({ courseName, userName, completionDate, duration, courseId }: CertificateProps) {
  const [showShare, setShowShare] = useState(false);

  const downloadCertificate = () => {
    // Generate a simple text certificate for download
    const certContent = `
═══════════════════════════════════════════════════════════
                    CERTIFICAT DE COMPLÉTION
═══════════════════════════════════════════════════════════

                    DevOps Expert Academy

     Certifie que

                    ${userName}

     a complété avec succès la formation

                    ${courseName}

     Durée: ${duration}
     Date de complétion: ${completionDate}

     ID Certificat: DEA-${courseId || Date.now()}-${userName.replace(/\s/g, '').toUpperCase().slice(0, 4)}

═══════════════════════════════════════════════════════════
     Ce certificat atteste de la complétion du cours
     sur la plateforme DevOps Expert Academy.
═══════════════════════════════════════════════════════════
`;
    const blob = new Blob([certContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificat-${courseName.replace(/\s/g, '-').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card border-accent-500/30 bg-gradient-to-br from-dark-card to-accent-900/5 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative text-center py-6">
        {/* Badge */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-lg shadow-accent-500/30">
          <Award size={32} className="text-white" />
        </div>

        <p className="text-xs text-accent-400 font-semibold uppercase tracking-wider mb-2">Certificat de Complétion</p>
        <h3 className="text-xl font-bold text-white mb-1">{courseName}</h3>
        <p className="text-sm text-gray-400">Délivré à <strong className="text-white">{userName}</strong></p>

        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Calendar size={12} /> {completionDate}</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {duration}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button onClick={downloadCertificate} className="btn-primary text-sm">
            <Download size={14} /> Télécharger
          </button>
          <SocialShare title={courseName} type="course" />
        </div>
      </div>
    </div>
  );
}
