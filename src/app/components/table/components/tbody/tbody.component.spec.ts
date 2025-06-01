import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbodyComponent } from './tbody.component';

describe('TbodyComponent', () => {
  let component: TbodyComponent;
  let fixture: ComponentFixture<TbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TbodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
