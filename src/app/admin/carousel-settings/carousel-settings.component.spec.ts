import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselSettingsComponent } from './carousel-settings.component';

describe('CarouselSettingsComponent', () => {
  let component: CarouselSettingsComponent;
  let fixture: ComponentFixture<CarouselSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
