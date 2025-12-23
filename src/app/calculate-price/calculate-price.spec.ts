import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatePrice } from './calculate-price';

describe('CalculatePrice', () => {
  let component: CalculatePrice;
  let fixture: ComponentFixture<CalculatePrice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatePrice],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatePrice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
