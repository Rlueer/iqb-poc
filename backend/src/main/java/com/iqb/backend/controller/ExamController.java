package com.iqb.backend.controller;

import com.iqb.backend.dto.ExamResultCreateDTO;
import com.iqb.backend.dto.ExamResultUpdateDTO;
import com.iqb.backend.model.ExamResult;
import com.iqb.backend.service.ExamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
@RequiredArgsConstructor
@CrossOrigin
public class ExamController {

    private final ExamService examService;

    @PostMapping
    public ExamResult create(@RequestBody @Valid ExamResultCreateDTO dto) {
        return examService.createExamResult(dto);
    }

    @GetMapping
    public List<ExamResult> getAll() {
        return examService.getAllExams();
    }

    @GetMapping("/{id}")
    public ExamResult getById(@PathVariable Long id) {
        return examService.getExamById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        examService.deleteExam(id);
    }

    @PutMapping("/{id}")
    public ExamResult update(
            @PathVariable Long id,
            @Valid @RequestBody ExamResultUpdateDTO dto
    ) {
        return examService.updateExam(id, dto);
    }


}
