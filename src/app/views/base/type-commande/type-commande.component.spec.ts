import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCommandeComponent } from './type-commande.component';

describe('TypeCommandeComponent', () => {
  let component: TypeCommandeComponent;
  let fixture: ComponentFixture<TypeCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeCommandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
