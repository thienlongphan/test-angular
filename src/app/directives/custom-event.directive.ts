import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCustomEvent]',
  standalone: true,
})
export class CustomEventDirective {
  private oldValue: string = '';
  @Output() valueChanged = new EventEmitter<string>();
  enterPress = false;

  constructor(
    private el: ElementRef,
    @Optional() @Self() public ngControl: NgControl
  ) {}

  @HostListener('focus')
  onFocus() {
    this.enterPress = false;
    this.oldValue = this.ngControl?.value ?? this.el.nativeElement.value; // Store initial value on focus
  }

  @HostListener('blur')
  onBlur() {
    if (this.enterPress) return;

    const newValue = this.ngControl?.value ?? this.el.nativeElement.value;
    if (newValue !== this.oldValue) {
      this.valueChanged.emit(newValue);
    }
  }

  @HostListener('keyup.enter')
  onEnter() {
    this.enterPress = true;
    this.valueChanged.emit(
      this.ngControl?.value ?? this.el.nativeElement.value
    ); // Emit Enter event
  }
}
