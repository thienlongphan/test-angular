import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { distinctUntilChanged, filter, map, mergeMap, Observable } from 'rxjs';
import { ScrollPyComponent } from '../scroll-py/scroll-py.component';

@Component({
  selector: 'app-test-spy',
  standalone: true,
  imports: [ScrollPyComponent],
  templateUrl: './test-spy.component.html',
  styleUrl: './test-spy.component.css',
})
export class TestSpyComponent implements OnInit, AfterViewInit {
  isItemOne = false;
  isItemTwo = false;
  isItemThree = false;
  isItemFour = false;

  ngOnInit(): void {}

  ngAfterViewInit() {}

  getActive(isActive: boolean, element: string) {
    switch (element) {
      case 'item1':
        this.isItemOne = isActive;
        break;
      case 'item2':
        this.isItemTwo = isActive;
        break;
      case 'item3':
        this.isItemThree = isActive;
        break;
      case 'item4':
        this.isItemFour = isActive;
        break;

      default:
        break;
    }
  }
}
