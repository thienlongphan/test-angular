import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent implements ControlValueAccessor {
  @Input() name = '';
  @Input() value = false;
  @Input() id = '';
  @Output() radioClick = new EventEmitter();
  internalValue = '';

  onChange: (value: any) => void;
  onTouched: () => void;

  constructor() {
    this.onChange = () => {};
    this.onTouched = () => {};
    this.id = `radio-${Math.random()}`;
  }

  writeValue(value: any) {
    this.internalValue = value;
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

  onClick(e: Event) {
    this.radioClick.emit(e);
  }
}
