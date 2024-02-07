package com.example.cloudassignment01.repository;

import com.example.cloudassignment01.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    public User findByEmail(String email);


}
