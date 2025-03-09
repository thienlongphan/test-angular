import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  imports: [FormsModule, CommonModule],
})
export class PaginationComponent implements OnInit {
  @Input() totalItems = 0;
  pageSize = 2;
  displayRange: number[] = [];
  currentPage = 1;
  range = 6;
  totalPages = 0;
  startIndex = 0;
  lastIndex = 0;

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.displayRange = this.getRange(1, 6);
    console.log(this.currentPage);
  }

  gotoPrevious() {
    this.currentPage--;
    if (this.currentPage === 0) {
      this.currentPage = 1;
      return;
    }
    console.log('goto previous', this.currentPage);
    this.displayRange = this.pagination(this.currentPage, this.range);
  }

  gotoNext() {
    this.currentPage++;
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
      return;
    }

    this.displayRange = this.pagination(this.currentPage, this.range);
    console.log(this.displayRange, this.currentPage);
  }

  selectItem(pageIndex: number) {
    this.currentPage = pageIndex;
    this.displayRange = this.pagination(this.currentPage, this.range);
  }

  getRange(start: number, end: number) {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  }

  pagination(currentPage: number, maxDisplay: number) {
    // let startPage = 0;
    // let endPage = 0;
    // let currentGroup = 0;
    // currentGroup = Math.floor((currentPage - 1) / maxDisplay);
    // startPage = currentGroup * maxDisplay + 1;
    // endPage = Math.min(startPage + maxDisplay - 1, this.totalPages);
    let startPage = Math.max(1, currentPage - Math.floor(maxDisplay / 2));
    let endPage = startPage + maxDisplay - 1;

    // Đảm bảo không vượt quá totalPages
    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(1, endPage - maxDisplay + 1);
    }
    return this.getRange(startPage, endPage);
  }

  gotoPage(e: any) {
    const value = Number(e.target.value);
    if (isNaN(value)) return;
    this.currentPage =
      value > this.totalPages || value < 1 ? this.currentPage : value;
    this.displayRange = this.pagination(this.currentPage, this.range);
  }
}
