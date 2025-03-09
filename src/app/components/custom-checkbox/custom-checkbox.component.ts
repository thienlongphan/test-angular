import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-custom-checkbox',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './custom-checkbox.component.html',
  styleUrl: './custom-checkbox.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomCheckboxComponent),
      multi: true,
    },
  ],
})
export class CustomCheckboxComponent implements ControlValueAccessor {
  id = '';
  onChange: (value: any) => void;
  onTouched: () => void;
  @Input() checked = false;

  constructor() {
    this.onChange = () => {};
    this.onTouched = () => {};
    this.id = `radio-${Math.random()}`;
  }

  writeValue(value: any) {
    this.checked = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  getChange(e: any) {
    this.onChange(e);
  }
}
