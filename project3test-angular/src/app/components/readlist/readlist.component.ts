import { Component, OnInit } from '@angular/core';
import { ReadlistService } from 'src/app/services/readlist.service';
import { IReadlist } from 'src/app/models/readlist.model';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-readlist',
  templateUrl: './readlist.component.html',
  styleUrls: ['./readlist.component.css']
})
export class ReadlistComponent implements OnInit {
  readlists: IReadlist[] = [];
  userLoggedIn: boolean = false;
  userHasReadlist: boolean = false;
  currentUser: User = {
    userId: 0,
    firstName: "test",
    lastName: "user",
    mobile: "",
    email: "",
    username: "",
    password: ""
  };

  constructor(private readlistService: ReadlistService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userLoggedIn = false;
    this.userHasReadlist = false;
    this.currentUser = this.userService.getCurrentUser();

    if (this.currentUser.userId != 0) {
      this.userLoggedIn = true;
    }

    this.readlistService.getReadlistById(this.currentUser.userId).subscribe(data => {
      this.readlists = data;
      if (data.length != 0) {
        this.userHasReadlist = true;
      }
    });
  }

  public removeBook(data: IReadlist) {
    if (data.readListId != undefined) {
      this.readlistService.deleteReadlistEntry(data.readListId)
        .subscribe(() => this.ngOnInit());
    }
  }

  public addBook(bookISBN: number) { 
    this.readlistService.addReadlistEntry(bookISBN);
  }
}
