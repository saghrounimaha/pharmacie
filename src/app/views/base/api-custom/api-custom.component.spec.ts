import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCustomComponent } from './api-custom.component';

describe('ApiCustomComponent', () => {
  let component: ApiCustomComponent;
  let fixture: ComponentFixture<ApiCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiCustomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
