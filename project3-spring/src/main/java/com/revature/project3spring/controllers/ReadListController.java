package com.revature.project3spring.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.revature.project3spring.entities.ReadList;
import com.revature.project3spring.services.ReadListService;

@RestController
public class ReadListController {
	
	@Autowired
	ReadListService service;
	
	@PostMapping("/readlist/add")
	@CrossOrigin(origins = "http://localhost:4200")
	public ReadList saveReadList(@RequestBody ReadList listEntry) {
		System.out.println("IN BACKEND ******************************");
		return service.saveReadList(listEntry);
	}
	
	@GetMapping("/readlist")
	@CrossOrigin(origins = "http://localhost:4200")
	public List<ReadList> getAllReadLists(){
		return service.getAllReadList();
	}
	
	@GetMapping("/readlist/{userId}")
	@CrossOrigin(origins = "http://localhost:4200")
	public List<ReadList> getAllReadListsByUserId(@PathVariable("userId") int userId){
		return service.getAllReadListByUserId(userId);
	}
	
	@DeleteMapping("/readlist/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ReadList deleteReadListById(@PathVariable("id") long readListId)	{
		return service.deleteReadList(readListId);
	}
}
