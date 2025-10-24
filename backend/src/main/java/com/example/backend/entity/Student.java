package com.example.backend.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;

@Entity
@Table(name = "STUDENT")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "FULL_NAME", nullable = false)
    private String name;

    @Column(name = "EMAIL", unique = true)
    private String email;

    @Column(name = "PHONE")
    private String phone;

    @Column(name = "COURSE")
    private String course;

    @Column(name = "ATTENDANCE")
    private Integer attendance;

    @Column(name = "STATUS")
    private String status = "ACTIVE";

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "MODIFIED_AT")
    private LocalDateTime modifiedAt;

    // Optional: Expose "enrolled" as a readable date string in JSON
    @Transient
    @JsonProperty("enrolled")
    public String getEnrolled() {
        return createdAt != null ? createdAt.toLocalDate().toString() : null;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public Integer getAttendance() { return attendance; }
    public void setAttendance(Integer attendance) { this.attendance = attendance; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getModifiedAt() { return modifiedAt; }
    public void setModifiedAt(LocalDateTime modifiedAt) { this.modifiedAt = modifiedAt; }
}