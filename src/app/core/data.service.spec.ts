import { TestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing"

import { DataService } from "./data.service"
import { Book } from "app/models/book"
import { BookTrackerError } from "app/models/bookTrackerError"

describe('DataService Tests', () => {

    let dataService: DataService
    let httpTestingController: HttpTestingController

    let testBooks: Book[] = [
        { "bookID": 1, "title": "Goodnight Moon", "author": "Margaret Wise Brown", "publicationYear": 1953 },
        { "bookID": 2, "title": "Winnie-the-Pooh", "author": "A. A. Milne", "publicationYear": 1926 },
        { "bookID": 3, "title": "Where the Wild Things Are", "author": "Maurice Sendak", "publicationYear": 1963 }
    ]

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DataService]
        })

        dataService = TestBed.get(DataService)
        httpTestingController = TestBed.get(HttpTestingController)
    })

    afterEach(() => {
        httpTestingController.verify()
    })

    it('should GET all books', () => {

        dataService.getAllBooks()
            .subscribe(
                (data:any) => {
                    expect(data.length).toBe(3)
                }
            )

        let bookRequest: TestRequest = httpTestingController.expectOne('/api/books')
        expect(bookRequest.request.method).toEqual('GET')

        bookRequest.flush(testBooks)
    })

    it('should return a BookTraceError', () => {

        dataService.getAllBooks()
            .subscribe(
                (data: any) => fail('this should have an error'),
                (err: BookTrackerError) => {
                    expect(err.errorNumber).toEqual(100)
                    expect(err.friendlyMessage).toEqual('An unexpected error occured.')
                }
            )

        let bookRequest: TestRequest = httpTestingController.expectOne('/api/books')
        bookRequest.flush('error', {
            status: 500,
            statusText: 'Server Error'
        })
    })
})