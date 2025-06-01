import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInnerDefaultComponent } from './table-inner-default.component';

describe('TableInnerDefaultComponent', () => {
  let component: TableInnerDefaultComponent;
  let fixture: ComponentFixture<TableInnerDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableInnerDefaultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableInnerDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
