import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() selectedPage: number = 1;

  @Input() collectionSize: number = 1;

  @Input() pageSize: number = 10;

  /** The number of buttons to show either side of the current page */
  @Input()
  maxSize = 2;

  @Output() selectedPageChange = new EventEmitter<number>()

  @Input()
  firstLastButtons = false;

  @Input()
  nextPreviousButtons = true;

  totalPages: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.totalPages = new Array(Math.ceil(this.collectionSize / this.pageSize));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.totalPages = new Array(Math.ceil(this.collectionSize / this.pageSize));
  }

  /** Set page number */
  selectPageNumber(pageNumber: number) {
    this.selectedPage = pageNumber;
    this.selectedPageChange.emit(this.selectedPage);
  }

  /** Set next page number */
  next() {
    const nextPage = this.selectedPage + 1;
    nextPage <= this.totalPages.length && this.selectPageNumber(nextPage);
    this.selectedPageChange.emit(this.selectedPage);
  }

  /** Set previous page number */
  previous() {
    const previousPage = this.selectedPage - 1;
    previousPage >= 1 && this.selectPageNumber(previousPage);
    this.selectedPageChange.emit(this.selectedPage);
  }
}
