import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInformation } from './contact-information';

describe('ContactInformation', () => {
  let component: ContactInformation;
  let fixture: ComponentFixture<ContactInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactInformation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
