import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsFcmsComponent } from './notifications-fcms.component';

describe('NotificationsFcmsComponent', () => {
  let component: NotificationsFcmsComponent;
  let fixture: ComponentFixture<NotificationsFcmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsFcmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsFcmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
