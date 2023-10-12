import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnteproyectoPage } from './anteproyecto.page';

describe('AnteproyectoPage', () => {
  let component: AnteproyectoPage;
  let fixture: ComponentFixture<AnteproyectoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AnteproyectoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
