package com.example.cloudassignment01.services.impl;

import com.example.cloudassignment01.Models.User;
import com.example.cloudassignment01.repository.UserRepository;
import com.example.cloudassignment01.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Override
    public User registerUser(User user) {

        User checkExisting = this.userRepository.findByEmail(user.getEmail());

        if(checkExisting != null){

            System.out.println("User exists");
            return null;

        }

        return this.userRepository.save(user);
    }

    @Override
    public User getUser(String username) {

        return this.userRepository.findByEmail(username);
    }

    @Override
    public User updateUser(User user) {
        return this.userRepository.save(user);
    }

}
