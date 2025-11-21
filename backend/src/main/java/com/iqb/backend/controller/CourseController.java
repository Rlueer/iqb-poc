package com.iqb.backend.controller;

import com.iqb.backend.dto.CourseCreateDTO;
import com.iqb.backend.dto.CourseStudentDTO;
import com.iqb.backend.dto.CourseUpdateDTO;
import com.iqb.backend.model.Course;
import com.iqb.backend.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
@CrossOrigin
public class CourseController {

    private final CourseService courseService;

    @PostMapping
    public Course create(@RequestBody @Valid CourseCreateDTO dto) {
        return courseService.createCourse(dto);
    }

    @PutMapping("/{id}")
    public Course update(@PathVariable Long id, @RequestBody @Valid CourseUpdateDTO dto) {
        return courseService.updateCourse(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        courseService.deleteCourse(id);
    }

    @GetMapping
    public List<Course> getAll() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public Course getById(@PathVariable Long id) {
        return courseService.getCourseById(id);
    }

    @GetMapping("/{id}/students")
    public List<CourseStudentDTO> getCourseStudents(@PathVariable Long id) {
        return courseService.getCourseStudents(id);
    }

}
