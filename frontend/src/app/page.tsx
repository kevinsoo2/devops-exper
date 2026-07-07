import { Hero } from '@/components/sections/Hero';
import { RoadmapPreview } from '@/components/sections/RoadmapPreview';
import { CoursesPreview } from '@/components/sections/CoursesPreview';
import { ToolsPreview } from '@/components/sections/ToolsPreview';
import { LabsPreview } from '@/components/sections/LabsPreview';
import { CertificationsPreview } from '@/components/sections/CertificationsPreview';
import { Terminal } from '@/components/sections/Terminal';
import { CommunityPreview } from '@/components/sections/CommunityPreview';
import { BlogPreview } from '@/components/sections/BlogPreview';
import { PricingSection } from '@/components/sections/PricingSection';
import { NewsletterSection } from '@/components/sections/NewsletterSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <RoadmapPreview />
      <CoursesPreview />
      <ToolsPreview />
      <LabsPreview />
      <CertificationsPreview />
      <Terminal />
      <CommunityPreview />
      <BlogPreview />
      <PricingSection />
      <NewsletterSection />
    </>
  );
}
