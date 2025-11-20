package com.iqb.backend.repository;

import com.iqb.backend.model.Course;
import com.iqb.backend.model.ExamResult;
import com.iqb.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {

    List<ExamResult> findByStudent(Student student);

    List<ExamResult> findByStudentAndCourse(Student student, Course course);

    @Modifying
    @Transactional
    void deleteByCourseId(Long courseId);

}
