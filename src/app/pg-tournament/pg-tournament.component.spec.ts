import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgTournamentComponent } from './pg-tournament.component';

describe('PgTournamentComponent', () => {
  let component: PgTournamentComponent;
  let fixture: ComponentFixture<PgTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgTournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
