import { Component, OnInit } from '@angular/core';
import { BookService } from 'app/services/book.service';
import { Book } from 'app/_models/book';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {
  books: Book[];

  constructor(private bookService: BookService) { }
  ngOnInit(): void {
    this.loadBooks()
  }
  loadBooks() {
    this.bookService.getBooks().subscribe(res => {
      this.books = res as Book[];
      console.log(this.books)
    });
  }
}
