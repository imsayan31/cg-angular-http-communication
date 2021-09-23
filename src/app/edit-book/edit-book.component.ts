import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'app/models/book';
import { DataService } from 'app/core/data.service';
import { OldBook } from 'app/models/oldBook';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
})
export class EditBookComponent implements OnInit {

  selectedBook: Book;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    let bookID: number = parseInt(this.route.snapshot.params['id']);
    this.dataService.getBookById(bookID)
      .subscribe(
        (data:Book) => this.selectedBook = data,
        (err:any) => console.log(err),
        () => console.log('complete')
      )

    this.dataService.getOldBookById(bookID)
        .subscribe(
          (data:OldBook) => console.log(`Old book title: ${data.bookTitle}`)
        )
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
  }

  saveChanges(): void {
    //console.warn('Save changes to book not yet implemented.');
    this.dataService.updateBook(this.selectedBook)
      .subscribe(
        (data: void) => console.log(`${this.selectedBook.title} has been updated.`),
        (err) => console.log(err)
      )
  }
}
