package com.revature.project3spring.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Book {
	@Id
	private Long isbn;
	private String title;
	private String author;

	@Column(length = 3000)
	private String summary;
	private String image;
	private double price;
}
