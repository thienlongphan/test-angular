import {
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
  PositionStrategy,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { AwesomeTooltipComponent } from '../components/awesome-tooltip/awesome-tooltip.component';

@Directive({
  selector: '[appAwesomeTooltip]',
  standalone: true,
})
export class AwesomeTooltipDirective implements OnInit {
  private overlayRef!: OverlayRef;
  private showTimeout: any;
  constructor(
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef,
    private overlay: Overlay
  ) {}

  ngOnInit(): void {
    // const positionStrategy = this.overlayPositionBuilder
    //   // Create position attached to the elementRef
    //   .flexibleConnectedTo(this.elementRef)
    //   // Describe how to connect overlay to the elementRef
    //   // Means, attach overlay's center bottom point to the
    //   // top center point of the elementRef.
    //   .withPositions([
    //     {
    //       originX: 'end',
    //       originY: 'center',
    //       overlayX: 'start',
    //       overlayY: 'top',
    //     },
    //   ]);
    // // Connect position strategy
    // this.overlayRef = this.overlay.create({ positionStrategy });
    const positionStrategy = this.getPositionStrategy();

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
  }

  @Input('awesomeTooltip') text = '';
  @Input() template!: TemplateRef<any>;

  @HostListener('mouseenter')
  show() {
    this.showTimeout = setTimeout(() => this.showTooltip(), 300);
  }

  @HostListener('mouseout')
  hide() {
    clearTimeout(this.showTimeout);
    this.overlayRef.detach();
  }

  private getPositionStrategy(): PositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withFlexibleDimensions(false)
      .withPush(true)
      .withPositions([
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -8,
          panelClass: 'tooltip-above',
        },
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: -50,
          panelClass: 'tooltip-below',
        },
        {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
          offsetX: -8,
          panelClass: 'tooltip-left',
        },
        {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
          offsetX: 8,
          panelClass: 'tooltip-right',
        },
      ]);
  }

  private showTooltip() {
    // Create tooltip portal
    const tooltipPortal = new ComponentPortal(AwesomeTooltipComponent);

    // Attach tooltip portal to overlay
    const tooltipRef: ComponentRef<AwesomeTooltipComponent> =
      this.overlayRef.attach(tooltipPortal);

    // Pass content to tooltip component instance
    tooltipRef.instance.text = this.text;

    if (this.template) tooltipRef.instance.template = this.template;
  }
}
