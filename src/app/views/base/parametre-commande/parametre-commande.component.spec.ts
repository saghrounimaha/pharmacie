import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreCommandeComponent } from './parametre-commande.component';

describe('ParametreCommandeComponent', () => {
  let component: ParametreCommandeComponent;
  let fixture: ComponentFixture<ParametreCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametreCommandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametreCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
