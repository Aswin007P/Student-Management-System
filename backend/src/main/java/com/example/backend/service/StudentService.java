package com.example.backend.service;

import com.example.backend.entity.Student;
import com.example.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }

    public Student createStudent(Student student) {
        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new RuntimeException("Email already exists: " + student.getEmail());
        }
        student.setCreatedAt(LocalDateTime.now());
        student.setModifiedAt(null); // optional
        return studentRepository.save(student);
    }

    public Student updateStudent(Long id, Student studentDetails) {
        Student student = getStudentById(id);
        if (!student.getEmail().equals(studentDetails.getEmail()) &&
                studentRepository.existsByEmail(studentDetails.getEmail())) {
            throw new RuntimeException("Email already exists: " + studentDetails.getEmail());
        }

        // ✅ Update NEW fields (not firstName/lastName/dob)
        student.setName(studentDetails.getName());
        student.setEmail(studentDetails.getEmail());
        student.setPhone(studentDetails.getPhone());
        student.setCourse(studentDetails.getCourse());
        student.setAttendance(studentDetails.getAttendance());
        student.setStatus(studentDetails.getStatus());
        student.setModifiedAt(LocalDateTime.now());

        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        Student student = getStudentById(id);
        studentRepository.delete(student);
    }
}