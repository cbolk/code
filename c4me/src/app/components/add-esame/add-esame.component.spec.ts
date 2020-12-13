import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEsameComponent } from './add-esame.component';

describe('AddEsameComponent', () => {
  let component: AddEsameComponent;
  let fixture: ComponentFixture<AddEsameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEsameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEsameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
