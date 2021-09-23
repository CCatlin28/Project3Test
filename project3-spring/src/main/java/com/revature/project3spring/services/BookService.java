package com.revature.project3spring.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.revature.project3spring.entities.Book;

@Service
public interface BookService {
	List<Book> getAllBook();
	List<Book> getAllBookByBookTitleContaining(String title);
}
