package com.iqb.backend.service;

import com.iqb.backend.dto.CourseCreateDTO;
import com.iqb.backend.dto.CourseStudentDTO;
import com.iqb.backend.dto.CourseUpdateDTO;
import com.iqb.backend.model.Course;

import java.util.List;

public interface CourseService {
    Course createCourse(CourseCreateDTO dto);
    Course updateCourse(Long id, CourseUpdateDTO dto);

    void deleteCourse(Long id);
    Course getCourseById(Long id);
    List<Course> getAllCourses();
    public List<CourseStudentDTO> getCourseStudents(Long courseId);
}
