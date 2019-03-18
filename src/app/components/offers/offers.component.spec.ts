import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersComponent } from './offers.component';
import { IgxCarouselModule } from 'igniteui-angular';

describe('OffersComponent', () => {
  let component: OffersComponent;
  let fixture: ComponentFixture<OffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OffersComponent],
      imports: [IgxCarouselModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
