import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isbn: any;
  public title: any;
  public author: any;
  public summary: any;
  public image: any;
  public books: any;
  public randomBooks: any;


  constructor(private bookService: BooksService, private router: Router) { 
    let booksArray = this.bookService.getBooks;

    this.books = booksArray;


  }

    onButtonClick(book: any){
    this.router.navigate(['/products', book.ISBN])
  }

  ngOnInit(): void {
    this.books = this.bookService.getBooks() 
  }

  
}
