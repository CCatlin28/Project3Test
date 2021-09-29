import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adv-search',
  templateUrl: './adv-search.component.html',
  styleUrls: ['./adv-search.component.css']
})
export class AdvSearchComponent implements OnInit {
public title: any;
public author: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  advSearch(title: string, author: string){
    this.router.navigate(['/details', title, author])
  }

}
