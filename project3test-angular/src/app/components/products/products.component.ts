import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { DataService } from 'src/app/services/data.service';
import { ReadlistService } from 'src/app/services/readlist.service';
import { ActivatedRoute } from '@angular/router';
import { IReadlist } from 'src/app/models/readlist.model';



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

  public readList: IReadlist[] = [];
  public bestSellingBooks: any[] = [];
  public selectedBestSellers: any[] = [];
  public viewingBestSellers: any;
  public whichBooks: any;
  public bookFound: any;

  public bestSellerSort: Boolean=false;


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


  
  learnMore(book: any){
    this.title = book.volumeInfo.title
    this.author = book.volumeInfo.authors[0]
    if(book.volumeInfo.industryIdentifiers == null || (book.volumeInfo.industryIdentifiers[0].type == 'OTHER')){
      this.router.navigate(['/details', this.title, this.author])
    }else{
      this.router.navigate(['/detailed', book.volumeInfo.industryIdentifiers[0].identifier])
    }
    
  }

  sortBy(event: Event){
    this.bestSellerSort=false;
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
    this.bestSellerSort=false;
    this.pageNumber = 1;
    this.index = 0;
    this.Search(this.search, this.searchType)
  }


  
  Search(search: string, searchType: string){
    this.bestSellerSort=false;
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

   getBestSeller(){
     this.bestSellerSort=true;
         // get all books currently being read by users
    // set entryNum value to 0 for every book 
    this.readlistService.getReadlist().subscribe(data => {
      this.readList = data;
      this.readList.forEach(readingBook => {
        readingBook.book.entryNum = 0;
      });
      console.log(this.readList);

      // empty out arrays before iterating
      this.bestSellingBooks = [];
      this.selectedBestSellers = [];

      // iterate over readlist entries
      for (let i = 0; i < this.readList.length; i++) {
          
          this.bookFound = false;
          
          if(this.bestSellingBooks.includes(this.readList[i].book === false)){
            this.bestSellingBooks.push(this.readList[i].book);
          } else {
            this.readList[i].book.entryNum += 1;
          }
      
          // iterate over added books
          for (let j = 0; j < this.bestSellingBooks.length; j++) {
          
              // check if readlist entry book is already in array
              // and change boolean value to true if found
              if (this.readList[i].book.isbn == this.bestSellingBooks[j].isbn) {
            
                this.bookFound = true;
          
                // add new property to object and increment 
                // each time book is found in array
                this.bestSellingBooks[j].entryNum += 1;   
              }
          }

          // if book not found (boolean value is false)
          // add book to array
          if (this.bookFound === false) {
              this.bestSellingBooks.push(this.readList[i].book);
          }
      }
      console.log(this.bestSellingBooks);
      
      // only select the book as a best seller if its being read more than once 
      this.bestSellingBooks.forEach(book => {
        if(book.entryNum > 1){
          this.selectedBestSellers.push(book);
        }
      });

      console.log(this.selectedBestSellers);
    }, error => {
      console.log(error);
    });
  }
  public addBook(book: any) {
    this.readlistService.addReadlistEntry(book);
  }

}
