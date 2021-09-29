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
  public sort: any;
  public searchType: any;
  public newPage: any;
  public pageNumber: any = 1;
  public index: any = 0;

  public sortTitle:Boolean=true;
  public sortAuthor:Boolean=true;
  public sortPrice:Boolean=true;


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
    this.searchType="title"
    this.sort="Relevence"
    
    this.dataService.getBookHomePage().subscribe((data) => {
      this.items = data.items;
      console.log(this.items);
      this.items.forEach((book:any) => {
        if(!(book.saleInfo.hasOwnProperty('retailPrice'))){
          console.log("Does not exist ")   
          Object.assign(book.saleInfo,{retailPrice:{amount:0.0}})
        }        
      })
    })
   
  
}


  

  sortBy(event: Event){
    let original = this.items;
    let selection = (event.target as HTMLSelectElement).value;
    if (selection === '1'){
      console.log("ITEMS:" + this.items[0]);
      this.items.sort(function(a:any , b:any): any{
        if (a.volumeInfo.title.toLowerCase() < b.volumeInfo.title.toLowerCase())
        return -1;
      })
    }
    else if(selection === '2'){
      this.items.sort(function(a:any , b:any): any{
        if (a.volumeInfo.title.toLowerCase() > b.volumeInfo.title.toLowerCase())
        return -1;
      })
    }
    else if(selection === '3'){
      this.items.sort(function(a:any , b:any): any{
        if (a.volumeInfo.authors[0].toLowerCase() < b.volumeInfo.authors[0].toLowerCase())
        return -1;
      })
    }
    else if(selection === '4'){
      this.items.sort(function(a:any , b:any): any{
        if (a.volumeInfo.authors[0].toLowerCase() > b.volumeInfo.authors[0].toLowerCase())
        return -1;
      })
    }
    else if(selection === '5'){
      this.items.sort(function(a:any , b:any): any{
        if (a.saleInfo.retailPrice.amount > b.saleInfo.retailPrice.amount)
        return -1;
      })
    }
    else if(selection === '6'){
      this.items.sort(function(a:any , b:any): any{
        if (a.saleInfo.retailPrice.amount < b.saleInfo.retailPrice.amount )
        return -1;
      })
    }
    else{
    this.Search(this.search, this.searchType)
      // this.ngOnInit();
    }
  }

  Increment(){
    this.index += 20;
    this.pageNumber += 1;
    this.Search(this.search, this.searchType)
    console.log(this.index);
      console.log(this.Search);
  }

  Decrement(){
    if(this.index>=20){
      this.index-=20;
      this.pageNumber -= 1;
      this.Search(this.search, this.searchType)
      console.log(this.index);
      console.log(this.Search);
    }
  }

  newSearch(){
    this.pageNumber = 1;
    this.index = 0;
    this.Search(this.search, this.searchType)
  }


  
  Search(search: string, searchType: string){
    // let searchArr :any = event;
    // let search = searchArr[0];
    // let searchType = searchArr[1];

    if (searchType === "title"){
      console.log("title SEARCH")
      this.dataService.getBooksByTitle(search, this.index).
      subscribe((data) => {
        this.items = data.items;
        console.log(this.items);
        this.items.forEach((book:any) => {
          if(!(book.saleInfo.hasOwnProperty('retailPrice'))){
            console.log("Does not exist ")   
            Object.assign(book.saleInfo,{retailPrice:{amount:0.0}})
          }        
        })
      })
    }

    else if(searchType === "author"){
      console.log("author SEARCH")
      this.dataService.getBooksByAuthor(search, this.index).subscribe((data) => {
        this.items = data.items;
        console.log(this.items);
        this.items.forEach((book:any) => {
          if(!(book.saleInfo.hasOwnProperty('retailPrice'))){
            console.log("Does not exist ")   
            Object.assign(book.saleInfo,{retailPrice:{amount:0.0}})
          }        
        })
      })
    }

    else if(searchType === "subject"){
      console.log("subject SEARCH")
      this.dataService.getBooksByGenre(search, this.index).subscribe((data) => {
        this.items = data.items;
        console.log(this.items);
        this.items.forEach((book:any) => {
          if(!(book.saleInfo.hasOwnProperty('retailPrice'))){
            console.log("Does not exist ")   
            Object.assign(book.saleInfo,{retailPrice:{amount:0.0}})
          }        
        })
      })
    }

    else if(searchType == "isbn"){
      console.log("ISBN SEARCH")
      this.dataService.getBooksByISBN(search, this.index).subscribe((data) => {
        this.items = data.items;
        console.log(this.items);
        this.items.forEach((book:any) => {
          if(!(book.saleInfo.hasOwnProperty('retailPrice'))){
            console.log("Does not exist ")   
            Object.assign(book.saleInfo,{retailPrice:{amount:0.0}})
          }        
        })
      })
    }
    // console.log(m[0], m[1]);
    // console.log(this.searchType)
    // this.searchByAuthor(m[1], m[0]);
  }
  
  
  
  // Sort By Title
  sortByTitle(){
    console.log("Inside sortByTitle() function");
    if (this.sortTitle == true){
      console.log("sortAsc = " +this.sortTitle);
      this.items.sort(function(a:any , b:any): any{
        if (a.volumeInfo.title.toLowerCase() < b.volumeInfo.title.toLowerCase())
        return -1;
      })
      this.sortTitle = false;
     }
    else if(this.sortTitle == false){
      console.log("sortAsc = " +this.sortTitle);
      this.items.sort(function(a:any , b:any): any{
        if (a.volumeInfo.title.toLowerCase() > b.volumeInfo.title.toLowerCase())
        return -1;
      })
      this.sortTitle = true;
    }
   }

   // Sort By Author
   sortByAuthor(){
    console.log("Inside sortByAuthor() function");
    if (this.sortAuthor == true){
      console.log("sortAsc = " +this.sortAuthor);
      this.items.sort(function(a:any , b:any): any{
        if (a.volumeInfo.authors[0].toLowerCase() < b.volumeInfo.authors[0].toLowerCase())
        return -1;
      })
      this.sortAuthor = false;
     }
    else if(this.sortAuthor == false){
      console.log("sortAsc = " +this.sortAuthor);
      this.items.sort(function(a:any , b:any): any{
        if (a.volumeInfo.authors[0].toLowerCase() > b.volumeInfo.authors[0].toLowerCase())
        return -1;
      })
      this.sortAuthor = true;
    }
   }

   // Sort By Price
   sortByPrice(){
    console.log("Inside sortByPrice() function");    
    if (this.sortPrice == true){
      console.log("sortAsc = " +this.sortPrice);
      this.items.sort(function(a:any , b:any): any{
        if (a.saleInfo.retailPrice.amount < b.saleInfo.retailPrice.amount )
        return -1;
      })
      this.sortPrice = false;
     }
    else if(this.sortPrice == false){
      console.log("sortAsc = " +this.sortPrice);
      this.items.sort(function(a:any , b:any): any{
        if (a.saleInfo.retailPrice.amount > b.saleInfo.retailPrice.amount)
        return -1;
      })
      this.sortPrice = true;
    }

   }


}
