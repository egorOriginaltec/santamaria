import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { LOGIN_ADMIN_EMAIL, LOGIN_ADMIN_PASSWORD } from '@core/index';
import { vi } from 'vitest';
import { Login } from './login';

describe('Login', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([{ path: 'dashboard', children: [] }])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Login);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should start with empty credentials', () => {
    const fixture = TestBed.createComponent(Login);
    const component = fixture.componentInstance;

    expect(component.form.controls.email.value).toBe('');
    expect(component.form.controls.password.value).toBe('');
  });

  it('should fill admin credentials after three quick title taps', () => {
    const fixture = TestBed.createComponent(Login);
    const component = fixture.componentInstance;
    const event = new Event('click');

    component.onTitleActivate(event);
    component.onTitleActivate(event);
    component.onTitleActivate(event);

    expect(component.form.controls.email.value).toBe(LOGIN_ADMIN_EMAIL);
    expect(component.form.controls.password.value).toBe(LOGIN_ADMIN_PASSWORD);
  });

  it('should mark invalid form on empty submit', () => {
    const fixture = TestBed.createComponent(Login);
    const component = fixture.componentInstance;

    component.onSubmit();

    expect(component.form.touched).toBe(true);
    expect(component.submitting()).toBe(false);
  });

  it('should navigate to dashboard on valid submit', async () => {
    const fixture = TestBed.createComponent(Login);
    const component = fixture.componentInstance;
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    component.form.setValue({
      email: LOGIN_ADMIN_EMAIL,
      password: LOGIN_ADMIN_PASSWORD,
      remember: true,
    });
    component.onSubmit();
    expect(component.submitting()).toBe(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    expect(navigateSpy).toHaveBeenCalledWith('/dashboard');
    expect(component.submitting()).toBe(false);
  });
});
