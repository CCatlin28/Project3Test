package com.revature.project3spring.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.project3spring.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    User findByUsernameAndPassword(String username, String password);
}
