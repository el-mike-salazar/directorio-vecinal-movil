import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarClientePage } from './actualizar-cliente.page';

describe('ActualizarClientePage', () => {
  let component: ActualizarClientePage;
  let fixture: ComponentFixture<ActualizarClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarClientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
