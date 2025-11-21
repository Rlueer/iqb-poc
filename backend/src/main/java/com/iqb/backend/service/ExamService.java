package com.iqb.backend.service;

import com.iqb.backend.dto.ExamResultCreateDTO;
import com.iqb.backend.dto.ExamResultUpdateDTO;
import com.iqb.backend.model.ExamResult;

import java.util.List;

public interface ExamService {

    ExamResult getExamById(Long id);

    List<ExamResult> getAllExams();

    void deleteExam(Long id);

    ExamResult updateExam(Long id, ExamResultUpdateDTO dto);

    ExamResult createExamResult(ExamResultCreateDTO dto);

}
