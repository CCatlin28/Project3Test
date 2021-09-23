package com.revature.project3spring.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.revature.project3spring.entities.Book;
import com.revature.project3spring.services.BookService;


@RestController
public class BookController {
	@Autowired
	private BookService service;
	
	@GetMapping("/book")
	@CrossOrigin(origins = "http://localhost:4200")
	public List<Book> getAllBooks()	{
		return service.getAllBook();
	}
	
	@GetMapping("/book/{title}")
	public List<Book> getAllBooksContaining(@PathVariable("title") String title){
		return service.getAllBookByBookTitleContaining(title);
	}

}

