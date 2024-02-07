package com.example.cloudassignment01.Controller;

import com.example.cloudassignment01.Middlewares.Authentication;
import com.example.cloudassignment01.Models.User;
import com.example.cloudassignment01.helper.ErrorHandler;
import com.example.cloudassignment01.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Date;

@RestController
@RequestMapping("/v1")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @Autowired
    private Authentication authentication;

    ErrorHandler errorHandler = new ErrorHandler();

    @PostMapping("/user/self")
    public ResponseEntity<?> createUser(@RequestBody(required = false) @Valid User user){

        if(user == null){
            errorHandler.setError("Request Body cannot be empty");

            return new ResponseEntity<>(errorHandler,HttpStatus.BAD_REQUEST);

        }

        user.setAccount_created(new Date());
        user.setAccount_updated(new Date());
        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));

        User user1 = this.userService.registerUser(user);

        if(user1 == null){

            errorHandler.setError("Email already exists");
            return new ResponseEntity<>(errorHandler,HttpStatus.BAD_REQUEST);

        }



        return ResponseEntity.ok(user1);

    }

    @PutMapping("/user/self")
    public ResponseEntity<?> updateUser(@RequestBody(required = false) User user, HttpServletRequest httpServletRequest){

        if(user == null){
            errorHandler.setError("Request Body cannot be empty");

            return new ResponseEntity<>(errorHandler,HttpStatus.BAD_REQUEST);

        }
        if(user.getId() != null || user.getEmail() != null){
            errorHandler.setError("ID and email cannot be updated");

            return new ResponseEntity<>(errorHandler,HttpStatus.BAD_REQUEST);
        }

        String token = httpServletRequest.getHeader("Authorization").substring(6);

        System.out.println(token);

        byte[] decodedBytes = Base64.getDecoder().decode(token);
        String decodedString = new String(decodedBytes);
        System.out.println(decodedString);

        String[] credentials = decodedString.split(":");

        String username = credentials[0];
        String password = credentials[1];

        int authStatus = authentication.authenticate(username, password);

        if(authStatus == 404) {
            errorHandler.setError("User not found");
            return new ResponseEntity<>(errorHandler,HttpStatus.NOT_FOUND);
        }

        if(authStatus == 401) {
            errorHandler.setError("Invalid credentials");
            return new ResponseEntity<>(errorHandler,HttpStatus.UNAUTHORIZED);
        }

        if(user.getPassword() != null) user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));

        User toUpdate = this.userService.getUser(username);

        if(user.getFirstName() != null)toUpdate.setFirstName(user.getFirstName());
        if(user.getLastName() != null)toUpdate.setLastName(user.getLastName());
        if(user.getPassword() != null) toUpdate.setPassword(user.getPassword());
        toUpdate.setAccount_updated(new Date());

        User u = this.userService.updateUser(toUpdate);

        return ResponseEntity.ok(u);


    }

    @GetMapping("/user/self")
    public ResponseEntity<?> getUser(HttpServletRequest httpServletRequest){

        String token = httpServletRequest.getHeader("Authorization").substring(6);

        System.out.println(token);

        byte[] decodedBytes = Base64.getDecoder().decode(token);
        String decodedString = new String(decodedBytes);
        System.out.println(decodedString);

        String[] credentials = decodedString.split(":");

        String username = credentials[0];
        String password = credentials[1];

        int authStatus = authentication.authenticate(username, password);

        if(authStatus == 404) {

            errorHandler.setError("User not found");
            return new ResponseEntity<>(errorHandler,HttpStatus.NOT_FOUND);
        }

        if(authStatus == 401) {
            errorHandler.setError("Invalid credentials");
            return new ResponseEntity<>(errorHandler,HttpStatus.UNAUTHORIZED);
        }

        return ResponseEntity.ok(this.userService.getUser(username));
    }
}
