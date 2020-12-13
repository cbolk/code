import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEsameComponent } from './edit-esame.component';

describe('EditEsameComponent', () => {
  let component: EditEsameComponent;
  let fixture: ComponentFixture<EditEsameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEsameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEsameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
