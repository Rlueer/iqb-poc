package com.iqb.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class CourseStudentDTO {
    private Long studentId;
    private String fullName;
    private int examCount;
    private double averageScore;

    private List<Integer> examScores; // 👈 YENİ ALAN
}
