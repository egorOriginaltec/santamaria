import { TestBed } from '@angular/core/testing';
import { Courses } from './courses';

describe('Courses', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Courses],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Courses);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
