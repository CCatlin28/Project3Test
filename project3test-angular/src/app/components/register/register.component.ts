import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private route:Router) { }

  ngOnInit(): void {
  }

  onClick(user: any) {
    this.userService.addUser(user).subscribe(x => console.log(x))
    alert("Account Registered!")

    setTimeout(() => {
      this.route.navigate(['/home']);
    }, 300)
  }

}
