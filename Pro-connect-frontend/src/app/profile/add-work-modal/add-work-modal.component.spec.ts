import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkModalComponent } from './add-work-modal.component';

describe('AddWorkModalComponent', () => {
  let component: AddWorkModalComponent;
  let fixture: ComponentFixture<AddWorkModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorkModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
