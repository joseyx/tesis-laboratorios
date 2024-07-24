import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasTableComponent } from './citas-table.component';

describe('CitasTableComponent', () => {
  let component: CitasTableComponent;
  let fixture: ComponentFixture<CitasTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
