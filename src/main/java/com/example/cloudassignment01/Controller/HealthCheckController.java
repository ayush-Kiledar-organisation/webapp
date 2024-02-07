package com.example.cloudassignment01.Controller;

import com.example.cloudassignment01.Models.User;
import com.example.cloudassignment01.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.sql.*;
import java.sql.DriverManager;
import java.util.Map;

@RestController
@RequestMapping("/healthz")
@CrossOrigin("*")
public class HealthCheckController extends DefaultErrorAttributes {

    @Autowired
    private UserService userService;
    @Override
    public Map<String, Object> getErrorAttributes(WebRequest webRequest, ErrorAttributeOptions options){

        Map<String, Object> errors = super.getErrorAttributes(webRequest, options);

        errors.clear();

        return errors;

    }



    @RequestMapping("")
    public ResponseEntity<?> healthcheck(@RequestParam Map<String, String> queryParams, @RequestBody(required = false) Object body, HttpServletRequest httpServletRequest) throws Exception{

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("cache-control","no-cache");

        if(!httpServletRequest.getMethod().equals("GET")){
            return new ResponseEntity<>(httpHeaders, HttpStatus.METHOD_NOT_ALLOWED);
        }

        if(body != null || !queryParams.isEmpty()){
            return new ResponseEntity<>(httpHeaders, HttpStatus.BAD_REQUEST);
        }


        try{
            String datasource_url = "jdbc:mysql://localhost:3306/exam_portal_database";
            String username = "root";
            String password = "password";
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(datasource_url, username, password);
            con.close();

            return new ResponseEntity<>(httpHeaders, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(httpHeaders, HttpStatus.SERVICE_UNAVAILABLE);
        }

    }





}
