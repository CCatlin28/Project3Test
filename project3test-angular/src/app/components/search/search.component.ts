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

  @Output() messageEvent = new EventEmitter<any>();
  ngOnInit(): void {

  }


  Search(search: string, searchType: string){  
    this.messageEvent.emit([search,  searchType]);
  }
}