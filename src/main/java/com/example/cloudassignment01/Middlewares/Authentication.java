package com.example.cloudassignment01.Middlewares;

import com.example.cloudassignment01.Models.User;
import com.example.cloudassignment01.repository.UserRepository;
import com.example.cloudassignment01.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;


@Component
public class Authentication {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    public int authenticate(String username, String password){



        User user = userService.getUser(username);

        if(user == null){

            return 404;
        }

        boolean pswdMatch = bCryptPasswordEncoder.matches(password, user.getPassword());

        if(pswdMatch){
            return 200;
        }

        return 401;

    }

}
