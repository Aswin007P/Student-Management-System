package com.example.backend.controller;

import com.example.backend.entity.Student;
import com.example.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "https://student-management-system-beryl-five.vercel.app")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable("id") Long id) {
        return studentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        if (studentRepository.existsByEmail(student.getEmail())) {
            return ResponseEntity.badRequest().build();
        }
        student.setCreatedAt(java.time.LocalDateTime.now());
        Student saved = studentRepository.save(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable("id") Long id,
            @RequestBody Student studentDetails) {
        return studentRepository.findById(id)
                .map(student -> {
                    if (!student.getEmail().equals(studentDetails.getEmail()) &&
                            studentRepository.existsByEmail(studentDetails.getEmail())) {
                        return ResponseEntity.badRequest().<Student>build();
                    }

                    student.setName(studentDetails.getName());
                    student.setEmail(studentDetails.getEmail());
                    student.setPhone(studentDetails.getPhone());
                    student.setCourse(studentDetails.getCourse());
                    student.setAttendance(studentDetails.getAttendance());
                    student.setStatus(studentDetails.getStatus());
                    student.setModifiedAt(java.time.LocalDateTime.now());

                    return ResponseEntity.ok(studentRepository.save(student));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable("id") Long id) {
        if (!studentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        studentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}