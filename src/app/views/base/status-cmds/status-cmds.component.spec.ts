import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCmdsComponent } from './status-cmds.component';

describe('StatusCmdsComponent', () => {
  let component: StatusCmdsComponent;
  let fixture: ComponentFixture<StatusCmdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusCmdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusCmdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
