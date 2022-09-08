import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCountryInfoComponent } from './edit-country-info.component';

describe('EditCountryInfoComponent', () => {
  let component: EditCountryInfoComponent;
  let fixture: ComponentFixture<EditCountryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCountryInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCountryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
