package com.revature.project3spring.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.project3spring.entities.ReadList;
import com.revature.project3spring.entities.User;
import com.revature.project3spring.repositories.BookRepository;
import com.revature.project3spring.repositories.ReadListRepository;

@Service
public class ReadListServiceImpl implements ReadListService{

	@Autowired
	private ReadListRepository repository;
	
	@Override
	public ReadList saveReadList(ReadList list) {
		return repository.save(list);
	}

	@Override
	public List<ReadList> getAllReadList() {
		return repository.findAll();
	}

	@Override
	public ReadList deleteReadList(long readListId) {
		ReadList list = repository.findById(readListId).get();
		repository.delete(list);
		return list;
	}

	@Override
	public List<ReadList> getAllReadListByUserId(long userId) {
		return repository.findByUserUserId(userId);
	}
}
