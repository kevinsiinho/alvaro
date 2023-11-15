import { TestBed } from '@angular/core/testing';

import { AnteproyectoService } from './anteproyecto.service';

describe('AnteproyectoService', () => {
  let service: AnteproyectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnteproyectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
