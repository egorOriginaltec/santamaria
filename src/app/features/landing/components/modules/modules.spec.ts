import { TestBed } from '@angular/core/testing';
import { Modules } from './modules';

describe('Modules', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modules],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Modules);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should toggle module accordion', () => {
    const fixture = TestBed.createComponent(Modules);
    const component = fixture.componentInstance;

    expect(component.openModuleId()).toBeNull();
    component.toggleModule(1);
    expect(component.openModuleId()).toBe(1);
    expect(component.isModuleOpen(1)).toBe(true);
    component.toggleModule(1);
    expect(component.openModuleId()).toBeNull();
  });

  it('should format weeks and projects labels', () => {
    const fixture = TestBed.createComponent(Modules);
    const component = fixture.componentInstance;

    expect(component.weeksLabel('1')).toBe('Semana 1');
    expect(component.weeksLabel('2–3')).toBe('Semanas 2–3');
    expect(component.projectsLabel(1)).toBe('1 proyecto');
    expect(component.projectsLabel(2)).toBe('2 proyectos');
  });
});
