import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeputadoCardComponent } from './deputado-card.component';

describe('DeputadoCardComponent', () => {
  let component: DeputadoCardComponent;
  let fixture: ComponentFixture<DeputadoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeputadoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeputadoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
