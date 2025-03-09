import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomButtonComponent } from './custom-button.component';

describe('CustomButtonComponent', () => {
  let component: CustomButtonComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<CustomButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomButtonComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should backgroundColor is #0d6efd', () => {
    fixture.detectChanges();
    expect(getComputedStyle(element).backgroundColor).toBe('rgb(13, 110, 253)');
  });

  it('Should padding is 6px 12px', () => {
    fixture.detectChanges();
    expect(getComputedStyle(element).padding).toBe('6px 12px');
  });

  it('Should fontsize is 16px', () => {
    fixture.detectChanges();
    expect(getComputedStyle(element).fontSize).toBe('16px');
  });

  it('Should fontweight is 500', () => {
    fixture.detectChanges();
    expect(getComputedStyle(element).fontWeight).toBe('500');
  });
});
