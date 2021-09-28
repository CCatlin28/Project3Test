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
    })
   
  //   if(this.search == null){
  //     this.dataService.getBookHomePage().subscribe((data) => {
  //       this.items = data.items;
  //       console.log(this.items);
  //   })
  //   }
  //   else if(this.searchType == null){
  //     this.dataService.getBookHomePage().subscribe((data) => {
  //       this.items = data.items;
  //       console.log(this.items);
  //   })
  //   }
  //   else if(this.searchType == "title"){
  //     this.dataService.getBooksByTitle(this.search, this.pageNumber).subscribe((data) => {
  //       this.items = data.items;
  //       console.log(this.items);
  //   })
  //   }

  //   else if(this.searchType == "author"){
  //       this.searchByAuthor(this.searchType, this.search);
  //       this.dataService.getBooksByAuthor(this.search).subscribe((data) => {
  //       this.items = data.items;
  //       console.log(this.items);
  //   })
  //   }
  //   else if(this.searchType == "subject"){
  //     this.dataService.getBooksByGenre(this.search).subscribe((data) => {
  //       this.items = data.items;
  //       console.log(this.items);
  //   })

  //   }else if(this.search == "isbn"){
  //     this.dataService.getBooksByISBN(this.search).subscribe((data) => {
  //       this.items = data.items;
  //       console.log(this.items);
  //   })
  // }
//     this.dataService.getBookHomePage().subscribe((data) => {
//       this.items = data.items;
//       console.log(this.items);
//   })
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
    else{
    
      // this.ngOnInit();
    }
  }


  
  Search(search: string, searchType: string){
    // let searchArr :any = event;
    // let search = searchArr[0];
    // let searchType = searchArr[1];

    if (searchType === "title"){
      console.log("title SEARCH")
      this.dataService.getBooksByTitle(search, this.pageNumber).
      subscribe((data) => {
        this.items = data.items;
        console.log(this.items);
      })
    }

    else if(searchType === "author"){
      console.log("author SEARCH")
      this.dataService.getBooksByAuthor(search).subscribe((data) => {
        this.items = data.items;
        console.log(this.items);
      })
    }

    else if(searchType === "subject"){
      console.log("subject SEARCH")
      this.dataService.getBooksByGenre(search).subscribe((data) => {
        this.items = data.items;
        console.log(this.items);
      })
    }

    else if(searchType == "isbn"){
      console.log("ISBN SEARCH")
      this.dataService.getBooksByISBN(search).subscribe((data) => {
        this.items = data.items;
        console.log(this.items);
      })
    }
    // console.log(m[0], m[1]);
    // console.log(this.searchType)
    // this.searchByAuthor(m[1], m[0]);
  }

}
