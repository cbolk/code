import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsamiComponent } from './esami.component';

describe('EsamiComponent', () => {
  let component: EsamiComponent;
  let fixture: ComponentFixture<EsamiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsamiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsamiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
