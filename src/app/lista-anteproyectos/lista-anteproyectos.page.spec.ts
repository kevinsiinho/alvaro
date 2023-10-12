import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaAnteproyectosPage } from './lista-anteproyectos.page';

describe('ListaAnteproyectosPage', () => {
  let component: ListaAnteproyectosPage;
  let fixture: ComponentFixture<ListaAnteproyectosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaAnteproyectosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
