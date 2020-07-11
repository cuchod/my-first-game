import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappComponent } from './mapp.component';

describe('MappComponent', () => {
  let component: MappComponent;
  let fixture: ComponentFixture<MappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
