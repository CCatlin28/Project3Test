import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { DataService } from 'src/app/services/data.service';
import { ReadlistService } from 'src/app/services/readlist.service';
import { ActivatedRoute } from '@angular/router';


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
  public search: any;
  public searchType: any;
  public newPage: any;
  public pageNumber: any = 1;


  constructor(private bookService: BooksService, private readlistService:
    ReadlistService, private router: Router, private dataService: DataService, private route: ActivatedRoute) { 
      this.search = route.snapshot.paramMap.get('search');
      this.newPage = route.snapshot.paramMap.get('pageNumber');
      this.searchType = route.snapshot.paramMap.get('searchType');



    }

  viewBook(book: any) {
    this.router.navigate(['/products', book.isbn])
  }

  ngOnInit(): void {

    if(this.search == null){
      this.dataService.getBookHomePage().subscribe((data) => {
        this.items = data.items;
        console.log(this.items);
    })
    }
    else if(this.searchType == null){
      this.dataService.getBookHomePage().subscribe((data) => {
        this.items = data.items;
        console.log(this.items);
    })
    }
    else if(this.searchType == "title"){
      this.dataService.getBooksByTitle(this.search, this.pageNumber).subscribe((data) => {
        this.items = data.items;
        console.log(this.items);
    })

    }else if(this.searchType == "author"){
      this.dataService.getBooksByAuthor(this.search).subscribe((data) => {
        this.items = data.items;
        console.log(this.items);
    })

    }else if(this.searchType == "subject"){
      this.dataService.getBooksByGenre(this.search).subscribe((data) => {
        this.items = data.items;
        console.log(this.items);
    })

    }else if(this.search == "isbn"){
      this.dataService.getBooksByISBN(this.search).subscribe((data) => {
        this.items = data.items;
        console.log(this.items);
    })

    }

//     this.dataService.getBookHomePage().subscribe((data) => {
//       this.items = data.items;
//       console.log(this.items);
//   })

  }

  public addBook(book: any) {
    this.readlistService.addReadlistEntry(book);
  }
}
