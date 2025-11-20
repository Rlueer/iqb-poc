package com.iqb.backend.service;

import com.iqb.backend.dto.CourseStudentDTO;
import com.iqb.backend.model.Course;

import java.util.List;

public interface CourseService {
    Course createCourse(Course course);
    Course updateCourse(Long id, Course course);
    void deleteCourse(Long id);
    Course getCourseById(Long id);
    List<Course> getAllCourses();
    public List<CourseStudentDTO> getCourseStudents(Long courseId);
}
