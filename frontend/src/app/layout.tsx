import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/layout/Providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { SearchModal } from '@/components/ui/SearchModal';

export const metadata: Metadata = {
  title: 'DevOps Expert Academy - Devenez Expert DevOps',
  description:
    'Plateforme complète pour devenir expert DevOps. Formations, labs pratiques, certifications et communauté.',
  keywords: ['DevOps', 'Cloud', 'Kubernetes', 'Docker', 'CI/CD', 'Plateforme de formation'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className="font-sans overflow-x-hidden">
        <Providers>
          <Navbar />
          <SearchModal />
          <main className="min-h-screen relative">{children}</main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
