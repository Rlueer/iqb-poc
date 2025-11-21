package com.iqb.backend.service.impl;

import com.iqb.backend.dto.CourseCreateDTO;
import com.iqb.backend.dto.CourseStudentDTO;
import com.iqb.backend.dto.CourseUpdateDTO;
import com.iqb.backend.model.Course;
import com.iqb.backend.model.ExamResult;
import com.iqb.backend.model.Student;
import com.iqb.backend.repository.CourseRepository;
import com.iqb.backend.repository.ExamResultRepository;
import com.iqb.backend.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final ExamResultRepository examResultRepository;

    @Override
    public Course createCourse(CourseCreateDTO dto) {
        Course course = Course.builder()
                .name(dto.getName())
                .build();

        return courseRepository.save(course);
    }

    @Override
    public Course updateCourse(Long id, CourseUpdateDTO dto) {
        Course course = courseRepository.findById(id).orElseThrow();
        course.setName(dto.getName());
        return courseRepository.save(course);
    }


    @Override
    public void deleteCourse(Long id) {
        // 1) Önce o kursun tüm sınavlarını sil
        examResultRepository.deleteByCourseId(id);

        // 2) Sonra kursu sil
        courseRepository.deleteById(id);
    }

    @Override
    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElseThrow();
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public List<CourseStudentDTO> getCourseStudents(Long courseId) {
        Course c = courseRepository.findById(courseId).orElseThrow();

        List<ExamResult> exams = examResultRepository.findByCourse(c);

        Map<Student, List<ExamResult>> grouped =
                exams.stream().collect(Collectors.groupingBy(ExamResult::getStudent));

        List<CourseStudentDTO> result = new ArrayList<>();

        for (var entry : grouped.entrySet()) {
            Student s = entry.getKey();
            List<ExamResult> examList = entry.getValue();

            CourseStudentDTO dto = new CourseStudentDTO();
            dto.setStudentId(s.getId());
            dto.setFullName(s.getFullName());
            dto.setExamCount(examList.size());

            dto.setAverageScore(
                    examList.stream().mapToInt(ExamResult::getScore).average().orElse(0)
            );

            dto.setExamScores(
                    examList.stream()
                            .map(ExamResult::getScore)
                            .toList()
            );

            result.add(dto);
        }

        return result;
    }



}
