package com.iqb.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ExamResultUpdateDTO {

    @Min(0)
    @Max(100)
    private Integer score;
}
