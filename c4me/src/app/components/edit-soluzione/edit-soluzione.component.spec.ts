import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSoluzioneComponent } from './edit-soluzione.component';

describe('EditSoluzioneComponent', () => {
  let component: EditSoluzioneComponent;
  let fixture: ComponentFixture<EditSoluzioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSoluzioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSoluzioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
