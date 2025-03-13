import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  value = '';
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();

  onChange: (value?: any) => void;

  onTouched: (event: any) => void;

  constructor() {
    this.onChange = () => {};
    this.onTouched = () => {};
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  onInput() {
    this.onChange(this.value);
  }

  onBlur() {
    this.blur.emit();
  }

  onFocus() {
    this.focus.emit();
  }
}
