import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCommandeComponent } from './status-commande.component';

describe('StatusCommandeComponent', () => {
  let component: StatusCommandeComponent;
  let fixture: ComponentFixture<StatusCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusCommandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
