import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Book } from 'app/_models/book';
import { HttpClient } from '@angular/common/http';
import { ok } from 'assert';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseUrl = environment.apiUrl + 'books';
  constructor(private http: HttpClient) { }

  saveBook(book: Book, fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('isbn', book.isbn);
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('price', book.price.toString());
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(this.baseUrl, formData);
  }
  get() {
    return this.http.get(this.baseUrl, {responseType: 'text'});
  }
}
