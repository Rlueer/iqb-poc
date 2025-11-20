package com.iqb.backend.service;

import com.iqb.backend.model.Course;
import com.iqb.backend.model.ExamResult;
import com.iqb.backend.model.Student;

import java.util.List;

public interface StudentService {

    Student createStudent(Student student);
    Student updateStudent(Long id, Student student);
    void deleteStudent(Long id);
    Student getStudentById(Long id);

    List<Student> getAllStudents();

    List<Student> searchStudents(String query);

    List<ExamResult> getStudentExams(Long studentId);

    List<Course> getCompletedCourses(Long studentId);

    double calculateAverage(Long studentId);
}
