import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailQueuesComponent } from './email-queues.component';

describe('EmailQueuesComponent', () => {
  let component: EmailQueuesComponent;
  let fixture: ComponentFixture<EmailQueuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailQueuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailQueuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
