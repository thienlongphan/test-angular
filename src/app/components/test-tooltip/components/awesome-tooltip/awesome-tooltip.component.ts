import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-awesome-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './awesome-tooltip.component.html',
  styleUrl: './awesome-tooltip.component.css',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate(
          '150ms ease-in-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '100ms ease-in-out',
          style({ opacity: 0, transform: 'translateY(-10px)' })
        ),
      ]),
    ]),
  ],
})
export class AwesomeTooltipComponent {
  @Input() text = '';
  @Input() template!: TemplateRef<any>;
}
