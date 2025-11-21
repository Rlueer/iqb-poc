package com.iqb.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CourseUpdateDTO {
    @NotBlank(message = "Course name cannot be empty")
    private String name;
}
