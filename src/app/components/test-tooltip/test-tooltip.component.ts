import { Component } from '@angular/core';
import { AwesomeTooltipDirective } from './directives/awesome-tooltip.directive';

@Component({
  selector: 'app-test-tooltip',
  standalone: true,
  imports: [AwesomeTooltipDirective],
  templateUrl: './test-tooltip.component.html',
  styleUrl: './test-tooltip.component.css',
})
export class TestTooltipComponent {}
