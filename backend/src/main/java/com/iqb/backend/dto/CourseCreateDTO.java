package com.iqb.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CourseCreateDTO {
    @NotBlank(message = "Course name is required")
    private String name;
}
