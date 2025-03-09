import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { fromEvent } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  address: string;
  country: string;
  phone: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 1.0079,
    symbol: 'H',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 2,
    name: 'Heliumloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 4.0026,
    symbol: 'He',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 3,
    name: 'Lithiumloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 6.941,
    symbol: 'Li',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 4,
    name: 'Berylliumloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 9.0122,
    symbol: 'Be',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 5,
    name: 'Boronloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 10.811,
    symbol: 'B',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 6,
    name: 'Carbonloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 12.0107,
    symbol: 'C',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 7,
    name: 'Nitrogenloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 14.0067,
    symbol: 'N',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 8,
    name: 'Oxygenloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 15.9994,
    symbol: 'O',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 9,
    name: 'Fluorineloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 18.9984,
    symbol: 'F',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 10,
    name: 'Neonloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 20.1797,
    symbol: 'Ne',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 10,
    name: 'Neonloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 20.1797,
    symbol: 'Ne',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 10,
    name: 'Neonloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 20.1797,
    symbol: 'Ne',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 10,
    name: 'Neonloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 20.1797,
    symbol: 'Ne',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 10,
    name: 'Neonloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 20.1797,
    symbol: 'Ne',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 10,
    name: 'Neonloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 20.1797,
    symbol: 'Ne',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 10,
    name: 'Neonloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 20.1797,
    symbol: 'Ne',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 10,
    name: 'Neonloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 20.1797,
    symbol: 'Ne',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 10,
    name: 'Neonloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 20.1797,
    symbol: 'Ne',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 10,
    name: 'Neonloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 20.1797,
    symbol: 'Ne',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 10,
    name: 'Neonloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 20.1797,
    symbol: 'Ne',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 10,
    name: 'Neonloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 20.1797,
    symbol: 'Ne',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 10,
    name: 'Neonloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 20.1797,
    symbol: 'Ne',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
  {
    position: 10,
    name: 'Neonloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    weight: 20.1797,
    symbol: 'Ne',
    address: 'aaa',
    country: 'VN',
    phone: '+840987654321',
  },
];

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [FormsModule, CommonModule, MatTableModule],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'address',
    'country',
    'phone',
  ];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {}

  ngAfterViewInit() {
    const tbody = document.getElementById('tableBody')!;
    const thead = (tbody.querySelector('thead')!.style.visibility = 'collapse');
    console.log(thead);

    const theader = document.getElementById('tableHeader')!;
    const body = (theader.querySelector('tbody')!.style.display = 'none');

    const stickyThead = theader.querySelector('thead')!;
    const stickycolumns = stickyThead.querySelectorAll('th');

    const ths = tbody.querySelector('thead')?.querySelectorAll('th')!;

    for (var i = 0; i < ths.length; i++) {
      var th = ths[i];
      // Since the Sticky Table header is expected to be an exact copy of the Primary Table, we know their indicies will be the same.
      stickycolumns[i].style.minWidth = th.offsetWidth + 'px';
      stickycolumns[i].style.maxWidth = th.offsetWidth + 'px';
    }

    tbody.style.marginTop = `-${tbody.querySelector('thead')?.offsetHeight}px`;
    fromEvent(tbody, 'scroll').subscribe((event) => {
      this.syncScroll(tbody, theader);
    });
    fromEvent(theader, 'scroll').subscribe((event) => {
      this.syncScroll(theader, tbody);
    });
  }

  syncScroll(source: any, target: any) {
    target.scrollLeft = source.scrollLeft; // Synchronize horizontal scrolling
    console.log(target, target.scrollLeft);
  }
}
