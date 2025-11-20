package com.iqb.backend.service.impl;

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
    public ExamResult createExam(ExamResult examResult) {
        Student s = studentRepository.findById(examResult.getStudent().getId()).orElseThrow();
        Course c = courseRepository.findById(examResult.getCourse().getId()).orElseThrow();
        examResult.setStudent(s);
        examResult.setCourse(c);
        return examResultRepository.save(examResult);
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
