import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolDashboardComponent } from './pool-dashboard.component';

describe('PoolDashboardComponent', () => {
  let component: PoolDashboardComponent;
  let fixture: ComponentFixture<PoolDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
