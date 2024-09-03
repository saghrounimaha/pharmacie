import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnnoncesComponent } from './add-annonces.component';

describe('AddAnnoncesComponent', () => {
  let component: AddAnnoncesComponent;
  let fixture: ComponentFixture<AddAnnoncesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAnnoncesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAnnoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
