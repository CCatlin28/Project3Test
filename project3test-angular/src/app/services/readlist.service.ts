
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReadlist } from '../models/readlist.model';
import { UserService } from '../user/user.service';
import { BooksService } from './books.service';

@Injectable({
    providedIn: 'root'
})
export class ReadlistService {
    private BASEURL = "http://localhost:8080/"
    private ENDPOINTS = {
        READLIST: "readlist"
    }

    constructor(private http: HttpClient, private userService: UserService, private booksService: BooksService) { }

    getReadlist(): Observable<IReadlist[]> {
        return this.http.get<IReadlist[]>(this.BASEURL + this.ENDPOINTS.READLIST)
    }

    getReadlistById(userId: number): Observable<IReadlist[]> {
        return this.http.get<IReadlist[]>(this.BASEURL + this.ENDPOINTS.READLIST + "/" + userId)
    }

    createReadlist(data: IReadlist): Observable<IReadlist> {
        return this.http.post<IReadlist>(this.BASEURL + this.ENDPOINTS.READLIST, data)
    }

    deleteReadlistEntry(id: number) {
        return this.http.delete(this.BASEURL + this.ENDPOINTS.READLIST + "/" + id)
    }

    addReadlistEntry(book: any) {
        let userId = this.userService.getCurrentUser().userId;
        if (userId == 0) {
            alert("Please login to add books to your readlist!");
        } else {
            let user = null;

            this.userService.getUserById(userId).subscribe(data => {
                user = data;
                let readlistEntry = { user, book }
                console.log(readlistEntry)
                this.saveReadlistEntry(readlistEntry);
            });
        }
    }

    saveReadlistEntry(data: IReadlist) {
        return this.http.post(`${this.BASEURL + this.ENDPOINTS.READLIST}/add`, data).subscribe(() =>
            console.log("Success!"));
    }
}