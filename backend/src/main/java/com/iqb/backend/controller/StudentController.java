package com.iqb.backend.controller;

import com.iqb.backend.model.Course;
import com.iqb.backend.model.ExamResult;
import com.iqb.backend.model.Student;
import com.iqb.backend.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
@CrossOrigin
public class StudentController {

    private final StudentService studentService;

    @PostMapping
    public Student create(@RequestBody Student student) {
        return studentService.createStudent(student);
    }

    @PutMapping("/{id}")
    public Student update(@PathVariable Long id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }

    @GetMapping
    public List<Student> getAll() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @GetMapping("/search")
    public List<Student> search(@RequestParam String q) {
        return studentService.searchStudents(q);
    }

    @GetMapping("/{id}/exams")
    public List<ExamResult> getExams(@PathVariable Long id) {
        return studentService.getStudentExams(id);
    }

    @GetMapping("/{id}/completed-courses")
    public List<Course> getCompletedCourses(@PathVariable Long id) {
        return studentService.getCompletedCourses(id);
    }

    @GetMapping("/{id}/average")
    public double getAverage(@PathVariable Long id) {
        return studentService.calculateAverage(id);
    }

    @GetMapping("/{id}/course-averages")
    public Map<Long, Double> getCourseAverages(@PathVariable Long id) {
        return studentService.getCourseAverages(id);
    }

}
