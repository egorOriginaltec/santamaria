import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Pricing } from './pricing';

describe('Pricing', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pricing],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Pricing);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose two pricing plans', () => {
    const fixture = TestBed.createComponent(Pricing);
    expect(fixture.componentInstance.plans.length).toBe(2);
  });
});
