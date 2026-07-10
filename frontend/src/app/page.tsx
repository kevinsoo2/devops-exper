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
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';

export default function HomePage() {
  return (
    <>
      <Hero />
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
        <CommunityPreview />
      </AnimateOnScroll>
      <AnimateOnScroll animation="slide-left" delay={100}>
        <BlogPreview />
      </AnimateOnScroll>
      <AnimateOnScroll animation="scale-in">
        <PricingSection />
      </AnimateOnScroll>
      <AnimateOnScroll animation="slide-up">
        <NewsletterSection />
      </AnimateOnScroll>
    </>
  );
}
