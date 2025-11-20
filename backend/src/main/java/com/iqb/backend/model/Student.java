package com.iqb.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String number;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String gsmNumber;

    @OneToMany(mappedBy = "student", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private java.util.List<ExamResult> exams;
}
