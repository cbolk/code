import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLezioneComponent } from './add-lezione.component';

describe('AddLezioneComponent', () => {
  let component: AddLezioneComponent;
  let fixture: ComponentFixture<AddLezioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLezioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLezioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
