import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPayments } from './pg-payments';

describe('PgPayments', () => {
  let component: PgPayments;
  let fixture: ComponentFixture<PgPayments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PgPayments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgPayments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
