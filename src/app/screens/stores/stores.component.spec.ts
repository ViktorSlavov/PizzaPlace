import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresPageComponent } from './stores.component';

describe('StoresComponent', () => {
  let component: StoresPageComponent;
  let fixture: ComponentFixture<StoresPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
