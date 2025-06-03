import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CameraPermissionPage } from './camera-permission.page';

describe('CameraPermissionPage', () => {
  let component: CameraPermissionPage;
  let fixture: ComponentFixture<CameraPermissionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraPermissionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
