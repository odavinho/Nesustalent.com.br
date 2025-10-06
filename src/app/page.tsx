import { FeaturedCourses } from '@/components/home/featured-courses';
import { HeroSection } from '@/components/home/hero-section';
import { RecruitmentSection } from '@/components/home/recruitment-section';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedCourses />
      <RecruitmentSection />
    </div>
  );
}
