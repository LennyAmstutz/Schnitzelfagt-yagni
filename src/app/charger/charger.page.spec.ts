import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChargerPage } from './charger.page';

describe('ChargerPage', () => {
  let component: ChargerPage;
  let fixture: ComponentFixture<ChargerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
