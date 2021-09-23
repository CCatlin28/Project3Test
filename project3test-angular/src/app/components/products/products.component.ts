import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { ReadlistService } from 'src/app/services/readlist.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public allBooks: any;
  public isbn: any;
  public title: any;
  public author: any;
  public summary: any;
  public image: any;
  public books: any;


  constructor(private bookService: BooksService, private readlistService:
    ReadlistService, private router: Router) { }

  viewBook(book: any) {
    this.router.navigate(['/products', book.isbn])
  }

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
    this.bookService.getAllBooks().subscribe((data) =>
      this.allBooks = data);
  }

  public addBook(book: any) {
    this.readlistService.addReadlistEntry(book);
  }

}
