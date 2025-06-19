import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNovaUi } from './ngx-nova-ui';

describe('NgxNovaUi', () => {
  let component: NgxNovaUi;
  let fixture: ComponentFixture<NgxNovaUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxNovaUi],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxNovaUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
