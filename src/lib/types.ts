export interface Course {
    id: string;
    name: string;
    category: string;
    imageId: string;
    duration: string;
    generalObjective: string;
    whatYouWillLearn: string[];
    modules: { title: string; topics: string[] }[];
  }
  
  export interface CourseCategory {
    id: string;
    name: string;
  }

  export interface Vacancy {
    id: string;
    title: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Remote';
    category: string;
    description: string;
  }
  