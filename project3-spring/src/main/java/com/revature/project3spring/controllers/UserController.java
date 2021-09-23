package com.revature.project3spring.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.revature.project3spring.entities.User;
import com.revature.project3spring.services.UserService;

@RestController
public class UserController {
	
	@Autowired
	UserService service;
	
	@GetMapping("/user")
	public List<User> getAllUsers()	{
		return service.getAllUsers();
	}
	
	@PostMapping("/user/add")
	public User saveUser(@RequestBody User user)	{
		return service.saveUser(user);
	}
	
	@GetMapping("/user/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public User getUserById(@PathVariable("id") long userId)	{
		return service.getUserById(userId);
	}
	
	@PutMapping("/user/update/{id}")
	public User updateUser(@PathVariable("id") long userId, @RequestBody User user)	{
		return service.updateUser(userId, user);
	}

	@GetMapping("/user/{username}/{password}")
	public Boolean userExists(@PathVariable("username") String username, @PathVariable("password") String password) {
		return service.userExists(username, password);
	}

	@GetMapping("/user/user/{username}/{password}")
	public User getUserByUsernameAndPassword(@PathVariable("username") String username, @PathVariable("password") String password) {
		return service.getUserByUsernameAndPassword(username, password);
	}
}
