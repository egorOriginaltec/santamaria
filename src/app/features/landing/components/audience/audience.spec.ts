import { TestBed } from '@angular/core/testing';
import { Audience } from './audience';

describe('Audience', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Audience],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Audience);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose header and five reasons', () => {
    const fixture = TestBed.createComponent(Audience);
    const component = fixture.componentInstance;

    expect(component.eyebrow).toBe('Para quién es');
    expect(component.title).toContain('elegirnos');
    expect(component.reasons.length).toBe(5);
  });
});
