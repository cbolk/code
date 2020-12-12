import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEsercizioComponent } from './add-esercizio.component';

describe('AddEsercizioComponent', () => {
  let component: AddEsercizioComponent;
  let fixture: ComponentFixture<AddEsercizioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEsercizioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEsercizioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
