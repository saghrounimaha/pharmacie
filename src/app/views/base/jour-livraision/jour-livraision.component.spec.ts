import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourLivraisionComponent } from './jour-livraision.component';

describe('JourLivraisionComponent', () => {
  let component: JourLivraisionComponent;
  let fixture: ComponentFixture<JourLivraisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JourLivraisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JourLivraisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
