import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGraphqlComponent } from './view-graphql.component';

describe('ViewGraphqlComponent', () => {
  let component: ViewGraphqlComponent;
  let fixture: ComponentFixture<ViewGraphqlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGraphqlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGraphqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
