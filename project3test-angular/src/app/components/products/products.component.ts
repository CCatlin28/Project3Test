import { Component, OnInit, ViewChild } from '@angular/core';
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

    // if(this.search == null){
    //   this.dataService.getBookHomePage().subscribe((data) => {
    //     this.items = data.items;
    //     console.log(this.items);
    // })
    // }
    // else if(this.searchType == null){
    //   this.dataService.getBookHomePage().subscribe((data) => {
    //     this.items = data.items;
    //     console.log(this.items);
    // })
    // }
    // else if(this.searchType == "title"){
    //   this.dataService.getBooksByTitle(this.search, this.pageNumber).subscribe((data) => {
    //     this.items = data.items;
    //     console.log(this.items);
    //     this.ngOnInit();
    // })

    //}
    if(this.searchType == "author"){
      console.warn("WAARRN")
        this.searchByAuthor(this.searchType, this.search);
        this.dataService.getBooksByAuthor(this.search).subscribe((data) => {
        this.items = data.items;
        console.log(this.items);
    })

    // }else if(this.searchType == "subject"){
    //   this.dataService.getBooksByGenre(this.search).subscribe((data) => {
    //     this.items = data.items;
    //     console.log(this.items);
    // })

    // }else if(this.search == "isbn"){
    //   this.dataService.getBooksByISBN(this.search).subscribe((data) => {
    //     this.items = data.items;
    //     console.log(this.items);
    // })
  }

    

//     this.dataService.getBookHomePage().subscribe((data) => {
//       this.items = data.items;
//       console.log(this.items);
//   })
  }


  

  sortBy(event: Event){
    let selection = (event.target as HTMLSelectElement).value;
    if (selection === '1'){
      this.books.items.sort(function(a:any , b:any): any{
        if (a.volumeInfo.title.toLowerCase() < b.volumeInfo.title.toLowerCase())
        return -1;
      })
    }
    else if(selection === '2'){
      this.books.items.sort(function(a:any , b:any): any{
        if (a.volumeInfo.title.toLowerCase() > b.volumeInfo.title.toLowerCase())
        return -1;
      })
    }
    else{
      this.ngOnInit()
    }
  }


  searchByAuthor(a : string, b: string){
    console.log(this.search);
    this.dataService.getBooksByAuthor(b).subscribe((data) => {
      this.items = data.items;
      console.log(this.items);
    })
  }

  public addBook(book: any) {
    this.readlistService.addReadlistEntry(book);
  }

  

  message(event: Event){
     console.log (event);
    // console.log("hi")
    // this.search = this.route.snapshot.paramMap.get('search');
    // console.log(this.search)
    // this.newPage = this.route.snapshot.paramMap.get('pageNumber');
    // console.log(this.newPage)
    //this.searchType = this.route.snapshot.paramMap.get('searchType');
    console.log(this.searchType)
    this.searchByAuthor(this.searchType, this.search);

    // this.dataService.getBooksByAuthor(this.search).subscribe((data) => {
    // this.items = data.items;
    // console.log(this.items);
    // })
    // this.ngOnInit();

  }
}
