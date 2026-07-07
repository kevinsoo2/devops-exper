import { Hero } from '@/components/Hero';
import { RoadmapSection } from '@/components/RoadmapSection';
import { CoursesSection } from '@/components/CoursesSection';
import { ToolsSection } from '@/components/ToolsSection';
import { LabsSection } from '@/components/LabsSection';
import { CertificationsSection } from '@/components/CertificationsSection';
import { Terminal } from '@/components/Terminal';
import { BlogSection } from '@/components/BlogSection';
import { PricingSection } from '@/components/PricingSection';
import { NewsletterSection } from '@/components/NewsletterSection';

export default function Home() {
  return (
    <>
      <Hero />
      <RoadmapSection />
      <CoursesSection />
      <ToolsSection />
      <LabsSection />
      <CertificationsSection />
      <Terminal />
      <BlogSection />
      <PricingSection />
      <NewsletterSection />
    </>
  );
}
