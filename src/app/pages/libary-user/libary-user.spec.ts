import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibaryUser } from './libary-user';

describe('LibaryUser', () => {
  let component: LibaryUser;
  let fixture: ComponentFixture<LibaryUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibaryUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibaryUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
