import { Component, forwardRef, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomDropdownService } from './custom-dropdown.service';
import { CustomDropdownOptionComponent } from './custom-dropdown-option/custom-dropdown-option.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrl: './custom-dropdown.component.scss',
  standalone: true,
  imports: [NgbDropdownModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDropdownComponent),
      multi: true,
    },
  ],
})
export class CustomDropdownComponent implements OnInit, ControlValueAccessor {
  private selectedOption!: CustomDropdownOptionComponent;
  value = '';
  constructor(private dropdownService: CustomDropdownService) {
    this.dropdownService.register(this);
    this.onChange = (value: string) => {};
    this.onTouched = () => {};
  }

  ngOnInit() {}

  private onChange: (value: string) => void;
  private onTouched: () => void;

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public selectOption(option: CustomDropdownOptionComponent) {
    if (this.selectedOption !== option) {
      this.selectedOption = option;
      this.onChange(this.selectedOption.value);
    }
  }
}
