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
    expect(
      component.projectNames([
        {
          name: 'Mapa urbano interactivo',
          summary: 'Mapa',
          startDay: 7,
          developmentDays: '7–15',
          hours: '36 h',
        },
        {
          name: 'Portal inmobiliario',
          summary: 'Portal',
          startDay: 18,
          developmentDays: '18–25',
          hours: '32 h',
        },
      ]),
    ).toBe('Mapa urbano interactivo · Portal inmobiliario');
  });

  it('should detect project work days', () => {
    const fixture = TestBed.createComponent(Modules);
    const component = fixture.componentInstance;
    const module = component.modules[0];

    expect(component.isProjectDay(module, 1)).toBe(false);
    expect(component.isProjectDay(module, 2)).toBe(false);
    expect(component.isProjectDay(module, 3)).toBe(true);
    expect(component.isProjectDay(module, 5)).toBe(true);
  });
});
