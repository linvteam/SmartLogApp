import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegroupHeaderComponent } from './regroup-header.component';

describe('RegroupHeaderComponent', () => {
  let component: RegroupHeaderComponent;
  let fixture: ComponentFixture<RegroupHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegroupHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegroupHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
