import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesPage } from './series.page';

describe('Tab3Page', () => {
  let component: SeriesPage;
  let fixture: ComponentFixture<SeriesPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(SeriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
