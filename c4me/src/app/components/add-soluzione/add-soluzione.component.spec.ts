import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSoluzioneComponent } from './add-soluzione.component';

describe('AddSoluzioneComponent', () => {
  let component: AddSoluzioneComponent;
  let fixture: ComponentFixture<AddSoluzioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSoluzioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSoluzioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
