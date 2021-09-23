package com.revature.project3spring.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.revature.project3spring.entities.ReadList;

@Service
public interface ReadListService {
	ReadList saveReadList(ReadList list);
	List<ReadList> getAllReadList();
	ReadList deleteReadList(long readListId);
	List<ReadList> getAllReadListByUserId(long userId);
}
