import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search: string = '';
  searchType: string = '';
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Search(search: string, searchType: string){
    this.router.navigate(['/products', search, searchType])
  }

  Reload(){
    window.location.reload();
  }

}
