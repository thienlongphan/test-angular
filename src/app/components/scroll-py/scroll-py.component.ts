import { ScrollObserverService } from './../../services/scroll-observer.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-scroll-py',
  standalone: true,
  imports: [],
  templateUrl: './scroll-py.component.html',
  styleUrl: './scroll-py.component.css',
})
export class ScrollPyComponent implements OnInit, AfterViewInit {
  @Output() inView = new EventEmitter();
  @ViewChild('scrollPyContainer')
  scrollPyContainer!: ElementRef<HTMLDivElement>;
  constructor(private scrollService: ScrollObserverService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.scrollService.observe(
      this.scrollPyContainer.nativeElement,
      (isVisible: boolean) => {
        this.inView.emit(isVisible);
      }
    );
  }

  ngOnDestroy(): void {
    this.scrollService.unobserve(this.scrollPyContainer.nativeElement);
  }
}
