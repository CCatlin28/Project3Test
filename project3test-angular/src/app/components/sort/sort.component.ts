import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

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
}
