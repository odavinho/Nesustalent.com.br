import { coursesData as initialCourses } from './courses';
import { courseCategories as allCourseCategories } from './courses';
import type { Course, CourseCategory } from './types';

// In-memory store for courses
let courses: Course[] = [...initialCourses];

// Function to get all courses
export const getCourses = (): Course[] => {
    return [...courses].sort((a, b) => a.name.localeCompare(b.name));
};

// Function to get all course categories
export const getCourseCategories = (): CourseCategory[] => {
    return [...allCourseCategories];
};

// Function to find a single course by ID
export const getCourseById = (id: string): Course | undefined => {
    return courses.find(c => c.id === id);
};

// Function to add a new course
export const addCourse = (courseData: Course): Course => {
    const newCourse: Course = {
        ...courseData,
    };
    // Ensure no duplicate IDs
    if (courses.some(c => c.id === newCourse.id)) {
        // Handle duplicate ID case, e.g., by throwing an error or just updating
        const index = courses.findIndex(c => c.id === newCourse.id);
        courses[index] = newCourse;
    } else {
       courses.unshift(newCourse); // Add to the beginning of the array
    }
    return newCourse;
};

// Function to update an existing course
export const updateCourse = (id: string, updatedData: Partial<Omit<Course, 'id'>>): Course | null => {
    const courseIndex = courses.findIndex(c => c.id === id);
    if (courseIndex === -1) {
        return null; // Course not found
    }

    const updatedCourse = {
        ...courses[courseIndex],
        ...updatedData,
    };
    
    courses[courseIndex] = updatedCourse;
    
    return updatedCourse;
}

// Function to delete a course
export const deleteCourse = (id: string): void => {
    courses = courses.filter(c => c.id !== id);
};
