import { TestBed } from '@angular/core/testing';
import { Faq } from './faq';

describe('Faq', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Faq],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Faq);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should toggle accordion items', () => {
    const fixture = TestBed.createComponent(Faq);
    const component = fixture.componentInstance;

    expect(component.openId()).toBeNull();
    component.toggle(1);
    expect(component.isOpen(1)).toBe(true);
    component.toggle(1);
    expect(component.openId()).toBeNull();
  });
});
