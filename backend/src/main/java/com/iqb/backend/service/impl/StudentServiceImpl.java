package com.iqb.backend.service.impl;

import com.iqb.backend.dto.StudentCreateDTO;
import com.iqb.backend.dto.StudentUpdateDTO;
import com.iqb.backend.model.Course;
import com.iqb.backend.model.ExamResult;
import com.iqb.backend.model.Student;
import com.iqb.backend.repository.CourseRepository;
import com.iqb.backend.repository.ExamResultRepository;
import com.iqb.backend.repository.StudentRepository;
import com.iqb.backend.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final ExamResultRepository examResultRepository;
    private final CourseRepository courseRepository;

    // CREATE ------------------------------------------------------------
    @Override
    public Student createStudent(StudentCreateDTO dto) {
        Student s = new Student();
        s.setFullName(dto.getFullName());
        s.setEmail(dto.getEmail());
        s.setNumber(dto.getNumber());
        s.setGsmNumber(dto.getGsmNumber());

        return studentRepository.save(s);
    }

    // UPDATE ------------------------------------------------------------
    @Override
    public Student updateStudent(Long id, StudentUpdateDTO dto) {
        Student existing = studentRepository.findById(id).orElseThrow();

        existing.setFullName(dto.getFullName());
        existing.setEmail(dto.getEmail());
        existing.setNumber(dto.getNumber());
        existing.setGsmNumber(dto.getGsmNumber());

        return studentRepository.save(existing);
    }

    @Override
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    @Override
    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElseThrow();
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public List<Student> searchStudents(String query) {
        Set<Student> results = new HashSet<>();
        results.addAll(studentRepository.findByFullNameContainingIgnoreCase(query));
        results.addAll(studentRepository.findByEmailContainingIgnoreCase(query));
        results.addAll(studentRepository.findByNumberContainingIgnoreCase(query));
        results.addAll(studentRepository.findByGsmNumberContainingIgnoreCase(query));
        return new ArrayList<>(results);
    }

    // GET STUDENT'S EXAMS ------------------------------------------------------------
    @Override
    public List<ExamResult> getStudentExams(Long studentId) {
        Student s = studentRepository.findById(studentId).orElseThrow();
        return examResultRepository.findByStudent(s);
    }

    // COMPLETED COURSES --------------------------------------------------------------
    @Override
    public List<Course> getCompletedCourses(Long studentId) {
        Student s = studentRepository.findById(studentId).orElseThrow();
        List<ExamResult> exams = examResultRepository.findByStudent(s);

        Map<Course, Long> group = exams.stream()
                .collect(Collectors.groupingBy(ExamResult::getCourse, Collectors.counting()));

        return group.entrySet().stream()
                .filter(e -> e.getValue() >= 3)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }

    // OVERALL AVERAGE --------------------------------------------------------------
    @Override
    public double calculateAverage(Long studentId) {
        Student s = studentRepository.findById(studentId).orElseThrow();
        List<ExamResult> exams = examResultRepository.findByStudent(s);

        Map<Course, List<ExamResult>> grouped =
                exams.stream().collect(Collectors.groupingBy(ExamResult::getCourse));

        double sum = 0;
        int completedCourses = 0;

        for (var entry : grouped.entrySet()) {
            if (entry.getValue().size() >= 3) {
                double courseAvg = entry.getValue().stream()
                        .mapToInt(ExamResult::getScore)
                        .average()
                        .orElse(0);
                sum += courseAvg;
                completedCourses++;
            }
        }

        if (completedCourses == 0) return 0;
        return sum / completedCourses;
    }

    // AVERAGE PER COURSE --------------------------------------------------------------
    @Override
    public Map<Long, Double> getCourseAverages(Long studentId) {
        Student s = studentRepository.findById(studentId).orElseThrow();
        List<ExamResult> exams = examResultRepository.findByStudent(s);

        Map<Course, List<ExamResult>> grouped =
                exams.stream().collect(Collectors.groupingBy(ExamResult::getCourse));

        Map<Long, Double> courseAverages = new HashMap<>();

        for (var entry : grouped.entrySet()) {
            if (entry.getValue().size() >= 3) {
                double avg = entry.getValue().stream()
                        .mapToInt(ExamResult::getScore)
                        .average()
                        .orElse(0);

                courseAverages.put(entry.getKey().getId(), avg);
            }
        }

        return courseAverages;
    }
}
