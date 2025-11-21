package com.iqb.backend.service.impl;

import com.iqb.backend.dto.ExamResultCreateDTO;
import com.iqb.backend.model.Course;
import com.iqb.backend.model.ExamResult;
import com.iqb.backend.model.Student;
import com.iqb.backend.repository.CourseRepository;
import com.iqb.backend.repository.ExamResultRepository;
import com.iqb.backend.repository.StudentRepository;
import com.iqb.backend.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamService {

    private final ExamResultRepository examResultRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    @Override
    public ExamResult createExamResult(ExamResultCreateDTO dto) {

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        ExamResult exam = ExamResult.builder()
                .student(student)
                .course(course)
                .score(dto.getScore())
                .build();

        return examResultRepository.save(exam);
    }

    @Override
    public ExamResult updateExam(Long id, ExamResult examResult) {
        ExamResult existing = examResultRepository.findById(id).orElseThrow();

        // Student değişmeyecek (istekte sadece id geliyor)
        existing.setScore(examResult.getScore());

        // Eğer course değişsin istersen bunu da açabiliriz:
        // Course c = courseRepository.findById(examResult.getCourse().getId()).orElseThrow();
        // existing.setCourse(c);

        return examResultRepository.save(existing);
    }


    @Override
    public ExamResult getExamById(Long id) {
        return examResultRepository.findById(id).orElseThrow();
    }

    @Override
    public List<ExamResult> getAllExams() {
        return examResultRepository.findAll();
    }

    @Override
    public void deleteExam(Long id) {
        examResultRepository.deleteById(id);
    }
}
