'use client';

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
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AnimateOnScroll animation="fade-in">
        <PartnersSection />
      </AnimateOnScroll>
      <AnimateOnScroll animation="slide-up">
        <RoadmapPreview />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fade-in" delay={100}>
        <CoursesPreview />
      </AnimateOnScroll>
      <AnimateOnScroll animation="slide-up" delay={100}>
        <ToolsPreview />
      </AnimateOnScroll>
      <AnimateOnScroll animation="scale-in">
        <LabsPreview />
      </AnimateOnScroll>
      <AnimateOnScroll animation="slide-up" delay={100}>
        <CertificationsPreview />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fade-in">
        <Terminal />
      </AnimateOnScroll>
      <AnimateOnScroll animation="slide-up">
        <TestimonialsSection />
      </AnimateOnScroll>
      <AnimateOnScroll animation="slide-up">
        <CommunityPreview />
      </AnimateOnScroll>
      <AnimateOnScroll animation="slide-left" delay={100}>
        <BlogPreview />
      </AnimateOnScroll>
      <AnimateOnScroll animation="scale-in">
        <PricingSection />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fade-in">
        <FAQSection />
      </AnimateOnScroll>
      <AnimateOnScroll animation="slide-up">
        <NewsletterSection />
      </AnimateOnScroll>
    </>
  );
}
