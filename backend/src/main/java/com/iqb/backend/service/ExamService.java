package com.iqb.backend.service;

import com.iqb.backend.model.ExamResult;

import java.util.List;

public interface ExamService {

    ExamResult createExam(ExamResult examResult);

    ExamResult getExamById(Long id);

    List<ExamResult> getAllExams();

    void deleteExam(Long id);
}
