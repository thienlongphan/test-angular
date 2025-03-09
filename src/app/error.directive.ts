import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Input,
  SimpleChanges,
} from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appErrorInput]',
  standalone: true,
})
export class ErrorInputDirective {
  @Input('appErrorInput') errors!: ValidationErrors | null | undefined; // Works for both form types
  @Input() errorMessages!: { [key: string]: string }; // Custom messages for errors

  private errorElement!: HTMLElement; // Error message element

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Create error message element
    this.errorElement = this.renderer.createElement('span');
    this.renderer.setStyle(this.errorElement, 'color', 'red');
    this.renderer.setStyle(this.errorElement, 'font-size', '12px');
    this.renderer.setStyle(this.errorElement, 'display', 'none'); // Hidden initially
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Get errors from template-driven forms if available
    const formErrors = this.errors;

    if (formErrors) {
      const activeErrorKey = Object.keys(formErrors).find(
        (key) => formErrors[key]
      );
      console.log(activeErrorKey, this.errorMessages);

      if (activeErrorKey) {
        // Apply error styles
        this.renderer.setStyle(
          this.el.nativeElement,
          'border',
          '2px solid red'
        );
        this.renderer.setStyle(
          this.el.nativeElement,
          'background-color',
          '#ffe6e6'
        );

        // Show corresponding error message
        const message = this.errorMessages[activeErrorKey] || 'Invalid input';
        this.renderer.setProperty(this.errorElement, 'textContent', message);
        this.renderer.setStyle(this.errorElement, 'display', 'block');
        this.renderer.appendChild(
          this.el.nativeElement.parentNode,
          this.errorElement
        );
      } else {
        // Remove error styles
        this.renderer.removeStyle(this.el.nativeElement, 'border');
        this.renderer.removeStyle(this.el.nativeElement, 'background-color');

        // Hide error message
        this.renderer.setStyle(this.errorElement, 'display', 'none');
      }
    }
  }
}
