import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapaAdministracionComponent } from './capa-administracion.component';

describe('AdministracionComponent', () => {
  let component: CapaAdministracionComponent;
  let fixture: ComponentFixture<CapaAdministracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapaAdministracionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapaAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
