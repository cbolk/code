import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEsercizioComponent } from './edit-esercizio.component';

describe('EditEsercizioComponent', () => {
  let component: EditEsercizioComponent;
  let fixture: ComponentFixture<EditEsercizioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEsercizioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEsercizioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
