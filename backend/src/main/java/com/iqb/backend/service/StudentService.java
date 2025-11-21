package com.iqb.backend.service;

import com.iqb.backend.dto.StudentCreateDTO;
import com.iqb.backend.dto.StudentUpdateDTO;
import com.iqb.backend.model.Course;
import com.iqb.backend.model.ExamResult;
import com.iqb.backend.model.Student;

import java.util.List;
import java.util.Map;

public interface StudentService {

    Student createStudent(StudentCreateDTO dto);

    Student updateStudent(Long id, StudentUpdateDTO dto);

    void deleteStudent(Long id);

    Student getStudentById(Long id);

    List<Student> getAllStudents();

    List<Student> searchStudents(String query);

    List<ExamResult> getStudentExams(Long studentId);

    List<Course> getCompletedCourses(Long studentId);

    double calculateAverage(Long studentId);

    Map<Long, Double> getCourseAverages(Long studentId);
}
