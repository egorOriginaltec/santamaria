import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { LOGIN_DEFAULT_EMAIL, LOGIN_DEFAULT_PASSWORD } from '@core/index';
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

  it('should prefills administrator credentials', () => {
    const fixture = TestBed.createComponent(Login);
    const component = fixture.componentInstance;

    expect(component.form.controls.email.value).toBe(LOGIN_DEFAULT_EMAIL);
    expect(component.form.controls.password.value).toBe(LOGIN_DEFAULT_PASSWORD);
  });

  it('should mark invalid form on empty submit', () => {
    const fixture = TestBed.createComponent(Login);
    const component = fixture.componentInstance;

    component.form.reset({
      email: '',
      password: '',
      remember: true,
    });
    component.onSubmit();

    expect(component.form.touched).toBe(true);
    expect(component.submitting()).toBe(false);
  });

  it('should navigate to dashboard on valid submit', async () => {
    const fixture = TestBed.createComponent(Login);
    const component = fixture.componentInstance;
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    component.onSubmit();
    expect(component.submitting()).toBe(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    expect(navigateSpy).toHaveBeenCalledWith('/dashboard');
    expect(component.submitting()).toBe(false);
  });
});
