// src/main/java/com/iqb/backend/dto/StudentDTO.java
package com.iqb.backend.dto;

import com.iqb.backend.model.Student;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class StudentDTO {

    private Long id;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Student number is required")
    @Size(max = 50, message = "Student number is too long")
    private String number;

    @NotBlank(message = "Email is required")
    @Email(message = "Email is not valid")
    private String email;

    @NotBlank(message = "GSM number is required")
    private String gsmNumber;

    public static StudentDTO fromEntity(Student s) {
        StudentDTO dto = new StudentDTO();
        dto.setId(s.getId());
        dto.setFullName(s.getFullName());
        dto.setNumber(s.getNumber());
        dto.setEmail(s.getEmail());
        dto.setGsmNumber(s.getGsmNumber());
        return dto;
    }

    public Student toEntity() {
        return Student.builder()
                .id(this.id)
                .fullName(this.fullName)
                .number(this.number)
                .email(this.email)
                .gsmNumber(this.gsmNumber)
                .build();
    }
}
