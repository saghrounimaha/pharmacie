import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsNotificationsComponent } from './cms-notifications.component';

describe('CmsNotificationsComponent', () => {
  let component: CmsNotificationsComponent;
  let fixture: ComponentFixture<CmsNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsNotificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmsNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
