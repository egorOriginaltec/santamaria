import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ContactForm } from './contact-form';

describe('ContactForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactForm],
      providers: [provideHttpClient(), provideHttpClientTesting()],
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
