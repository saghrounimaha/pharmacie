import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonLivLGComponent } from './bon-liv-lg.component';

describe('BonLivLGComponent', () => {
  let component: BonLivLGComponent;
  let fixture: ComponentFixture<BonLivLGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BonLivLGComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonLivLGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
