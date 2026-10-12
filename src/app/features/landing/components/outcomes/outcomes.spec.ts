import { TestBed } from '@angular/core/testing';
import { Outcomes } from './outcomes';

describe('Outcomes', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Outcomes],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Outcomes);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose six outcomes', () => {
    const fixture = TestBed.createComponent(Outcomes);
    expect(fixture.componentInstance.items.length).toBe(6);
  });

  it('should alternate layout direction', () => {
    const fixture = TestBed.createComponent(Outcomes);
    const component = fixture.componentInstance;
    expect(component.isReversed(0)).toBe(false);
    expect(component.isReversed(1)).toBe(true);
  });
});
