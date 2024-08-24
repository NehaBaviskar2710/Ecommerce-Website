package com.zosh.request;

import com.zosh.user.domain.UserRole;

import jakarta.persistence.Column;

public class RegisterRequest {
	private String firstName;
    private String lastName;
    private String password;
    private String email;
    
    private String role;
    
    

	public RegisterRequest(String firstName, String lastName, String password, String email, String role) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
		this.email = email;
		this.role = role;
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
    
    
}
