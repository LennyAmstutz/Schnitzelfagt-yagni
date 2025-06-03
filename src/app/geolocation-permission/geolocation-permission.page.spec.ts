import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeolocationPermissionPage } from './geolocation-permission.page';

describe('GeolocationPermissionPage', () => {
  let component: GeolocationPermissionPage;
  let fixture: ComponentFixture<GeolocationPermissionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocationPermissionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
