import { CertificationsSection } from '@/components/home/certifications-section';
import { CtaSection } from '@/components/home/cta-section';
import { FeaturedCourses } from '@/components/home/featured-courses';
import { HeroSection } from '@/components/home/hero-section';
import { LocationsSection } from '@/components/home/locations-section';
import { PartnersSection } from '@/components/home/partners-section';
import { RecruitmentSection } from '@/components/home/recruitment-section';
import { StatsSection } from '@/components/home/stats-section';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <FeaturedCourses />
      <RecruitmentSection />
      <LocationsSection />
      <PartnersSection />
      <CertificationsSection />
      <CtaSection />
    </div>
  );
}
