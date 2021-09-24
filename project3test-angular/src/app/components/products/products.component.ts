import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { DataService } from 'src/app/services/data.service';
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
  public items: any;


  constructor(private bookService: BooksService, private readlistService:
    ReadlistService, private router: Router, private dataService: DataService) { }

  viewBook(book: any) {
    this.router.navigate(['/products', book.isbn])
  }

  ngOnInit(): void {
    this.dataService.getBookHomePage().subscribe((data) => {
      this.items = data.items;
      console.log(this.items);
  })
  }

  public addBook(book: any) {
    this.readlistService.addReadlistEntry(book);
  }

}
