import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search: string = '';
  searchType: string = '';
  books: any;
  message: string = "Hello!"
  constructor(private router: Router) { }

  @Output() messageEvent = new EventEmitter();
  ngOnInit(): void {

  }


  Search(search: string, searchType: string){
    console.log("author name:" + search)
    //this.router.navigate(['/products', search, searchType]);
    
    this.messageEvent.emit({search :search, searchType: searchType});
  }
}