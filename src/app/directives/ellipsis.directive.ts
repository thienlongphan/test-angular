import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appEllipsis]',
  standalone: true,
})
export class EllipsisDirective {
  @Input() maxLines: number = 1; // Maximum number of lines before ellipsis

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const element = this.el.nativeElement;

    // Apply ellipsis styles
    this.renderer.setStyle(element, 'display', '-webkit-box');
    this.renderer.setStyle(element, '-webkit-box-orient', 'vertical');
    this.renderer.setStyle(element, '-webkit-line-clamp', this.maxLines);
    this.renderer.setStyle(element, 'overflow', 'hidden');
    this.renderer.setStyle(element, 'text-overflow', 'ellipsis');
    this.renderer.setStyle(element, 'word-break', 'break-word');
  }
}
