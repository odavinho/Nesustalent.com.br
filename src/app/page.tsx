import { CertificationsSection } from '@/components/home/certifications-section';
import { FeaturedCourses } from '@/components/home/featured-courses';
import { HeroSection } from '@/components/home/hero-section';
import { LocationsSection } from '@/components/home/locations-section';
import { PartnersSection } from '@/components/home/partners-section';
import { RecruitmentSection } from '@/components/home/recruitment-section';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedCourses />
      <RecruitmentSection />
      <LocationsSection />
      <PartnersSection />
      <CertificationsSection />
    </div>
  );
}
