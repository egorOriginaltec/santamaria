import { TestBed } from '@angular/core/testing';
import { ContactForm } from './contact-form';

describe('ContactForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactForm],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactForm);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should mark invalid form on submit', () => {
    const fixture = TestBed.createComponent(ContactForm);
    const component = fixture.componentInstance;

    component.onSubmit();
    expect(component.form.touched).toBe(true);
    expect(component.submitted()).toBe(false);
  });
});
