import { TestBed } from '@angular/core/testing';

import { EjercicioMaquinasService } from './ejercicio-maquinas.service';

describe('EjercicioMaquinasService', () => {
  let service: EjercicioMaquinasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjercicioMaquinasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
