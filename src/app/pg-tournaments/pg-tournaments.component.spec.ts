import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgTournamentsComponent } from './pg-tournaments.component';

describe('PgTournamentsComponent', () => {
  let component: PgTournamentsComponent;
  let fixture: ComponentFixture<PgTournamentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgTournamentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgTournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
