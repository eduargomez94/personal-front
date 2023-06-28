import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapaAutenticacionComponent } from './capa-autenticacion.component';

describe('AutenticacionComponent', () => {
  let component: CapaAutenticacionComponent;
  let fixture: ComponentFixture<CapaAutenticacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapaAutenticacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapaAutenticacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
