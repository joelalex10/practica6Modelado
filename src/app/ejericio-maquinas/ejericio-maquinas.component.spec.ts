import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjericioMaquinasComponent } from './ejericio-maquinas.component';

describe('EjericioMaquinasComponent', () => {
  let component: EjericioMaquinasComponent;
  let fixture: ComponentFixture<EjericioMaquinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjericioMaquinasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjericioMaquinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
