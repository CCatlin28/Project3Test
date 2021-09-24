import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { DataService } from 'src/app/services/data.service';
import { BookDetailComponent } from '../book-detail/book-detail.component';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {
  author:string= '';
  books: any;
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    // this.dataService.getBooksByAuthor(this.author).subscribe(data =>{
    //   console.log(data);
    //   this.books = data;

      // this.dataService.getBooksByTitle(this.author).subscribe(data =>{
      //   console.log(data);
      //   this.books = data;
    this.dataService.getBookHomePage().subscribe(data=>{
      console.log(data);
      this.books = data;
    })
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
}
