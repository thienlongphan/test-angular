import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [FormsModule, CommonModule],
})
export class TableComponent implements OnInit {
  ngOnInit(): void {}

  ngAfterViewInit() {}
}
