import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /**
   *  These are the endpoints to the GOOGLE Books API,
   *  Please read comments above the retrieval methods,
   *  data being passed to methods are crucial to retrieving data
   *  from this api as they require specific data to be passed.
   *  Use " " to require search term
   *  Use - to exclude term
   */
  private ENDPOINTS = {

    BOOKS_URL: 'https://bookstore.docs.apiary.io/#reference/books/databooks/get',//deprecated
    BOOKS_HOME_URL: 'https://www.googleapis.com/books/v1/volumes?q=startIndex=0&maxResults=20&orderBy=newest', // fills page by top 20 newest books
    BOOKS_BY_TITLE: 'https://www.googleapis.com/books/v1/volumes?q=intitle:', //Can search by full names or partial names, MUST USE FULL WORDS TO SEARCH EX) Searching the book "The Blessings" as "Blessing" will not work, you need to search the word "Blessings"
    BOOKS_BY_AUTHOR: 'https://www.googleapis.com/books/v1/volumes?q=inauthor:', //+ author name,
    BOOKS_BY_ISBN: 'https://www.googleapis.com/books/v1/volumes?q=isbn: ', //Leave space after colon,Can search by 10 digit or 13 digit API
    BOOKS_BY_GENRE: 'https://www.googleapis.com/books/v1/volumes?q=subject:', // Grab genre code


    BOOK_FILTER: 'https://www.googleapis.com/books/v1/volumes?q=',  /* book title */
    AND_FILTER: '&filter=', //Can filter by ebooks, full, partial, free-ebooks, or paid-ebooks where the ? is located

    //BOOKS_BY_TITLE_: 'https://www.googleapis.com/books/v1/volumes?q=', //title
    AND_AUTHOR: '+inauthor:'  // + author name, DO NOT CHANGE OR GET RID OF PLUS SIGN

  }


  constructor(private http: HttpClient) {
  }

  //books Home, number of results can be tailored to UI
  public getBookHomePage() {
    return this.http.get<any>(this.ENDPOINTS.BOOKS_HOME_URL)
  }

  //A title must be passed to this method to be able to search by title
  public getBooksByTitle(title: string): Observable<any> {
    return this.http.get<any>(this.ENDPOINTS.BOOKS_BY_TITLE + title);
  }

  // Author name needs to be passed into method, it may be a partial
  public getBooksByAuthor(authorName: string): Observable<any> {
    return this.http.get<any>(this.ENDPOINTS.BOOKS_BY_AUTHOR + authorName);
  }

  //Can search by 10 or 13 digit isbn
  public getBooksByISBN(isbn: number): Observable<any> {
    return this.http.get<any>(this.ENDPOINTS.BOOKS_BY_ISBN + isbn);
  }

  public getWhatever(): Observable<any> {
    return this.http.get<any>('https://www.googleapis.com/books/v1/volumes?q=subject:science%20fiction%22retailPrice%22/4&orderBy=newest')
  }

  /**
   * Book retrieval SHOULD BE THE FIRST BOOK IN THE JSON,
   * but double check the JSON to be safe.
   * the API will query by full or using the correct words for the title
   * and author author name preferably last name
   *
   * Ex:
   *  To get the book The Blessing by Juska
   *  bookTitle = blessing, author = juska WILL NOT QUERY CORRECTLY
   *  bookTitle = blessings, author = juska WILL QUERY CORRECTLY
   *
   * @param bookTitle
   * @param author
   */
  public getBooksByTitleAndAuthor(bookTitle: string, author: string): Observable<any> {
    return this.http.get<any>(this.ENDPOINTS.BOOKS_BY_TITLE + bookTitle + this.ENDPOINTS.AND_AUTHOR + author)
  }

  /**
   * Retrieve books based on a specific genre,
   * genre specific code is found in the link below.
   * https://bisg.org/page/bisacedition
   * Ex:
   *  genre code to be passed = COM004000
   *  allows to retrieve specific books to COMPUTERS / Artificial Intelligence / General books
   * @param genre
   */
  public getBooksByGenre(genre: string): Observable<any> {
    return this.http.get<any>(this.ENDPOINTS.BOOKS_BY_GENRE + genre);
  }

  public getNewByGenre(genre: string, page: any): Observable<any> {
    return this.http.get<any>(this.ENDPOINTS.BOOKS_BY_GENRE + genre + '/' + page + '&orderBy=newest')
  }

  /**
   * Retrieve a book by title and filter by type of print. The types that should be filtered by
   * are ebooks, full, partial, free-ebooks, and paid-ebooks.
   * @param bookTitle
   * @param filterType
   */
  public getBookFilteredByType(bookTitle: string, filterType: string): Observable<any> {
    return this.http.get<any>(this.ENDPOINTS.BOOK_FILTER + bookTitle + this.ENDPOINTS.AND_FILTER + filterType);
  }
}
