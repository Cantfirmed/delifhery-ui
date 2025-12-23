import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiForm } from './ci-form';

describe('CiForm', () => {
  let component: CiForm;
  let fixture: ComponentFixture<CiForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CiForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
