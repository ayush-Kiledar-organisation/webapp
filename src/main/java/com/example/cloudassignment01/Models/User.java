package com.example.cloudassignment01.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Date;
import java.util.UUID;

@Entity
public class User{

    @Id
    @GeneratedValue(generator = "uuid2")
    private UUID id;

    private String email;



    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;


    @Size(min = 5)
    private String firstName;


    @Size(min = 5)
    private String lastName;

    private Date account_created;

    private Date account_updated;

    public Date getAccount_created() {
        return account_created;
    }

    public Date getAccount_updated() {
        return account_updated;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }


    public void setEmail(String email) {
        this.email = email;
    }



    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    public void setAccount_created(Date account_created) {
        this.account_created = account_created;
    }

    public void setAccount_updated(Date account_updated) {
        this.account_updated = account_updated;
    }
}
