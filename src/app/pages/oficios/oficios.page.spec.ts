import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OficiosPage } from './oficios.page';

describe('OficiosPage', () => {
  let component: OficiosPage;
  let fixture: ComponentFixture<OficiosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OficiosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OficiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
