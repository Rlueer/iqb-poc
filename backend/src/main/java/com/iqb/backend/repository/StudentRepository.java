package com.iqb.backend.repository;

import com.iqb.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findByFullNameContainingIgnoreCase(String name);

    List<Student> findByEmailContainingIgnoreCase(String email);

    List<Student> findByNumberContainingIgnoreCase(String number);

    List<Student> findByGsmNumberContainingIgnoreCase(String gsmNumber);
}
