import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeputadoPerfilComponent } from './deputado-perfil.component';

describe('DeputadoPerfilComponent', () => {
  let component: DeputadoPerfilComponent;
  let fixture: ComponentFixture<DeputadoPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeputadoPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeputadoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
