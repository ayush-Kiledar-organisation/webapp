package com.example.cloudassignment01.services;

import com.example.cloudassignment01.Models.User;

public interface UserService {

    public User registerUser(User user);

    public User getUser(String username);

    public User updateUser(User user);

}
